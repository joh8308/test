import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const ReservedUserIds = new Mongo.Collection("reserveduserids");
export default ReservedUserIds;

ReservedUserIds.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

ReservedUserIds.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

ReservedUserIds.schema = new SimpleSchema({
  clientId: {
    type: String,
    label: "Client ID"
  },
  userId: {
    type: String,
    label: "User ID",
    index: 1
  }
});

ReservedUserIds.attachSchema(ReservedUserIds.schema);

// --------------------------------------------------

ReservedUserIds.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});