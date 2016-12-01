import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const MissedChats = new Mongo.Collection("missedChats");
export default MissedChats;

MissedChats.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

MissedChats.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

MissedChats.nameSchema = new SimpleSchema({
  first: {
    type: String
  },
  middle: {
    type: String,
    defaultValue: ''
  },
  last: {
    type: String
  }
});

MissedChats.schema = new SimpleSchema({
  chatType: {
    type: String
  },
  creatorId: {
    type: String
  },
  creatorUsername: {
    type: String
  },
  creatorName: {
    type: MissedChats.nameSchema
  },
  createdAt: {
    type: Date
  },
  missedUser: {
    type: String
  },
  memberCount: {
    type: Number
  }
});

MissedChats.attachSchema(MissedChats.schema);
