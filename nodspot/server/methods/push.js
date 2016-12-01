import {customCheck, nonEmptyString} from './utils/utils';

import DeviceTokens from '../../imports/collections/deviceTokens';

const SPOTCONST = require('../../lib/constants');

Meteor.methods({
  // --------------------------------------------------
  'save.device.token' ({userLang, serviceName, serviceProvider, deviceToken}) {
    userLang = userLang || Meteor.settings.private.language.default;

    var currentUserId = this.userId;

    if (!currentUserId) {
      return {
        status: false,
        code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
        message: TAPi18n.__('error.account.failed_authentication', {}, userLang)
      }
    }

    if (!
        customCheck([
          {v: serviceName, c: nonEmptyString},
          {v: serviceProvider, c: nonEmptyString},
          {v: deviceToken, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();

    serviceName = serviceName.trim();
    serviceProvider = serviceProvider.trim();
    deviceToken = deviceToken.trim();

    var returnData = {};

    var user = Meteor.users.findOne({
      _id: currentUserId
    });

    if (user) {
      var baseDatetime = new Date();

      var pushTokenDoc = DeviceTokens.findOne({
        $and: [
          {deviceToken: deviceToken},
          {serviceName: serviceName}
        ]
      });

      if (!pushTokenDoc) {
        pushTokenDoc = {
          _id: Random.id(),
          serviceName: serviceName,
          serviceProvider: serviceProvider,
          deviceToken: deviceToken,
          userId: currentUserId,
          createdAt: baseDatetime,
          updatedAt: baseDatetime
        };

        DeviceTokens.insert(pushTokenDoc);
      } else {
        DeviceTokens.update({ _id: pushTokenDoc._id }, {
          $set: {
            userId: currentUserId,
            updatedAt: baseDatetime,
            deviceToken: deviceToken
          }
        });
      }

      if (pushTokenDoc) {
        DeviceTokens.remove({
          $and: [
            { _id: { $ne: pushTokenDoc._id } },
            { deviceToken: pushTokenDoc.token },
            { appName: pushTokenDoc.appName }
          ]
        });
      }

      // HTTP.call( 'GET', 'http://localhost:9898/subscribe', {
      //   params: {
      //     'service': serviceName,
      //     'subscriber': currentUserId,
      //     'pushservicetype': serviceProvider,
      //     'regid': deviceToken
      //   }
      // }, function( error, response ) {
      //   if ( error ) {
      //     console.log(error);
      //   } else {
      //     console.log(response);
      //     /*
      //      This will return the HTTP response object that looks something like this:
      //      {
      //      content: "String of content...",
      //      data: Array[100], <-- Our actual data lives here.
      //      headers: {  Object containing HTTP response headers }
      //      statusCode: 200
      //      }
      //      */
      //   }
      // });

      // ------------------------------------------------------------
      // raix:push-update
      var token = {};
      if (serviceProvider === 'apn') {
        token.apn = deviceToken;
      } else {
        token.gcm = deviceToken;
      }

      var doc;

      doc = Push.appCollection.findOne({
        $and: [
          { token: token },
          { appName: serviceName },
          { token: { $exists: true } }
        ]
      });

      if (!doc) {
        doc = {
          token: token,
          appName: serviceName,
          userId: currentUserId,
          enabled: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        doc._id = Random.id();

        Push.appCollection.insert(doc);
      } else {
        Push.appCollection.update({ _id: doc._id }, {
          $set: {
            userId: currentUserId,
            updatedAt: new Date(),
            token: token
          }
        });
      }

      if (doc) {
        Push.appCollection.remove({
          $and: [
            { _id: { $ne: doc._id } },
            { token: doc.token },
            { appName: doc.appName },
            { token: { $exists: true } }
          ]
        });
      }
      // ------------------------------------------------------------

      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: ''
      };
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_NOT_FOUND_CURRENT_USER,
        message: TAPi18n.__('error.chat.not_found_current_user', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'test.raix.send' ({userLang, receiverUserId, title, message}) {
    userLang = userLang || Meteor.settings.private.language.default;

    var currentUserId = this.userId;

    if (!currentUserId) {
      return {
        status: false,
        code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
        message: TAPi18n.__('error.account.failed_authentication', {}, userLang)
      }
    }

    if (!
        customCheck([
          {v: receiverUserId, c: nonEmptyString},
          {v: title, c: Match.Optional(String)},
          {v: message, c: Match.Optional(String)}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    receiverUserId = receiverUserId.trim();
    if (title != null) {
      title = title.trim();
    }

    if (message != null) {
      message = message.trim();
    }

    var returnData = {};

    var user = Meteor.users.findOne({
      _id: receiverUserId
    });

    if (user) {
      pushSender(
        userLang,
        {
          type: 'system',
          command: 'test.receive',
          deviceId: '',
          sender: currentUserId,
          receivers: [receiverUserId],
          title: title,
          message: message
        }
      );

      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: ''
      };
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_NOT_FOUND_TARGET_USER,
        message: TAPi18n.__('error.chat.not_found_target_user', {}, userLang)
      };
    }

    return returnData;
  }
});
