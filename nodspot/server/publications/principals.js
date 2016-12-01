Meteor.publish("principalsForChat", function(chatId) {
  var currentUserId = this.userId;

  if (!currentUserId) {
    return this.ready();
  }

  var chat = Chats.findOne({
    '_id': chatId,
    'members.userId': currentUserId,
    'leavedMembers': {$ne: currentUserId}
  });

  if (!chat) {
    return this.ready();
  } else {
    var messages = Messages.find({
      chatId: chatId
    });

    var messageIds = messages.fetch().map(({_id})=>_id);

    var memberIds = [];
    memberIds = memberIds.concat(chat.members.map(({userId})=>userId));
    memberIds = memberIds.concat(chat.leavedMembers);
    memberIds = _.unique(memberIds);

    return Principals.find({
      dataId: {
        $in: memberIds.concat(messageIds)
      },
      $or: [{
        ownerId: currentUserId
      }, {
        'encryptedPrivateKeys.userId': currentUserId
      }]
    });
  }
});

Meteor.publish("usersPrincipalForChat", function(chatId) {
  var currentUserId = this.userId;

  if (!currentUserId) {
    return this.ready();
  }

  var chat = Chats.findOne({
    '_id': chatId,
    'members.userId': currentUserId,
    'leavedMembers': {$ne: currentUserId}
  });

  if (!chat) {
    return this.ready();
  } else {
    var members = [];
    members = members.concat(chat.members.map(({userId})=>userId));
    members = members.concat(chat.leavedMembers);

    members = _.unique(members);

    return [
      Chats.find({
        _id: chatId
      }, {
        fields: {
          members: 1
        },
        sort: {
          createdAt: -1
        }
      }),

      Principals.find({
        dataId: {
          $in: members
        }
      })
    ];
  }
});
