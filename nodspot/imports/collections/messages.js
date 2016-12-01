import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import Chats from './chats';
import ChatFiles from './chatfiles';

const Messages = new Mongo.Collection("messages");
export default Messages;

Messages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Messages.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Messages.fileSchema = new SimpleSchema({
  kind: {
    type: String
  },
  name: {
    type: String
  },
  origin: {
    type: String
  },
  size: {
    type: Number
  },
  thumb: {
    type: String
  }
});

Messages.schema = new SimpleSchema({
  chatId: {
    type: String
  },
  creator: {
    type: String
  },
  encrypted: {
    type: Boolean
  },
  file: {
    type: Messages.fileSchema,
    optional: true
  },
  messageType: {
    type: String
  },
  status: {
    type: String
  },
  text: {
    type: String,
    optional: true
  },
  unreaders: {
    type: [String]
  }
});

Messages.attachSchema(Messages.schema);

// --------------------------------------------------

if (Meteor.isServer) {
  var fs = require('fs');

  Messages.before.insert(function(userId, doc) {
    doc.createdAt = new Date();

    Chats.update({
      _id: doc.chatId
    }, {
      $set: {
        isUsing: true,
        updatedAt: (new Date())
      }
    })
  });

  Messages.before.remove(function(userId, doc) {
    Principals.remove({dataType:'messagesPrincipal', dataId: doc._id});

    if (doc.messageType === 'image') {
      var chatFiles = ChatFiles.find({_id:{$in:[doc.file.origin, doc.file.thumb]}});
      _.each(chatFiles, function(chatFile) {
        try {
          fs.unlink(chatFile.path);
        } catch(e) {}
      });
      ChatFiles.remove({_id:{$in:[doc.file.origin, doc.file.thumb]}});
    }
  });
}

// --------------------------------------------------

if (Meteor.isClient) {
  // define fields to be encrypted
  var fields = ['text'];

  // init encryption on collection Messages
  const MessagesEncryption = new CollectionEncryption(Messages, fields, {
    onFinishedDocEncryption: function(doc) {
      var chat = Chats.findOne({
        _id: doc.chatId
      });

      _.each(chat.members, function(member) {
        if (member.userId !== Meteor.userId()) {
          Meteor.subscribe('principals', member.userId, function() {
            MessagesEncryption.shareDocWithUser(doc._id, member.userId);
          });
        }
      });
    }
  });
}

// --------------------------------------------------
