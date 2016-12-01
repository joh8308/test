pushSender = (userLang, pushParam) => {
  // let pushParam = {
  //   type: 'service',
  //   command: 'new.friend',
  //   sender: currentUserId,
  //   receivers: friendId,
  //   chatId: '',
  //   messageId: '',
  //   friendMessage: ''
  // };

  const getMessageCount = (userId) => {
    var chatList = Chats.find({
      'enteredMembers': userId,
      'leavedMembers': {$ne: userId}
    });

    var messageCount = Messages.find({
      chatId: {$in: _.pluck(chatList.fetch(), '_id')},
      unreaders: userId,
    }).count();

    return messageCount;
  };

  let senderName = '';

  if (pushParam.sender === '[SYSTEM]') {
    senderName = '';
  } else {
    let sender = Meteor.users.findOne({
      _id: pushParam.sender
    });

    senderName = sender.name.last + '' + sender.name.first;
  }

  let pushTitle = '';
  let pushMessage = '';

  if (pushParam.type === 'system') {
    switch(pushParam.command) {
      case 'other.login':
        pushTitle = TAPi18n.__('service.push.account.other_login.title', {}, userLang);
        pushMessage = TAPi18n.__('service.push.account.other_login.message', {sender:senderName}, userLang);
        break;

      default:
        if (pushParam.title) {
          pushTitle = pushParam.title;
        } else {
          pushTitle = TAPi18n.__('service.push.system.title', {}, userLang);
        }

        if (pushParam.message) {
          pushMessage = pushParam.message;
        } else {
          pushMessage = TAPi18n.__('service.push.system.message', {}, userLang);
        }
    }
  } else {
    switch(pushParam.command) {
      case 'friend.requested':
        pushTitle = TAPi18n.__('service.push.relationship.requested.title', {title:pushParam.friendMessage}, userLang);
        pushMessage = TAPi18n.__('service.push.relationship.requested.message', {sender:senderName}, userLang);
        break;

      case 'friend.accepted':
        pushTitle = TAPi18n.__('service.push.relationship.accepted.title', {}, userLang);
        pushMessage = TAPi18n.__('service.push.relationship.accepted.message', {sender:senderName}, userLang);
        break;

      case 'chat.invited':
        pushTitle = TAPi18n.__('service.push.chat.invited.title', {}, userLang);
        pushMessage = TAPi18n.__('service.push.chat.invited.message', {sender:senderName}, userLang);
        break;

      case 'message.received':
        pushTitle = TAPi18n.__('service.push.message.received.title', {}, userLang);
        pushMessage = TAPi18n.__('service.push.message.received.message', {sender:senderName}, userLang);
        break;

      case 'capture.tried':
        pushTitle = TAPi18n.__('service.push.message.capture.title', {}, userLang);
        pushMessage = TAPi18n.__('service.push.message.capture.message', {sender:senderName}, userLang);
        break;

      case 'other.login':
        pushTitle = TAPi18n.__('service.push.account.other_login.title', {}, userLang);
        pushMessage = TAPi18n.__('service.push.account.other_login.message', {sender:senderName}, userLang);
        break;

      default:
        pushTitle = TAPi18n.__('service.push.default.title', {}, userLang);
    }
  }

  //  badge :               -- apple (badge)                : google (msgcnt)
  //  category :            -- apple (category)
  //  contentAvailable : 1  -- apple (content-available)
  //  from :                -- apple (payload.messageFrom)  : google (collapseKey)
  //  image                 --                              : google
  //  notId                 --                              : google
  //  payload :             -- apple (payload)              : google (ejson)
  //  picture               --                              : google (picture)
  //  priority : 1          -- apple
  //  sound :               -- apple                        : google (soundname)
  //  style                 --                              : google (style)
  //  summaryText           --                              : google (summaryText)
  //  text :                -- apple (alert)                : google (message)
  //  title                 --                              : google (title)

  if (pushParam.type === 'system') {
    try {
      Push.send({
        contentAvailable : 1,

        from: 'SPOT27',
        priority: 1,

        title: pushTitle,
        text: pushMessage,

        payload: {
          deviceId: pushParam.deviceId,
          senderId: pushParam.sender,
          receiverId: '',
          createdAt: moment().format(),

          pushType: pushParam.type,
          pushCommand: pushParam.command,
          title: pushTitle,
          content: pushMessage
        },

        query: {
          userId: {$in : pushParam.receivers}
        }
      });
    } catch (e) {
      console.log('PUSH Exception : ' + e.message);
    }
  } else {
    let sender = Meteor.users.findOne({_id: pushParam.sender});
    if (sender) {
      _.each(pushParam.receivers, function(receiverId) {
        let user = Meteor.users.findOne({_id: receiverId});

        if (user) {
          let allowedPush = false;

          // let date = new Date();
          // let dayOfWeek = date.getDay();
          // let timeHM = date.format("hh:mm");

          if (user.push.base.use == true) {
            switch(pushParam.command) {
              case 'friend.requested':
              case 'friend.accepted':
                if (user.push.friendRequested.use == true) {
                  allowedPush = true;
                }
                break;

              case 'chat.invited':
                if (user.push.chatInvited.use == true) {
                  allowedPush = true;
                }
                break;

              case 'message.received':
                if (user.push.messageReceived.use == true) {
                  allowedPush = true;
                }
                break;

              case 'capture.tried':
                allowedPush = true;
                break;

              case 'other.login':
                allowedPush = true;
                break;

              default:
                allowedPush = true;
            }
          }

          if (allowedPush == true) {
            try {
              Push.send({
                badge: getMessageCount(receiverId),
                contentAvailable : 0,

                from: 'SPOT27',
                priority: 1,
                sound: 'default',

                title: pushTitle,
                text: pushMessage,

                payload: {
                  deviceId: pushParam.deviceId,
                  senderId: pushParam.sender,
                  receiverId: receiverId,
                  createdAt: moment().format(),

                  senderName: {
                    first: sender.name.first,
                    middle: sender.name.middle,
                    last: sender.name.last
                  },

                  senderPhoto: {
                    origin: sender.photo.origin,
                    thumb: sender.photo.thumb
                  },

                  pushType: pushParam.type,
                  pushCommand: pushParam.command,
                  chatId: pushParam.chatId,
                  messageId: pushParam.messageId,
                  title: pushTitle,
                  content: pushMessage
                },

                query: {
                  userId: receiverId
                }
              });
            } catch (e) {
              console.log('PUSH Exception : ' + e.message);
            }
          }
        }
      });
    }
  }
};