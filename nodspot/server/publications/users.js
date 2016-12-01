// ====================================================================================================
// Meteor.user() 메서드에 정보를 추가하기 위해 사용
// ----------------------------------------------------------------------------------------------------
// 기본적으로 다음 3가지만 정보가 제공됨
// Meteor.user().profile, Meteor.user().username, Meteor.user().emails
// ----------------------------------------------------------------------------------------------------

// // ##################################################
// // 웹에서 테스트를 위해서 사용
// // 서비스 시에는 제거 필요
// Meteor.publish(null, function () {
//   if (this.userId) {
//     return Meteor.users.find({
//       // _id: this.userId
//     }, {
//       fields: {
//         emails: 1,
//         relationship: 1,
//         status: 1,
//         username: 1
//       }
//     });
//   } else {
//     return null;
//   }
// });
// // ##################################################

Meteor.publish("myData", function () {
  if (this.userId) {
    return Meteor.users.find({
      _id: this.userId
    }, {
      fields: {
        _id: 1,
        emails: 1,
        username: 1,
        name: 1,
        phone: 1,
        photo: 1,
        'status.online': 1,
        relationship: 1,
        push: 1
      }
    });
  } else {
    return this.ready();
  }
});

Meteor.publish("searchUsers", function(userName) {
  userName = userName.trim();

  if (this.userId) {
    return Meteor.users.find({
      username: new RegExp(userName, "g")
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
    });
  }
});

Meteor.publish('searchUsers2', function (userName) {
  userName = userName.trim();
  userName = new RegExp(userName, "g");

  var self = this;
  var handle = Meteor.users.find({
    username: userName
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
  }).observeChanges({
    added: function (id, fields) {
      self.added('spotUserCollection', id, fields);
    },
    changed: function (id, fields) {
      self.changed('spotUserCollection', id, fields);
    },
    removed: function (id) {
      self.removed('spotUserCollection', id);
    }
  });

  self.ready();

  self.onStop(function () {
    handle.stop();
  });
});

Meteor.publish('searchByName', function (Name) {

  let userId = this.userId;


  Name = Name.trim();
  Name = new RegExp(Name, "g");

  var rawCollection = Meteor.users.rawCollection();

  var self = this;
  var handle = Meteor.users.aggregate([
    {
      $project: {
        item: 1,
        emails: 1,
        username: 1,
        name: 1,
        phone: 1,
        photo: 1,
        'status.online': 1,

        fullname: {
          $concat: ['$name.last', ' ', '$name.middle', ' ', '$name.first']
        },
        fullnameLower: {
          $toLower: {$concat: ['$name.last', '$name.middle', '$name.first']}
        }
      }
    }, {
      $match: {
        fullnameLow: new RegExp(Name),
        userId: {$ne: userId}
      }
    }, {
      $project: {
        item: 1,
        emails: 1,
        username: 1,
        name: 1,
        phone: 1,
        photo: 1,
        'status.online': 1,

        fullname: 1
      }
    }
  ]);

  return handle;
});

Meteor.publish('searchByPhone', function (PhoneNumber) {
  console.log(PhoneNumber);
  PhoneNumber = PhoneNumber.trim();
  PhoneNumber = new RegExp(PhoneNumber, "g");

  var self = this;
  var handle = Meteor.users.find({
    'phone.number': PhoneNumber
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
  }).observeChanges({
    added: function (id, fields) {
      console.log('added : ' + id + ' ' + JSON.stringify(fields));

      self.added('spotUserCollection', id, fields);
    },
    changed: function (id, fields) {
      console.log('changed : ' + id + ' ' + JSON.stringify(fields));

      self.changed('spotUserCollection', id, fields);
    },
    removed: function (id) {
      console.log('removed : ' + id);
      self.removed('spotUserCollection', id);
    }
  });

  self.ready();

  self.onStop(function () {
    handle.stop();
  });
});

Meteor.publish('searchByEmail', function (Email) {
  console.log(Email);
  Email = Email.trim();
  Email = new RegExp(Email, "g");

  var self = this;

  var handle = Meteor.users.find({
    'emails.address': Email
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
  }).observeChanges({
    added: function (id, fields) {
      self.added('spotUserCollection', id, fields);
    },
    changed: function (id, fields) {
      self.changed('spotUserCollection', id, fields);
    },
    removed: function (id) {
      self.removed('spotUserCollection', id);
    }
  });

  self.ready();

  self.onStop(function () {
    handle.stop();
  });
});

Meteor.publish("users.on.myphone", function(phonenumbers) {
  phonenumbers = phonenumbers.trim();

  if (this.userId) {
    return Meteor.users.find({
      'phone.number': {
        $in: phonenumbers.split(',')
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
    });
  }
});
// ====================================================================================================

Meteor.publish("contacts", function () {
  var currentUserId = this.userId;

  if (!currentUserId) {
    return this.ready();
  }

  var currentUser = Meteor.users.findOne({
    _id: currentUserId
  });

  var searchIn = [];
  searchIn.push(currentUserId);

  _.each(currentUser.relationship.contacts, function(userId) {
    searchIn.push(userId);
  });
  _.each(currentUser.relationship.blocked, function(userId) {
    searchIn.push(userId);
  });
  _.each(currentUser.relationship.declined, function(userId) {
    searchIn.push(userId);
  });
  _.each(currentUser.relationship.incoming, function(userId) {
    searchIn.push(userId);
  });
  _.each(currentUser.relationship.outgoing, function(userId) {
    searchIn.push(userId);
  });

  return Meteor.users.find({
    _id: {
      $in: searchIn
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
  });
});

Meteor.publish("chatMembers", function (chatId) {
  chatId = chatId.trim();

  if (!this.userId) {
    return this.ready();
  }

  var chat = Chats.findOne({
    _id: chatId
  });

  if (!chat) {
    console.log('## PUBLISH: chatMembers: chat [' + chatId + '] not found');
    return this.ready();
  } else {
    var members = Meteor.users.find({
      _id: {
        $in: _.union(_.pluck(chat.members, 'userId'), chat.leavedMembers)
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
    });

    var unread = Messages.find({
      chatId: chatId,
      unreaders: this.userId
    });

    return [members, unread];
  }
});
