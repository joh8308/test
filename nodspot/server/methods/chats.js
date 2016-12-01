import {customCheck, nonEmptyString} from './utils/utils';
import {moment} from  'meteor/momentjs:moment';

import Chats from '../../imports/collections/chats';
import Messages from '../../imports/collections/messages';
import MissedChats from '../../imports/collections/missedChats';

const SPOTCONST = require('../../lib/constants');

Meteor.methods({
  // --------------------------------------------------
  'createChat' ({userLang, members}) {
    // 대화방 생성

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
        {v: members, c: [String]}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();

    var returnData = {};

    var baseDatetime = new Date();

    var memberIds = [];
    var membersInfo = [];

    memberIds.push(currentUserId);

    membersInfo.push({
      'userId': currentUserId,
      'invitedAt': baseDatetime,
      'deviceId': ''
    });

    _.each(members, function(memberId) {
      memberId = memberId.trim();

      let user = Meteor.users.findOne({_id: memberId});

      if (!user) {
        returnData = {
          status: false,
          code: SPOTCONST.ERROR_NOT_ALLOWED_CHAT_NOT_FRIEND,
          message: TAPi18n.__('error.chat.not_allowed_chat_with_not_friend', {}, userLang)
        };

        return returnData;
      }

      if (!(_.contains(user.relationship.contacts, currentUserId))) {
        returnData = {
          status: false,
          code: SPOTCONST.ERROR_NOT_ALLOWED_CHAT_NOT_FRIEND,
          message: TAPi18n.__('error.chat.not_allowed_chat_with_not_friend', {}, userLang)
        };

        return returnData;
      }

      memberIds.push(memberId.trim());

      membersInfo.push({
        'userId': memberId.trim(),
        'invitedAt': baseDatetime,
        'deviceId': ''
      });
    });

    var chatId = '';

    var dbData = Chats.findOne({
      'members.userId': {
        $all: memberIds
      },
      members: {$size: memberIds.length},
      leavedMembers: {$size: 0}
    });

    if (!dbData) {
      dbData = Chats.insert({
        createdAt: baseDatetime,
        updatedAt: baseDatetime,
        creator: currentUserId,
        isUsing: false,
        members: membersInfo,
        enteredMembers: [],
        leavedMembers: []
      });

      chatId = dbData;

      // --------------------------------------------------
      // 단순 대화방 생성은 푸시하지 않음
      // 최초 메시지 입력 전까지는 미사용으로 설정
      //
      // pushSender(
      //   userLang,
      //   {
      //     type: 'service',
      //     command: 'chat.invited',
      //     sender: currentUserId,
      //     receivers: members,
      //     chatId: dbData,
      //     messageId: '',
      //     friendMessage: ''
      //   }
      // );
      // --------------------------------------------------
    } else {
      chatId = dbData._id;

      if (dbData.isUsing === false) {
        dbData = Chats.update({
          _id: chatId
        }, {
          $set: {
            createdAt: baseDatetime,
            updatedAt: baseDatetime
          }
        });
      }
    }

    if (chatId !== '') {
      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: '',
        data: {
          chatId: chatId
        }
      };
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_CREATE_CHAT_ROOM,
        message: TAPi18n.__('error.chat.failed_create_chat_room', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'inviteChat' ({userLang, chatId, members}) {
    // 대화방 초대

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
        {v: members, c: [String]}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    chatId = chatId.trim();

    var returnData = {};

    var baseDatetime = new Date();

    var isAddedNew = false;

    var chat = Chats.findOne({
      _id: chatId
    });

    var allMembers = chat.members;
    var oldMemberIds = _.pluck(chat.members, 'userId');
    var newMemberIds = [];

    _.each(members, function(newMemberId) {
      newMemberId = newMemberId.trim();

      if (!(_.contains(oldMemberIds, newMemberId))) {
        isAddedNew = true;

        let user = Meteor.users.findOne({_id: newMemberId});

        if (!user) {
          returnData = {
            status: false,
            code: SPOTCONST.ERROR_NOT_ALLOWED_CHAT_NOT_FRIEND,
            message: TAPi18n.__('error.chat.not_allowed_chat_with_not_friend', {}, userLang)
          };

          return returnData;
        }

        if (!(_.contains(user.relationship.contacts, currentUserId))) {
          returnData = {
            status: false,
            code: SPOTCONST.ERROR_NOT_ALLOWED_CHAT_NOT_FRIEND,
            message: TAPi18n.__('error.chat.not_allowed_chat_with_not_friend', {}, userLang)
          };

          return returnData;
        }

        newMemberIds.push(newMemberId);

        allMembers.push({
          'userId': newMemberId,
          'invitedAt': baseDatetime,
          'deviceId': '',
          'isTyping': false
        });
      }
    });

    if (isAddedNew) {
      var dbData = Chats.update({
        _id: chatId
      }, {
        $set: {
          members: allMembers,
          updatedAt: new Date()
        }
      });

      var invitedUsers = Meteor.users.find({
        _id: {
          $in: newMemberIds
        }
      }).fetch();

      if (invitedUsers) {
        invitedUsers = _.map(invitedUsers, function(user) {
          return user.name.last + ' ' + user.name.first;
        });

        var invitedUserNames = _.reduce(invitedUsers, function(nameA, nameB) {
          return nameA + ', ' + nameB;
        });

        // 1301
        // [_creator_]님이 [_text_]님을 초대하였습니다.
        // [_creator_] invited  [_text_].
        // [_creator_]は[_text_]を招待しました。

        Messages.insert({
          chatId: chatId,
          creator: currentUserId,
          encrypted: false,
          messageType: '1301',
          status: 'normal',
          text: invitedUserNames,
          unreaders: []
        });
      }

      if (dbData > 0) {
        pushSender(
          userLang,
          {
            type: 'service',
            command: 'chat.invited',
            deviceId: '',
            sender: currentUserId,
            receivers: newMemberIds,
            chatId: chatId,
            messageId: '',
            friendMessage: ''
          }
        );

        returnData = {
          status: true,
          code: SPOTCONST.ERROR_SUCCEED,
          message: '',
          data: {
            chatId: dbData
          }
        };
      } else {
        returnData = {
          status: false,
          code: SPOTCONST.ERROR_FAILED_UPDATE_CHAT_ROOM,
          message: TAPi18n.__('error.chat.failed_update_chat_room', {}, userLang)
        };
      }
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_NOT_EXIST_NEW_MEMBERS,
        message: TAPi18n.__('error.chat.not_exist_new_members', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'getChatList' ({userLang}={userLang}) {
    // 대화방 목록

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

    var returnData = {};

    var dbData = Chats.find({
      'isUsing': true,
      'members.userId': currentUserId,
      'leavedMembers': {$nin: [currentUserId]}
    }, {
      fields: {
        'members.deviceId': -1
      },
      sort: {
        createdAt: -1
      }
    }).fetch();

    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: '',
      data: {
        chats: dbData
      }
    };

    return returnData;
  },
  // --------------------------------------------------
  'getChatMembers' ({userLang, chatId}) {
    // 대화방 구성원 정보

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
        {v: chatId, c: nonEmptyString}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    chatId = chatId.trim();

    var returnData = {};

    var chat = Chats.findOne({
      _id: chatId
    });

    var members = Meteor.users.find({
      _id: {
        $in: _.pluck(chat.members, 'userId')
      }
    }, {
      fields: {
        _id: 1,
        emails: 1,
        username: 1,
        name: 1,
        phone: 1,
        photo: 1,
      }
    }).fetch();

    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: '',
      data: {
        members: members
      }
    };

    return returnData;
  },
  // --------------------------------------------------
  'enterChat' ({userLang, chatId, deviceId}) {
    // 대화방 입장

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
        {v: deviceId, c: nonEmptyString}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    chatId = chatId.trim();
    deviceId = deviceId.trim();

    var returnData = {};

    var dbData = Chats.findOne({
      _id: chatId,
      'members.userId': currentUserId
    }, {
      fields: {
        'members': 1
      }
    });

    if (!dbData) {
      return {
        status: false,
        code: SPOTCONST.ERROR_NOT_FOUND_CHAT_ROOM,
        message: TAPi18n.__('error.chat.not_found_chat_room', {}, userLang)
      }
    } else {
      var currMember = _.find(dbData.members, function (member) {
        return member.userId == currentUserId;
      });

      if (!currMember) {
        returnData = {
          status: false,
          code: SPOTCONST.ERROR_NOT_CHAT_ROOM_MEMBER,
          message: TAPi18n.__('error.chat.not_chat_room_member', {}, userLang)
        };
      } else {
        if (_.isEmpty(currMember.deviceId)) {
          dbData = Chats.update({
            _id: chatId,
            'members.userId': currentUserId
          }, {
            $set: {
              'members.$.deviceId': deviceId,
              'members.$.enteredAt': new Date(),
              'members.$.isTyping': false,
              'updatedAt': new Date()
            },
            $addToSet: {
              'enteredMembers': currentUserId
            }
          });

          // 1101
          // [_creator_]님이 스팟챗을 시작합니다.
          // [_creator_] starts SPOTChat.
          // [_creator_]さんがスポットチャットを開始します。

          Messages.insert({
            chatId: chatId,
            creator: currentUserId,
            encrypted: false,
            messageType: '1101',
            status: 'normal',
            text: '',
            unreaders: []
          });

          if (dbData > 0) {
            returnData = {
              status: true,
              code: SPOTCONST.ERROR_SUCCEED,
              message: ''
            };
          } else {
            returnData = {
              status: false,
              code: SPOTCONST.ERROR_FAILED_UPDATE_CHAT_ROOM,
              message: TAPi18n.__('error.chat.failed_update_chat_room', {}, userLang)
            };
          }
        } else if (currMember.deviceId === deviceId) {
          returnData = {
            status: true,
            code: SPOTCONST.ERROR_ALREADY_ENTERED_CHAT_ROOM,
            message: TAPi18n.__('error.chat.already_entered_chat_room', {}, userLang)
          };
        } else {
          returnData = {
            status: false,
            code: SPOTCONST.ERROR_ANOTHER_ENTERED_CHAT_ROOM,
            message: TAPi18n.__('error.chat.another_entered_chat_room', {}, userLang)
          };
        }
      }
    }

    return returnData;
  },
  // --------------------------------------------------
  'leaveChat' ({userLang, chatId, deviceId}) {
    // 대화방에서 나가기

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
        {v: deviceId, c: nonEmptyString}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    chatId = chatId.trim();
    deviceId = deviceId.trim();

    var returnData = {};

    var dbData = Chats.findOne({
      _id: chatId,
      'members.userId': currentUserId
    }, {
      fields: {
        'members': 1
      }
    });

    if (!dbData) {
      return {
        status: false,
        code: SPOTCONST.ERROR_NOT_FOUND_CHAT_ROOM,
        message: TAPi18n.__('error.chat.not_found_chat_room', {}, userLang)
      }
    } else {
      var currMember = _.find(dbData.members, function (member) {
        return member.userId == currentUserId;
      });

      if (!currMember) {
        returnData = {
          status: false,
          code: SPOTCONST.ERROR_NOT_CHAT_ROOM_MEMBER,
          message: TAPi18n.__('error.chat.not_chat_room_member', {}, userLang)
        };
      } else {
        if (_.isEmpty(currMember.deviceId) || currMember.deviceId === deviceId) {
          dbData = Chats.update({
            _id: chatId,
            'members.userId': currentUserId
          }, {
            $pull: {
              members: {
                userId: currentUserId
              },
              enteredMembers: currentUserId
            },
            $addToSet: {
              leavedMembers: currentUserId
            }
          });

          // 1201
          // [_creator_]님이 27 권리를 행사하셨습니다.
          // [_creator_] left the chat room.
          // [_creator_]は、チャットルームを出ました。

          Messages.insert({
            chatId: chatId,
            creator: currentUserId,
            encrypted: false,
            messageType: '1201',
            status: 'normal',
            text: '',
            unreaders: []
          });

          if (dbData > 0) {
            returnData = {
              status: true,
              code: SPOTCONST.ERROR_SUCCEED,
              message: ''
            };
          } else {
            returnData = {
              status: false,
              code: SPOTCONST.ERROR_FAILED_UPDATE_CHAT_ROOM,
              message: TAPi18n.__('error.chat.failed_update_chat_room', {}, userLang)
            };
          }
        } else {
          returnData = {
            status: false,
            code: SPOTCONST.ERROR_ANOTHER_ENTERED_CHAT_ROOM,
            message: TAPi18n.__('error.chat.another_entered_chat_room', {}, userLang)
          };
        }
      }
    }

    return returnData;
  },
  // --------------------------------------------------
  'removeChat' ({userLang, chatId, deviceId}) {
    // 대화방 제거

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
        {v: deviceId, c: nonEmptyString}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    chatId = chatId.trim();
    deviceId = deviceId.trim();

    var returnData = {};

    var dbData = Chats.remove({
      _id: chatId,
      'members.userId': currentUserId
    });

    if (dbData === 1) {
      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: ''
      };
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_DELETE_CHAT_ROOM,
        message: TAPi18n.__('error.chat.failed_delete_chat_room', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'removeMissedChat' ({userLang, chatId}) {
    // 부재중 대화방 목록에서 제거

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
          {v: chatId, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    chatId = chatId.trim();

    var returnData = {};

    var dbData = MissedChats.remove({
      _id: chatId,
      missedUser: currentUserId
    });

    if (dbData === 1) {
      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: ''
      };
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_DELETE_MISSED_CHAT_ROOM,
        message: TAPi18n.__('error.chat.failed_delete_missed_chat_room', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'setExpire' ({userLang, chatId, deviceId, timeLimit}) {
    // 대화방 제한 시간 변경

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
        {v: deviceId, c: nonEmptyString},
        {v: timeLimit, c: Number}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    chatId = chatId.trim();
    deviceId = deviceId.trim();

    var returnData = {};

    var dbData = Chats.update({
      _id: chatId,
      'members.userId': currentUserId,
      'members.deviceId': deviceId
    }, {
      $set: {
        updatedAt: (new Date()),
        timeLimit: timeLimit
      }
    });

    // 3101
    // [_creator_]님이 대화방 유지 시간을 [_text_]로 변경하였습니다.
    // [_creator_] has changed the chat room hold time to [_text_].
    // [_creator_]はチャットルームの保留時間を[_text_]に変更しました。

    Messages.insert({
      chatId: chatId,
      creator: currentUserId,
      encrypted: false,
      messageType: '3101',
      status: 'normal',
      text: moment(timeLimit*1000).format('mm:ss'),
      unreaders: []
    });

    if (dbData > 0) {
      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: ''
      };
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_UPDATE_CHAT_ROOM,
        message: TAPi18n.__('error.chat.failed_update_chat_room', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'setTypingStatus' ({userLang, chatId, deviceId, isTyping}) {
    // 대화방에서 입력 중인지 여부 설정

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
          {v: deviceId, c: nonEmptyString},
          {v: isTyping, c: Boolean}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    chatId = chatId.trim();

    var returnData = {};

    var dbData = Chats.findOne({
      _id: chatId,
      'members.userId': currentUserId
    });

    if (!dbData) {
      return {
        status: false,
        code: SPOTCONST.ERROR_NOT_FOUND_CHAT_ROOM,
        message: TAPi18n.__('error.chat.not_found_chat_room', {}, userLang)
      }
    } else {
      var currMember = _.find(dbData.members, function (member) {
        return member.userId == currentUserId;
      });

      if (!currMember) {
        returnData = {
          status: false,
          code: SPOTCONST.ERROR_NOT_CHAT_ROOM_MEMBER,
          message: TAPi18n.__('error.chat.not_chat_room_member', {}, userLang)
        };
      } else {
        dbData = Chats.update({
          _id: chatId,
          'members.userId': currentUserId
        }, {
          $set: {
            'members.$.isTyping': isTyping
          }
        });

        if (dbData > 0) {
          returnData = {
            status: true,
            code: SPOTCONST.ERROR_SUCCEED,
            message: ''
          };
        } else {
          returnData = {
            status: false,
            code: SPOTCONST.ERROR_FAILED_UPDATE_CHAT_ROOM,
            message: TAPi18n.__('error.chat.failed_update_chat_room', {}, userLang)
          };
        }
      }
    }

    return returnData;
  }
});
