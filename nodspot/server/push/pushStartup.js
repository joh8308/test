var fs = require('fs');

Meteor.startup(function () {
  Push.debug = true;

  Push.Configure({
    apn: {
      passphrase: Meteor.settings.private.push.apple.passphrase,
      certData: fs.readFileSync(Meteor.settings.private.push.apple.crtPath),
      keyData: fs.readFileSync(Meteor.settings.private.push.apple.keyPath),

      // Production is optional, defaults to development
      production: Meteor.settings.private.push.apple.productionMode,
      gateway: Meteor.settings.private.push.apple.gatewayHost,
    },
    gcm: {
      apiKey: Meteor.settings.private.push.google.api
    },
    keepNotifications: Meteor.settings.private.push.keepNotifications,
    sendBatchSize: 100,
    sendInterval: 1000
  });
});
