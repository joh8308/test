import Chats from './friends';
import ProfileFiles from './profilefiles';

Meteor.users.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Meteor.users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Meteor.users.before.remove(function(userId, doc) {
  Principals.remove({
    dataType: 'usersPrincipal',
    dataId: doc._id
  });

  ProfileFiles.remove({
    owner: doc._id
  });
});

Meteor.users.before.update(function (userId, doc, fieldNames, modifier, options) {
  if (modifier.$set) {
    if (_.has(modifier.$set, 'services.password.bcrypt')) {
      var userId = doc._id;

      Chats.update({
        'members.userId': userId
      }, {
        $pull: {
          members: {
            userId: userId
          },
          enteredMembers: userId
        },
        $addToSet: {
          leavedMembers: userId
        }
      }, {
        multi: true
      });
    }
  }
});