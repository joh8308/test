(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var WebApp = Package.webapp.WebApp;
var WebAppInternals = Package.webapp.WebAppInternals;
var main = Package.webapp.main;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

var require = meteorInstall({"node_modules":{"meteor":{"mizzao:timesync":{"timesync-server.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/mizzao_timesync/timesync-server.js                                                           //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
// Use rawConnectHandlers so we get a response as quickly as possible                                    // 1
// https://github.com/meteor/meteor/blob/devel/packages/webapp/webapp_server.js                          // 2
WebApp.rawConnectHandlers.use("/_timesync", function (req, res, next) {                                  // 4
  // Never ever cache this, otherwise weird times are shown on reload                                    // 6
  // http://stackoverflow.com/q/18811286/586086                                                          // 7
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");                                 // 8
  res.setHeader("Pragma", "no-cache");                                                                   // 9
  res.setHeader("Expires", 0); // Avoid MIME type warnings in browsers                                   // 10
                                                                                                         //
  res.setHeader("Content-Type", "text/plain"); // Cordova lives in a local webserver, so it does CORS    // 13
  // we need to bless it's requests in order for it to accept our results                                // 16
  // Match http://localhost:<port> for Cordova clients in Meteor 1.3                                     // 17
  // and http://meteor.local for earlier versions                                                        // 18
                                                                                                         //
  var origin = req.headers.origin;                                                                       // 19
                                                                                                         //
  if (origin && (origin === 'http://meteor.local' || /^http:\/\/localhost:1[23]\d\d\d$/.test(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);                                                // 23
  }                                                                                                      // 24
                                                                                                         //
  res.end(Date.now().toString());                                                                        // 26
});                                                                                                      // 27
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/mizzao:timesync/timesync-server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mizzao:timesync'] = {};

})();

//# sourceMappingURL=mizzao_timesync.js.map
