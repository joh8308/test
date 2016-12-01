import {customCheck, nonEmptyString} from './utils/utils';

import Friendships from '../../imports/collections/friends';

const SPOTCONST = require('../../lib/constants');

Meteor.methods({
  // --------------------------------------------------
  'getFriendList' ({userLang}={userLang}) {
    // 연락처 목록

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

    var dbData = Meteor.users.findOne({
      _id: this.userId
    }, {
      fields: {
        'relationship.contacts': 1
      }
    });

    var returnData = {};
    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: '',
      data: {
        list: dbData.relationship.contacts
      }
    };

    return returnData;
  },
  // --------------------------------------------------
  'getBlockedList' ({userLang}={userLang}) {
    // 차단한 목록

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

    var dbData = Meteor.users.findOne({
      _id: currentUserId
    }, {
      fields: {
        'relationship.blocked': 1
      }
    });

    var returnData = {};
    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: '',
      data: {
        list: dbData.relationship.blocked
      }
    };

    return returnData;
  },
  // --------------------------------------------------
  'getDeclinedList' ({userLang}={userLang}) {
    // 거절한 목록

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

    var dbData = Meteor.users.findOne({
      _id: currentUserId
    }, {
      fields: {
        'relationship.declined': 1
      }
    });

    var returnData = {};
    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: '',
      data: {
        list: dbData.relationship.declined
      }
    };

    return returnData;
  },
  // --------------------------------------------------
  'getRequestedList' ({userLang}={userLang}) {
    // 요청된 목록

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

    var dbData = Meteor.users.findOne({
      _id: currentUserId
    }, {
      fields: {
        'relationship.incoming': 1
      }
    });

    var returnData = {};
    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: '',
      data: {
        list: dbData.relationship.incoming
      }
    };

    return returnData;
  },
  // --------------------------------------------------
  'getRequestList' ({userLang}={userLang}) {
    // 요청한 목록

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

    var dbData = Meteor.users.findOne({
      _id: currentUserId
    }, {
      fields: {
        'relationship.outgoing': 1
      }
    });

    var returnData = {};
    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: '',
      data: {
        list: dbData.relationship.outgoing
      }
    };

    return returnData;
  },
  // --------------------------------------------------
  'requestFriendship' ({userLang, friendId, message}) {
    // 친구 신청

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
        {v: friendId, c: nonEmptyString},
        {v: message, c: nonEmptyString}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    friendId = friendId.trim();
    message = message.trim();

    var returnData = {};

    if (friendId === currentUserId) {
      return {
        status: false,
        code: SPOTCONST.ERROR_CANNOT_SELF_FRIENDSHIP,
        message: TAPi18n.__('error.relationship.cannot_self_friendship', {}, userLang)
      }
    }

    var currentUser = Meteor.users.findOne({
      _id: currentUserId,
    });


    if (_.contains(currentUser.contacts, friendId)) {
      return {
        status: false,
        code: SPOTCONST.ERROR_ALREADY_FRIEND,
        message: TAPi18n.__('error.relationship.already_friend', {}, userLang)
      }
    }

    var dbData = Meteor.users.findOne({
      _id: friendId,
      'relationship.blocked': currentUserId
    });

    if (!dbData) {
      // 친구 요청 목록에 추가
      Friendships.update({
        requester: currentUserId,
        requestedTo: friendId
      }, {
        $set: {
          requester: currentUserId,
          requesterName: currentUser.name,
          requestedTo: friendId,
          createdAt: new Date(),
          message: message
        }
      }, {
        upsert: true
      });

      // add the request to the other user's incoming friend requests
      Meteor.users.update({
        _id: friendId
      }, {
        $addToSet: {
          'relationship.incoming': currentUserId
        }
      });

      // add the request to the current user's outgoing freind requests
      Meteor.users.update({
        _id: currentUserId
      }, {
        $addToSet: {
          'relationship.outgoing': friendId
        }
      });

      pushSender(
        userLang,
        {
          type: 'service',
          command: 'friend.requested',
          deviceId: '',
          sender: currentUserId,
          receivers: [friendId],
          chatId: '',
          messageId: '',
          friendMessage: message
        }
      );
    } else {
      // 친구 요청 목록에서 삭제
      Friendships.remove({
        requester: currentUserId,
        requestedTo: friendId
      });
    }

    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: ''
    };

    return returnData;
  },
  // --------------------------------------------------
  'acceptFriendship' ({userLang, friendId}) {
    // 친구 요청 수락

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
        {v: friendId, c: nonEmptyString}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    friendId = friendId.trim();

    var returnData = {};

    // 친구 요청 목록에서 삭제
    Friendships.remove({
      requester: friendId,
      requestedTo: currentUserId
    });

    // remove the request from the my incoming friend requests
    // add the other user to my contacts and vice verca
    Meteor.users.update({
      _id: currentUserId
    }, {
      $pull: {
        'relationship.incoming': friendId
      },
      $addToSet: {
        'relationship.contacts': friendId
      }
    });

    // remove request from the other user's outgoing freind requests
    // add the current user to the other user's contacts
    Meteor.users.update({
      _id: friendId
    }, {
      $pull: {
        'relationship.outgoing': currentUserId
      },
      $addToSet: {
        'relationship.contacts': currentUserId
      }
    });

    pushSender(
      userLang,
      {
        type: 'service',
        command: 'friend.accepted',
        deviceId: '',
        sender: currentUserId,
        receivers: [friendId],
        chatId: '',
        messageId: '',
        friendMessage: ''
      }
    );

    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: ''
    };

    return returnData;
  },
  // --------------------------------------------------
  'declineFriendship' ({userLang, friendId}) {
    // 친구 요청 거절

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
        {v: friendId, c: nonEmptyString}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    friendId = friendId.trim();

    var returnData = {};

    // 친구 요청 목록에서 삭제
    Friendships.remove({
      requester: friendId,
      requestedTo: currentUserId
    });

    // remove the request from the my incoming friend requests
    Meteor.users.update({
      _id: currentUserId
    }, {
      $pull: {
        'relationship.incoming': friendId
      },
      $addToSet: {
        'relationship.declined': friendId
      }
    });

    // remove request from the other user's outgoing freind requests
    Meteor.users.update({
      _id: friendId
    }, {
      $pull: {
        'relationship.outgoing': currentUserId
      }
    });

    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: ''
    };

    return returnData;
  },
  // --------------------------------------------------
  'undeclineFriendship' ({userLang, friendId}) {
    // 친구 요청 거절 해제

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
          {v: friendId, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    friendId = friendId.trim();

    var returnData = {};

    // 친구 요청 목록에서 삭제
    Friendships.remove({
      requester: friendId,
      requestedTo: currentUserId
    });

    // remove the request from the my incoming friend requests
    Meteor.users.update({
      _id: currentUserId
    }, {
      $pull: {
        'relationship.declined': friendId
      }
    });

    // remove request from thparam.e other user's outgoing freind requests
    Meteor.users.update({
      _id: friendId
    }, {
      $pull: {
        'relationship.outgoing': currentUserId
      }
    });

    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: ''
    };

    return returnData;
  },
  // --------------------------------------------------
  'blockFriendship' ({userLang, friendId}) {
    // 친구 요청 차단

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
        {v: friendId, c: nonEmptyString}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    friendId = friendId.trim();

    var returnData = {};

    // 친구 요청 목록에서 삭제
    Friendships.remove({
      requester: friendId,
      requestedTo: currentUserId
    });

    // remove the request from the my incoming friend requests
    Meteor.users.update({
      _id: currentUserId
    }, {
      $pull: {
        'relationship.incoming': friendId,
        'relationship.declined': friendId
      },
      $addToSet: {
        'relationship.blocked': friendId
      }
    });

    // remove request from the other user's outgoing freind requests
    Meteor.users.update({
      _id: friendId
    }, {
      $pull: {
        'relationship.outgoing': currentUserId
      }
    });

    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: ''
    };

    return returnData;
  },
  // --------------------------------------------------
  'unblockFriendship' ({userLang, friendId}) {
    // 친구 요청 차단 해제

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
        {v: friendId, c: nonEmptyString}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    friendId = friendId.trim();

    var returnData = {};

    // 친구 요청 목록에서 삭제
    Friendships.remove({
      requester: friendId,
      requestedTo: currentUserId
    });

    // remove the request from the my incoming friend requests
    Meteor.users.update({
      _id: currentUserId
    }, {
      $pull: {
        'relationship.blocked': friendId
      }
    });

    // remove request from thparam.e other user's outgoing freind requests
    Meteor.users.update({
      _id: friendId
    }, {
      $pull: {
        'relationship.outgoing': currentUserId
      }
    });

    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: ''
    };

    return returnData;
  },
  // --------------------------------------------------
  'removeFriendship' ({userLang, friendId}) {
    // 친구 목록에서 제거

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
        {v: friendId, c: nonEmptyString}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    friendId = friendId.trim();

    var returnData = {};

    // 친구 요청 목록에서 삭제
    Friendships.remove({
      requester: friendId,
      requestedTo: currentUserId
    });

    // remove the user from the other user's contacts
    Meteor.users.update({
      _id: friendId
    }, {
      $pull: {
        'relationship.contacts': currentUserId
      }
    });

    // remove the user from the current user's contacts
    Meteor.users.update({
      _id: currentUserId
    }, {
      $pull: {
        'relationship.contacts': friendId
      }
    });

    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: ''
    };

    return returnData;
  },
  // --------------------------------------------------
  'searchUser' ({userLang, friendUsernames}) {
    // 사용자 검색
    // 아이디 검색만 지원

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
        {v: friendUsernames, c: nonEmptyString}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    friendUsernames = friendUsernames.trim();

    var returnData = {};

    var dbData = Meteor.users.find({
      username: {
        $in: friendUsernames.toLowerCase().split(';')
      }
    }, {
      fields: {
        _id: 1,
        emails: 1,
        username: 1,
        name: 1,
        phone: 1,
        photo: 1
      }
    });

    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: '',
      data: {
        users: dbData.fetch()
      }
    };

    return returnData;
  },
  // --------------------------------------------------
  'inviteFriend' ({userLang, phone, message}) {
    // 친구 초대 문자 메시지 발송

    var returnData = {};

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
        {v: phone, c: nonEmptyString},
        {v: message, c: nonEmptyString}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    phone = phone.replace(/[^0-9]/gi, '').trim();
    message = message.trim();

    message += '\n\n' + TAPi18n.__('service.common.app.download_loation_description', {}, userLang);
    message += '\n\nAPPLE  : ' + Meteor.settings.private.url.appleStore;
    message += '\n\nGOOGLE : ' + Meteor.settings.private.url.googleStore;

    var currentUser = Meteor.users.findOne({_id: currentUserId});
    if (!currentUser) {
      return {
        status: false,
        code: SPOTCONST.ERROR_NOT_FOUND_CURRENT_USER,
        message: TAPi18n.__('error.user.not_found_current_user', {}, userLang)
      }
    }

    if (currentUser.phone.number.replace(/[^0-9]/gi, '') === phone) {
      return {
        status: false,
        code: SPOTCONST.ERROR_CANNOT_SELF_INVITE,
        message: TAPi18n.__('error.account.cannot_self_invite', {}, userLang)
      }
    }

    var httpResponse = HTTP.call('POST', Meteor.settings.private.sms.url, {
      data: {
        "user": Meteor.settings.private.sms.user,
        "password": Meteor.settings.private.sms.password,
        "msg": {
          "sender": Meteor.settings.private.sms.senderNumber,
          "receiver": phone,
          "message": message,
          "msg_gb": "A"
        }
      },
      headers: {
        "content-type": "application/json"
      }
    });

    if (httpResponse.statusCode === 200) {
      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: ''
      };
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_SEND_SMS,
        message: TAPi18n.__('error.phone.failed_send_sms', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'userProfile' ({userLang, userid}) {
    // 사용자 정보

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
        {v: userid, c: nonEmptyString}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    userid = userid.trim();

    var returnData = {};

    var user = Meteor.users.findOne({
      userid: userid
    });

    if (user) {
      if (_.contains(user.relationship.contacts, currentUserId)) {
        returnData = {
          status: true,
          code: SPOTCONST.ERROR_SUCCEED,
          message: '',
          data: {
            _id: user._id,
            emails: user.emails,
            username: user.username,
            name: user.name,
            phone: user.phone,
            photo: user.photo,
            status: {
              online: user.status.online
            }
          }
        };
      } else {
        returnData = {
          status: false,
          code: SPOTCONST.ERROR_NOT_ALLOWED_VIEW_PROFILE_NOT_FRIEND,
          message: TAPi18n.__('error.user.not_allowed_view_profile_not_friend', {}, userLang)
        };
      }
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_NOT_FOUND_TARGET_USER,
        message: TAPi18n.__('error.user.not_found_target_user', {}, userLang)
      };
    }

    return returnData;
  }
});
