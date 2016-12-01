import {customCheck, nonEmptyString} from './utils/utils';

import Chats from '../../imports/collections/chats';
import Messages from '../../imports/collections/messages';

const SPOTCONST = require('../../lib/constants');

Meteor.methods({
  // --------------------------------------------------
  'create.random.id' ({userLang}={userLang}) {
    // _id에서 사용할 키 생성

    userLang = userLang || Meteor.settings.private.language.default;

    var currentUserId = this.userId;

    if (!currentUserId) {
      return {
        status: false,
        code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
        message: TAPi18n.__('error.account.failed_authentication', {}, userLang)
      }
    }

    userLang = userLang.trim();

    var randomId = '';
    try {
      randomId = Random.id();
    } catch(e) {
    }

    var returnData = {};

    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: '',
      data: {
        randomId: randomId
      }
    };

    return returnData;
  },
  // --------------------------------------------------
  'sendMessage' ({userLang, chatId, messageId, message, encrypted}) {
    // 메시지 전송 - 텍스트
    // 이미지 전송은 REST API 사용

    userLang = userLang || Meteor.settings.private.language.default;
    messageId = messageId || '';

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
        {v: chatId, c: nonEmptyString},
        {v: messageId, c: String},
        {v: message, c: nonEmptyString},
        {v: encrypted, c: Boolean}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    chatId = chatId.trim();
    messageId = messageId.trim();
    message = message.trim();

    var returnData = {};

    var chat = Chats.findOne({
      _id: chatId
    });

    if (chat) {
      // var members = [].concat(chat.members.map(({userId})=>userId));

      var dbData = null;

      if (messageId !== '') {
        dbData = Messages.insert({
          _id: messageId,
          chatId: chatId,
          creator: currentUserId,
          encrypted: encrypted,
          messageType: 'text',
          status: 'normal',
          text: message,
          unreaders: _.difference(_.pluck(chat.members, 'userId'), currentUserId)
        });
      } else {
        dbData = Messages.insert({
          chatId: chatId,
          creator: currentUserId,
          encrypted: encrypted,
          messageType: 'text',
          status: 'normal',
          text: message,
          unreaders: _.difference(_.pluck(chat.members, 'userId'), currentUserId)
        });
      }

      if (dbData) {
        pushSender(
          userLang,
          {
            type: 'service',
            command: 'message.received',
            deviceId: '',
            sender: currentUserId,
            // receivers: chat.enteredMembers,
            receivers: _.difference(_.pluck(chat.members, 'userId'), currentUserId),
            chatId: chatId,
            messageId: dbData,
            friendMessage: ''
          }
        );

        returnData = {
          status: true,
          code: SPOTCONST.ERROR_SUCCEED,
          message: '',
          data: {
            messageId: dbData
          }
        };
      } else {
        returnData = {
          status: false,
          code: SPOTCONST.ERROR_FAILED_CREATE_CHAT_MESSAGE,
          message: TAPi18n.__('error.message.failed_create_chat_message', {}, userLang)
        };
      }
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_NOT_FOUND_CHAT_ROOM,
        message: TAPi18n.__('error.chat.not_found_chat_room', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'readMessage' ({userLang, chatId, messageId}) {
    // 메시지 읽음 처러

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
          {v: chatId, c: nonEmptyString},
          {v: messageId, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    chatId = chatId.trim();
    messageId = messageId.trim();

    var returnData = {};

    var dbData = Messages.update({
      _id: messageId,
      chatId: chatId
    }, {
      $pull: {
        unreaders: currentUserId
      }
    });

    if (dbData) {
      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: ''
      };
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_UPDATE_CHAT_MESSAGE,
        message: TAPi18n.__('error.message.failed_update_chat_message', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'recallMessage' ({userLang, chatId, messageId}) {
    // 메시지 회수
    // 텍스트, 이미지 모두 지원

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
        {v: chatId, c: nonEmptyString},
        {v: messageId, c: nonEmptyString}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    chatId = chatId.trim();
    messageId = messageId.trim();

    var returnData = {};

    var dbData = Messages.findOne({
      _id: messageId,
      chatId: chatId
    });

    if (dbData) {
      if (dbData.messageType === 'image') {
        try {
          fs.unlink(dbData.file.origin);
        } catch(e) {}

        try {
          fs.unlink(dbData.file.thumb);
        } catch(e) {}
      }
    }

    var queryResult = Messages.remove({
      _id: messageId,
      chatId: chatId
    });

    if (queryResult === 1) {
      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: ''
      };
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_RECALL_CHAT_MESSAGE,
        message: TAPi18n.__('error.message.failed_recall_chat_message', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'detectCapture' ({userLang, type, chatId}) {
    // 캡쳐 시도 감지

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
          {v: chatId, c: nonEmptyString},
          {v: type, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    chatId = chatId.trim();
    type = type.trim();

    var returnData = {};

    var chat = Chats.findOne({
      _id: chatId
    });

    if (chat) {
      // var members = [].concat(chat.members.map(({userId})=>userId));

      // 2101
      // [_creator_]님으로부터 캡쳐가 감지되었습니다.
      // Screen capture has been detected from [_creator_].
      // [_creator_]さんからキャプチャが検出されました。

      var dbData = Messages.insert({
        chatId: chatId,
        creator: currentUserId,
        encrypted: false,
        messageType: '2101',
        status: 'normal',
        text: '',
        unreaders: []
      });

      if (dbData) {
        pushSender(
          userLang,
          {
            type: 'service',
            command: 'capture.tried',
            deviceId: '',
            sender: currentUserId,
            receivers: chat.enteredMembers,
            chatId: chatId,
            messageId: dbData,
            friendMessage: ''
          }
        );

        returnData = {
          status: true,
          code: SPOTCONST.ERROR_SUCCEED,
          message: '',
          data: {
            messageId: dbData
          }
        };
      } else {
        returnData = {
          status: false,
          code: SPOTCONST.ERROR_FAILED_SEND_REPORT,
          message: TAPi18n.__('error.common.failed_send_report', {}, userLang)
        };
      }
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_NOT_FOUND_CHAT_ROOM,
        message: TAPi18n.__('error.chat.not_found_chat_room', {}, userLang)
      };
    }

    return returnData;
  },
});
