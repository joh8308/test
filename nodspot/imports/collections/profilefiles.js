import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const ProfileFiles = new Mongo.Collection("profilefiles");
export default ProfileFiles;

ProfileFiles.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

ProfileFiles.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

ProfileFiles.schema = new SimpleSchema({
  owner: {
    type: String
  },
  path: {
    type: String
  },
  name: {
    type: String
  },
  size: {
    type: Number
  }
});

ProfileFiles.attachSchema(ProfileFiles.schema);

// --------------------------------------------------

ProfileFiles.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
});

ProfileFiles.before.remove(function(userId, doc) {
  try {
    fs.unlink(doc.path);
  } catch (e) {}
});
