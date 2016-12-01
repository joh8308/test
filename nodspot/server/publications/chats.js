Meteor.publish('chats', function (chatId) {
  var currentUserId = this.userId;

  if (!currentUserId) {
    return this.ready();
  }

  if (!chatId) {
    return Chats.find({
      'isUsing': true,
      'members.userId': currentUserId,
      'leavedMembers': {$ne: currentUserId}
    }, {
      sort: {
        createdAt: -1
      }
    });
  } else {
    return Chats.find({
      _id: chatId.trim(),
      'members.userId': currentUserId,
      'leavedMembers': {$ne: currentUserId}
    }, {
      sort: {
        createdAt: -1
      }
    });
  }
});

Meteor.publish('missed.chats', function () {
  var currentUserId = this.userId;

  if (!currentUserId) {
    return this.ready();
  }

  return MissedChats.find({
    missedUser: currentUserId
  }, {
    sort: {
      createdAt: -1
    }
  });
});