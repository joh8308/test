// configuration for accounts
SimpleSchema.debug = true;

Accounts.urls.resetPassword = (token) => {
  return Meteor.absoluteUrl(`reset-password/${token}`);
};

Accounts.urls.verifyEmail = (token) => {
  return Meteor.absoluteUrl(`verify-email/${token}`);
};

Accounts.urls.enrollAccount = (token) => {
  return Meteor.absoluteUrl(`enroll-account/${token}`);
};

// ====================================================================================================
Accounts.onCreateUser(function(options, user) {
  // this method will execute after user created by meteror signup or customized join

  // Sample Data (options) : Meteor Standard
  // --------------------------------------------------
  // {
  //   "username": "user01",
  //   "htmls": "user01@abc.xyz",
  //   "password": {
  //     "digest": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
  //     "algorithm": "sha-256"
  //   },
  //   "profile": {
  //     "firstname": "user",
  //     "middlename": "",
  //     "lastname": "last",
  //     "countrytelephonecode": "82",
  //     "phonenumber": "01012340001"
  //   }
  // }
  // --------------------------------------------------

  user.username = user.username.toLowerCase();

  user.userid = user.username;

  user.name = {
    'first': options.profile.firstname || '',
    'middle': options.profile.middlename || '',
    'last': options.profile.lastname || ''
  };

  user.push = {
    base: {
      use: true,
      weekdays: [0,1,2,3,4,5,6],
      time: {
        allDay: true,
        begin: '08:30',
        end: '18:30'
      }
    },
    friendRequested: {
      use: true,
      weekdays: [0,1,2,3,4,5,6],
      time: {
        allDay: true,
        begin: '08:30',
        end: '18:30'
      }
    },
    chatInvited: {
      use: true,
      weekdays: [0,1,2,3,4,5,6],
      time: {
        allDay: true,
        begin: '08:30',
        end: '18:30'
      }
    },
    messageReceived: {
      use: true,
      weekdays: [0,1,2,3,4,5,6],
      time: {
        allDay: true,
        begin: '08:30',
        end: '18:30'
      }
    }
  };

  user.phone = {
    number: options.profile.phonenumber.replace(/[^0-9]/gi, ''),
    countrycode: options.profile.countrytelephonecode.replace(/[^0-9]/gi, ''),
    verified: true
  };

  user.photo = {
    'origin': '',
    'thumb': ''
  };

  user.relationship = {
    'contacts': [],
    'blocked': [],
    'declined': [],
    'incoming': [],
    'outgoing': []
  };

  user.roles = ['user'];

  user.type = 'user';

  // user.profile = _.extend(_.omit(options.profile, ['phonenumber', 'countrytelephonecode'])||{}, {
  //   'contacts': [],
  //   'friendRequests': [],
  //   'requestedFriendships': []
  // });

  return user;
});

Meteor.users.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (doc.phone.countrycode !== this.previous.phone.countrycode) {
    doc.phone.countrycode = doc.phone.countrycode.replace(/[^0-9]/gi, '');
  }

  if (doc.phone.number !== this.previous.phone.number) {
    doc.phone.number = doc.phone.number.replace(/[^0-9]/gi, '');
  }
});

Meteor.users.before.remove(function(userId, doc) {
  Friendships.remove({
    $or: [
      {requester: userId},
      {requestedTo: userId}
    ]
  });

  Push.appCollection.remove({
    userId: userId
  });

  Meteor.users.update({
  }, {
    $pull: {
      'relationship.contacts': userId
    }
  }, {
    multi: true
  });
});
// ====================================================================================================
