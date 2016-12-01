import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Phonenumbers = new Mongo.Collection('phonenumbers');
export default Phonenumbers;

Phonenumbers.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Phonenumbers.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Phonenumbers.schema = new SimpleSchema({
  createdAt: {
    type: Date
  },
  phone: {
    type: String
  },
  sms: {
    type: String
  },
  token: {
    type: String
  }
});

Phonenumbers.attachSchema(Phonenumbers.schema);

// --------------------------------------------------

Phonenumbers.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
});
