import { composeWithTracker } from 'react-komposer';
import { CreateChatroom } from '../routes/Createchatroom';
import { Meteor } from 'meteor/meteor';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('searchUsers', 'joh8308');

  if(subscription.ready()){
    const member = Meteor.users.find().fetch();
    console.log('container : ' + member);

    onData(null, {member});
  }
};

console.log('25');


// const CreateChatroomConatainer = composeWithTracker( composer )( CreateChatroom );
export default composeWithTracker( composer )( CreateChatroom );
