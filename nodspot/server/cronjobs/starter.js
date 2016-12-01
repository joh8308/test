// ####################################################################################################
// packages : percolate:synced-cron
// ####################################################################################################

SyncedCron.config({
  log: false,
  collectionName: 'syncedCronCollection',
  collectionTTL: 172800
});

SyncedCron.start();

// Meteor.startup(function () {
//   // code to run on server at startup
//   SyncedCron.start();
//
//   // Stop jobs after 15 seconds
//   Meteor.setTimeout(function() { SyncedCron.stop(); }, 15 * 1000);
// });
