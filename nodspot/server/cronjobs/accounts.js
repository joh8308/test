SyncedCron.add({
  name: 'Remove Reserved IDs',
  schedule: function(parser) {
    // parser is a later.parse object
    // http://bunkat.github.io/later/

    // return parser.text('every 5 seconds');
    // return parser.cron('0/5 * * * * ?', true);
    return parser.recur().every(1).minute();
  },
  job: function(intendedAt) {
    // console.log('Cron : Remove Reserved IDs');

    ReservedUserIds.remove({
      createdAt: {
        $lte: new Date((new Date()).getTime() - (27 * 60 * 1000))
      }
    });
  }
});