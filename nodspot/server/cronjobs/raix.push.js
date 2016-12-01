SyncedCron.add({
  name: 'Remove RAIX:PUSH Tokens',
  schedule: function(parser) {
    // parser is a later.parse object
    // http://bunkat.github.io/later/

    // return parser.text('every 5 seconds');
    // return parser.cron('0/5 * * * * ?', true);
    return parser.recur().every(6).hour();
  },
  job: function(intendedAt) {
    // console.log('Cron : Remove RAIX:PUSH Tokens');

    Push.appCollection.remove({
      token: {
        $exists: false
      }
    });
  }
});