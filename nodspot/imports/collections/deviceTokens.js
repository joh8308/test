import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const DeviceTokens = new Mongo.Collection("devicetokens");
export default DeviceTokens;

DeviceTokens.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

DeviceTokens.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

DeviceTokens.schema = new SimpleSchema({
  userId: {
    type: String
  },
  serviceName: {
    type: String
  },
  serviceProvider: {
    type: String
  },
  deviceToken: {
    type: String
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

DeviceTokens.attachSchema(DeviceTokens.schema);
