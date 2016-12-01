SyncedCron.add({
  name: 'Remove Chat Messages',
  schedule: function(parser) {
    // parser is a later.parse object
    // http://bunkat.github.io/later/

    // return parser.text('every 5 seconds');
    // return parser.cron('0/5 * * * * ?', true);
    return parser.recur().every(10).second();
  },
  job: function(intendedAt) {
    // console.log('Cron : Remove Chat Messages');

    let baseTime = new Date((new Date()).getTime() - (27 * 60 * 1000));

    let messageList = Messages.find({
      createdAt: {
        $lte: baseTime
      }
    }).fetch();

    if (messageList) {
      Principals.remove({
        dataType: 'messagesPrincipal',
        dataId: {
          $in: messageList.map(({_id})=>_id)
        }
      });
    }

    let messageImageList = Messages.find({
      messageType: 'image',
      createdAt: {
        $lte: baseTime
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
      createdAt: {
        $lte: baseTime
      }
    });
  }
});