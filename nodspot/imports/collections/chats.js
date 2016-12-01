import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import Messages from './messages';
import MissedChats from './missedChats';

const Chats = new Mongo.Collection("chats");
export default Chats;

Chats.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Chats.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Chats.membersSchema = new SimpleSchema({
  userId: {
    type: String
  },
  deviceId: {
    type: String,
    defaultValue: '',
    optional: true
  },
  isTyping: {
    type: Boolean,
    defaultValue: false,
    optional: true
  },
  enteredAt: {
    type: Date,
    optional: true
  },
  invitedAt: {
    type: Date,
    optional: true
  }
});

Chats.schema = new SimpleSchema({
  createdAt: {
    type: Date
  },
  creator: {
    type: String
  },
  isUsing: {
    type: Boolean,
    defaultValue: false
  },
  members: {
    type: [Chats.membersSchema]
  },
  enteredMembers: {
    type: [String]
  },
  leavedMembers: {
    type: [String]
  },
  updatedAt: {
    type: Date,
    optional: true
  },
  timeLimit: {
    type: Number,
    defaultValue: 27 * 60
  }
});

Chats.attachSchema(Chats.schema);

// --------------------------------------------------

Chats.before.insert(function(userId, doc) {
});

Chats.before.remove(function(userId, doc) {
  let members = _.pluck(doc.members, 'userId');
  let enteredMembers = _.union(doc.enteredMembers || [], doc.leavedMembers || []);
  let unenteredMembers = _.difference(members, enteredMembers);
  let chatCreator = Meteor.users.findOne({
    _id: doc.creator
  });

  if (chatCreator) {
    _.each(unenteredMembers, function(unenteredMember) {
      MissedChats.insert({
        chatType: members.length > 2 ? 'group' : 'direct',
        creatorId: chatCreator._id,
        creatorUsername: chatCreator.username,
        creatorName: chatCreator.name,
        createdAt: doc.createdAt,
        missedUser: unenteredMember,
        memberCount: members.length
      });
    });
  }

  Messages.remove({
    chatId: doc._id
  });
});


