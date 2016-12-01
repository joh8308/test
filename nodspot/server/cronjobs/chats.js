SyncedCron.add({
  name: 'Remove Chat Rooms',
  schedule: function(parser) {
    // parser is a later.parse object
    // http://bunkat.github.io/later/

    // return parser.text('every 5 seconds');
    // return parser.cron('0/5 * * * * ?', true);
    // return parser.recur().every(1).minute();
    return parser.recur().every(10).second();
  },
  job: function(intendedAt) {
    // console.log('Cron : Remove Chat Rooms');

    let baseTime = (new Date()).getTime();
    let chatList = Chats.find().fetch();

    if (chatList) {
      chatList = _.filter(chatList, function(chat) {
        let expireTime = (new Date(chat.updatedAt)).getTime() + (chat.timeLimit * 1000);

        return (expireTime <= baseTime);
      });

      if (chatList) {
        let chatIdList = chatList.map(({_id})=>_id);

        Chats.remove({
          _id: {
            $in: chatIdList
          }
        });

        let messageList = Messages.find({
          chatId: {
            $in: chatIdList
          }
        }).fetch();

        if (messageList) {
          Principals.remove({
            dataType: 'messagesPrincipal',
            dataId: {
              $in: messageList.map(({_id})=>_id)
            }
          });

          let messageImageList = Messages.find({
            messageType: 'image',
            chatId: {
              $in: chatIdList
            }
          }).fetch();

          if (messageImageList) {
            _.each(messageImageList, function(message) {
              var chatFiles = ChatFiles.find({_id:{$in:[message.file.origin, message.file.thumb]}});
              _.each(chatFiles, function(chatFile) {
                try {
                  fs.unlink(chatFile.path);
                } catch(e) {}
              });
              ChatFiles.remove({_id:{$in:[message.file.origin, message.file.thumb]}});
            });
          }

          Messages.remove({
            chatId: {
              $in: chatIdList
            }
          });
        }
      }
    }
  }
});