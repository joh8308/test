import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const ChatFiles = new Mongo.Collection('chatfiles');
export default ChatFiles;

ChatFiles.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

ChatFiles.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

ChatFiles.schema = new SimpleSchema({
  chatId: {
    type: String
  },
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

ChatFiles.attachSchema(ChatFiles.schema);

// --------------------------------------------------

ChatFiles.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
});
