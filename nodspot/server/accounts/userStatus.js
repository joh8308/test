// UserStatus.events.on("connectionLogin", function(fields) {
//   console.log('UserStatus.events.connectionLogin');
//   console.log(fields);
// });

UserStatus.events.on("connectionLogout", function(fields) {
  // console.log('UserStatus.events.connectionLogout');
  // console.log(fields);

  var userId = fields.userId;

  Chats.update({
    'members.userId': userId,
    'enteredMembers': userId
  }, {
    $set: {
      'members.$.isTyping': false
    }
  }, {
    multi: true
  });
});

// UserStatus.events.on("connectionIdle", function(fields) {
//   console.log('UserStatus.events.connectionIdle');
//   console.log(fields);
// });

// UserStatus.events.on("connectionActive", function(fields) {
//   console.log('UserStatus.events.connectionActive');
//   console.log(fields);
// });