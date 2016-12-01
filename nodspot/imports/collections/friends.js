import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const Friendships = new Mongo.Collection("friendships");
export default Friendships;

Friendships.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Friendships.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Friendships.nameSchema = new SimpleSchema({
  first: {
    type: String
  },
  middle: {
    type: String,
    defaultValue: '',
    optional: true
  },
  last: {
    type: String
  }
});

Friendships.schema = new SimpleSchema({
  requester: {
    type: String
  },
  requesterName: {
    type: Friendships.nameSchema
  },
  requestedTo: {
    type: String
  },
  message: {
    type: String
  },
  createdAt: {
    type: Date
  }
});

Friendships.attachSchema(Friendships.schema);
