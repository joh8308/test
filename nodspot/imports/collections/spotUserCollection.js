import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const SpotUserCollection = new Mongo.Collection("spotUserCollection");
export default SpotUserCollection;
