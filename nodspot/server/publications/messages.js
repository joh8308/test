Meteor.publish('messages', function(chatId) {
  check(chatId, String);

  chatId = chatId.trim();

  var currentUserId = this.userId;

  if (!currentUserId) {
    return this.ready();
  }

  var chat = Chats.findOne({
    _id: chatId
  });

  if (!chat) {
    return this.ready();
  } else {
    var enteredAt = null;
    var invitedAt = null;

    var members = _.map(chat.members, function(member) {
      if (member.userId === currentUserId) {
        if(_.has(member, 'enteredAt')) {
          enteredAt = member.enteredAt;
        }

        if(_.has(member, 'invitedAt')) {
          invitedAt = member.invitedAt;
        }
      }

      return member.userId;
    });

    if (!_.contains(members, currentUserId)) {
      return this.ready();
    }

    if (enteredAt === null) {
      return this.ready();
    }

    return [
      Messages.find({
        chatId: chatId,
        createdAt: {$gte: invitedAt}
      }, {
        sort: {
          createdAt: 1
        }
      }),

      Meteor.users.find({
        _id: {
          $in: members
        }
      }, {
        fields: {
          _id: 1,
          emails: 1,
          username: 1,
          name: 1,
          phone: 1,
          photo: 1,
          'status.online': 1
        }
      })
    ];
  }
});

Meteor.publish('unread.messages', function() {
  var currentUserId = this.userId;

  if (!currentUserId) {
    return this.ready();
  }

  var chatList = Chats.find({
    // 'enteredMembers': currentUserId,
    'members.userId': currentUserId,
    'leavedMembers': {$ne: currentUserId}
  });

  if (!chatList) {
    return this.ready();
  } else {
    return [
      Messages.find({
        chatId: {$in: _.pluck(chatList.fetch(), '_id')},
        unreaders: currentUserId
      }, {
        sort: {
          createdAt: -1
        }
      }),

      chatList
    ];
  }
});