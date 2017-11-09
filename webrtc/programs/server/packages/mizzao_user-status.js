(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Accounts = Package['accounts-base'].Accounts;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

/* Package-scope variables */
var __coffeescriptShare, UserStatus, StatusInternals;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/mizzao_user-status/status.coffee.js                                                                   //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
/*                                                                                                                // 1
  Apparently, the new api.export takes care of issues here. No need to attach to global namespace.                //
  See http://shiggyenterprises.wordpress.com/2013/09/09/meteor-packages-in-coffeescript-0-6-5/                    //
                                                                                                                  //
  We may want to make UserSessions a server collection to take advantage of indices.                              //
  Will implement if someone has enough online users to warrant it.                                                //
 */var UserConnections, activeSession, addSession, idleSession, loginSession, onStartup, removeSession, statusEvents, tryLogoutSession;
UserConnections = new Mongo.Collection("user_status_sessions", {                                                  // 8
  connection: null                                                                                                // 8
});                                                                                                               // 8
statusEvents = new (Npm.require('events').EventEmitter)(); /*                                                     // 10
                                                             Multiplex login/logout events to status.online       //
                                                                                                                  //
                                                             'online' field is "true" if user is online, and "false" otherwise
                                                                                                                  //
                                                             'idle' field is tri-stated:                          //
                                                             - "true" if user is online and not idle              //
                                                             - "false" if user is online and idle                 //
                                                             - null if user is offline                            //
                                                            */                                                    //
statusEvents.on("connectionLogin", function (advice) {                                                            // 22
  var conns, update;                                                                                              // 23
  update = {                                                                                                      // 23
    $set: {                                                                                                       // 24
      'status.online': true,                                                                                      // 25
      'status.lastLogin': {                                                                                       // 26
        date: advice.loginTime,                                                                                   // 27
        ipAddr: advice.ipAddr,                                                                                    // 28
        userAgent: advice.userAgent                                                                               // 29
      }                                                                                                           // 26
    }                                                                                                             // 24
  };                                                                                                              // 24
  conns = UserConnections.find({                                                                                  // 35
    userId: advice.userId                                                                                         // 35
  }).fetch();                                                                                                     // 35
                                                                                                                  //
  if (!_.every(conns, function (c) {                                                                              // 36
    return c.idle;                                                                                                // 45
  })) {                                                                                                           // 36
    update.$set['status.idle'] = false;                                                                           // 37
    update.$unset = {                                                                                             // 38
      'status.lastActivity': null                                                                                 // 39
    };                                                                                                            // 39
  }                                                                                                               // 51
                                                                                                                  //
  Meteor.users.update(advice.userId, update);                                                                     // 42
});                                                                                                               // 22
statusEvents.on("connectionLogout", function (advice) {                                                           // 45
  var conns;                                                                                                      // 46
  conns = UserConnections.find({                                                                                  // 46
    userId: advice.userId                                                                                         // 46
  }).fetch();                                                                                                     // 46
                                                                                                                  //
  if (conns.length === 0) {                                                                                       // 47
    Meteor.users.update(advice.userId, {                                                                          // 50
      $set: {                                                                                                     // 51
        'status.online': false                                                                                    // 51
      },                                                                                                          // 51
      $unset: {                                                                                                   // 52
        'status.idle': null,                                                                                      // 53
        'status.lastActivity': null                                                                               // 54
      }                                                                                                           // 53
    });                                                                                                           // 51
  } else if (_.every(conns, function (c) {                                                                        // 47
    return c.idle;                                                                                                // 71
  })) {                                                                                                           // 55
    /*                                                                                                            // 56
      All remaining connections are idle:                                                                         //
      - If the last active connection quit, then we should go idle with the most recent activity                  //
                                                                                                                  //
      - If an idle connection quit, nothing should happen; specifically, if the                                   //
        most recently active idle connection quit, we shouldn't tick the value backwards.                         //
        This may result in a no-op so we can be smart and skip the update.                                        //
     */if (advice.lastActivity != null) {                                                                         //
      return;                                                                                                     // 64
    }                                                                                                             // 84
                                                                                                                  //
    Meteor.users.update(advice.userId, {                                                                          // 66
      $set: {                                                                                                     // 67
        'status.idle': true,                                                                                      // 68
        'status.lastActivity': _.max(_.pluck(conns, "lastActivity"))                                              // 69
      }                                                                                                           // 68
    });                                                                                                           // 67
  }                                                                                                               // 91
}); /*                                                                                                            // 45
      Multiplex idle/active events to status.idle                                                                 //
      TODO: Hopefully this is quick because it's all in memory, but we can use indices if it turns out to be slow
                                                                                                                  //
      TODO: There is a race condition when switching between tabs, leaving the user inactive while idle goes from one tab to the other.
      It can probably be smoothed out.                                                                            //
     */                                                                                                           //
statusEvents.on("connectionIdle", function (advice) {                                                             // 79
  var conns;                                                                                                      // 80
  conns = UserConnections.find({                                                                                  // 80
    userId: advice.userId                                                                                         // 80
  }).fetch();                                                                                                     // 80
                                                                                                                  //
  if (!_.every(conns, function (c) {                                                                              // 81
    return c.idle;                                                                                                // 109
  })) {                                                                                                           // 81
    return;                                                                                                       // 81
  }                                                                                                               // 112
                                                                                                                  //
  Meteor.users.update(advice.userId, {                                                                            // 86
    $set: {                                                                                                       // 87
      'status.idle': true,                                                                                        // 88
      'status.lastActivity': _.max(_.pluck(conns, "lastActivity"))                                                // 89
    }                                                                                                             // 88
  });                                                                                                             // 87
});                                                                                                               // 79
statusEvents.on("connectionActive", function (advice) {                                                           // 92
  Meteor.users.update(advice.userId, {                                                                            // 93
    $set: {                                                                                                       // 94
      'status.idle': false                                                                                        // 95
    },                                                                                                            // 95
    $unset: {                                                                                                     // 96
      'status.lastActivity': null                                                                                 // 97
    }                                                                                                             // 97
  });                                                                                                             // 94
});                                                                                                               // 92
                                                                                                                  //
onStartup = function (selector) {                                                                                 // 101
  if (selector == null) {                                                                                         // 133
    selector = {};                                                                                                // 101
  }                                                                                                               // 135
                                                                                                                  //
  return Meteor.users.update(selector, {                                                                          // 136
    $set: {                                                                                                       // 104
      "status.online": false                                                                                      // 105
    },                                                                                                            // 104
    $unset: {                                                                                                     // 107
      "status.idle": null,                                                                                        // 108
      "status.lastActivity": null                                                                                 // 109
    }                                                                                                             // 107
  }, {                                                                                                            // 103
    multi: true                                                                                                   // 112
  });                                                                                                             // 112
}; /*                                                                                                             // 101
     Local session modifification functions - also used in testing                                                //
    */                                                                                                            //
                                                                                                                  //
addSession = function (connection) {                                                                              // 118
  UserConnections.upsert(connection.id, {                                                                         // 119
    $set: {                                                                                                       // 120
      ipAddr: connection.clientAddress,                                                                           // 121
      userAgent: connection.httpHeaders['user-agent']                                                             // 122
    }                                                                                                             // 120
  });                                                                                                             // 120
};                                                                                                                // 118
                                                                                                                  //
loginSession = function (connection, date, userId) {                                                              // 126
  UserConnections.upsert(connection.id, {                                                                         // 127
    $set: {                                                                                                       // 128
      userId: userId,                                                                                             // 129
      loginTime: date                                                                                             // 130
    }                                                                                                             // 128
  });                                                                                                             // 128
  statusEvents.emit("connectionLogin", {                                                                          // 133
    userId: userId,                                                                                               // 134
    connectionId: connection.id,                                                                                  // 135
    ipAddr: connection.clientAddress,                                                                             // 136
    userAgent: connection.httpHeaders['user-agent'],                                                              // 137
    loginTime: date                                                                                               // 138
  });                                                                                                             // 134
};                                                                                                                // 126
                                                                                                                  //
tryLogoutSession = function (connection, date) {                                                                  // 142
  var conn;                                                                                                       // 143
                                                                                                                  //
  if ((conn = UserConnections.findOne({                                                                           // 143
    _id: connection.id,                                                                                           // 182
    userId: {                                                                                                     // 183
      $exists: true                                                                                               // 184
    }                                                                                                             // 183
  })) == null) {                                                                                                  // 143
    return false;                                                                                                 // 143
  }                                                                                                               // 188
                                                                                                                  //
  UserConnections.upsert(connection.id, {                                                                         // 149
    $unset: {                                                                                                     // 150
      userId: null,                                                                                               // 151
      loginTime: null                                                                                             // 152
    }                                                                                                             // 150
  });                                                                                                             // 150
  return statusEvents.emit("connectionLogout", {                                                                  // 195
    userId: conn.userId,                                                                                          // 156
    connectionId: connection.id,                                                                                  // 157
    lastActivity: conn.lastActivity,                                                                              // 158
    logoutTime: date                                                                                              // 159
  });                                                                                                             // 156
};                                                                                                                // 142
                                                                                                                  //
removeSession = function (connection, date) {                                                                     // 161
  tryLogoutSession(connection, date);                                                                             // 162
  UserConnections.remove(connection.id);                                                                          // 163
};                                                                                                                // 161
                                                                                                                  //
idleSession = function (connection, date, userId) {                                                               // 166
  UserConnections.update(connection.id, {                                                                         // 167
    $set: {                                                                                                       // 168
      idle: true,                                                                                                 // 169
      lastActivity: date                                                                                          // 170
    }                                                                                                             // 168
  });                                                                                                             // 168
  statusEvents.emit("connectionIdle", {                                                                           // 173
    userId: userId,                                                                                               // 174
    connectionId: connection.id,                                                                                  // 175
    lastActivity: date                                                                                            // 176
  });                                                                                                             // 174
};                                                                                                                // 166
                                                                                                                  //
activeSession = function (connection, date, userId) {                                                             // 179
  UserConnections.update(connection.id, {                                                                         // 180
    $set: {                                                                                                       // 181
      idle: false                                                                                                 // 181
    },                                                                                                            // 181
    $unset: {                                                                                                     // 182
      lastActivity: null                                                                                          // 182
    }                                                                                                             // 182
  });                                                                                                             // 181
  statusEvents.emit("connectionActive", {                                                                         // 184
    userId: userId,                                                                                               // 185
    connectionId: connection.id,                                                                                  // 186
    lastActivity: date                                                                                            // 187
  });                                                                                                             // 185
}; /*                                                                                                             // 179
     Handlers for various client-side events                                                                      //
    */                                                                                                            //
                                                                                                                  //
Meteor.startup(onStartup);                                                                                        // 193
Meteor.onConnection(function (connection) {                                                                       // 196
  addSession(connection);                                                                                         // 197
  return connection.onClose(function () {                                                                         // 247
    return removeSession(connection, new Date());                                                                 // 248
  });                                                                                                             // 199
});                                                                                                               // 196
Accounts.onLogin(function (info) {                                                                                // 203
  return loginSession(info.connection, new Date(), info.user._id);                                                // 253
});                                                                                                               // 203
Meteor.publish(null, function () {                                                                                // 208
  if (this._session == null) {                                                                                    // 211
    return [];                                                                                                    // 211
  }                                                                                                               // 259
                                                                                                                  //
  if (this.userId == null) {                                                                                      // 214
    tryLogoutSession(this._session.connectionHandle, new Date());                                                 // 214
  }                                                                                                               // 262
                                                                                                                  //
  return [];                                                                                                      // 216
});                                                                                                               // 208
Meteor.methods({                                                                                                  // 221
  "user-status-idle": function (timestamp) {                                                                      // 222
    var date;                                                                                                     // 223
    check(timestamp, Match.OneOf(null, void 0, Date, Number));                                                    // 223
    date = timestamp != null ? new Date(timestamp) : new Date();                                                  // 225
    idleSession(this.connection, date, this.userId);                                                              // 226
  },                                                                                                              // 222
  "user-status-active": function (timestamp) {                                                                    // 229
    var date;                                                                                                     // 230
    check(timestamp, Match.OneOf(null, void 0, Date, Number));                                                    // 230
    date = timestamp != null ? new Date(timestamp) : new Date();                                                  // 235
    activeSession(this.connection, date, this.userId);                                                            // 236
  }                                                                                                               // 222
});                                                                                                               // 222
UserStatus = {                                                                                                    // 240
  connections: UserConnections,                                                                                   // 241
  events: statusEvents                                                                                            // 242
};                                                                                                                // 241
StatusInternals = {                                                                                               // 245
  onStartup: onStartup,                                                                                           // 246
  addSession: addSession,                                                                                         // 247
  removeSession: removeSession,                                                                                   // 248
  loginSession: loginSession,                                                                                     // 249
  tryLogoutSession: tryLogoutSession,                                                                             // 250
  idleSession: idleSession,                                                                                       // 251
  activeSession: activeSession                                                                                    // 252
};                                                                                                                // 245
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['mizzao:user-status'] = {}, {
  UserStatus: UserStatus,
  StatusInternals: StatusInternals
});

})();

//# sourceMappingURL=mizzao_user-status.js.map
