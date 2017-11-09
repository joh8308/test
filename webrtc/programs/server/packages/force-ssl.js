(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var WebApp = Package.webapp.WebApp;
var WebAppInternals = Package.webapp.WebAppInternals;
var main = Package.webapp.main;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

var require = meteorInstall({"node_modules":{"meteor":{"force-ssl":{"force_ssl_both.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/force-ssl/force_ssl_both.js                                                                 //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
Object.assign(Meteor.absoluteUrl.defaultOptions, {                                                      // 1
  secure: true                                                                                          // 1
});                                                                                                     // 1
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"force_ssl_server.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/force-ssl/force_ssl_server.js                                                               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
var isLocalConnection = void 0,                                                                         // 1
    isSslConnection = void 0;                                                                           // 1
module.watch(require("meteor/force-ssl-common"), {                                                      // 1
  isLocalConnection: function (v) {                                                                     // 1
    isLocalConnection = v;                                                                              // 1
  },                                                                                                    // 1
  isSslConnection: function (v) {                                                                       // 1
    isSslConnection = v;                                                                                // 1
  }                                                                                                     // 1
}, 0);                                                                                                  // 1
                                                                                                        //
var url = Npm.require("url");                                                                           // 1
                                                                                                        //
// Unfortunately we can't use a connect middleware here since                                           // 4
// sockjs installs itself prior to all existing listeners                                               // 5
// (meaning prior to any connect middlewares) so we need to take                                        // 6
// an approach similar to overshadowListeners in                                                        // 7
// https://github.com/sockjs/sockjs-node/blob/cf820c55af6a9953e16558555a31decea554f70e/src/utils.coffee
var httpServer = WebApp.httpServer;                                                                     // 10
var oldHttpServerListeners = httpServer.listeners('request').slice(0);                                  // 11
httpServer.removeAllListeners('request');                                                               // 12
httpServer.addListener('request', function (req, res) {                                                 // 13
  // allow connections if they have been handled w/ ssl already                                         // 15
  // (either by us or by a proxy) OR the connection is entirely over                                    // 16
  // localhost (development mode).                                                                      // 17
  //                                                                                                    // 18
  // Note: someone could trick us into serving over non-ssl by setting                                  // 19
  // x-forwarded-for, x-forwarded-proto, forwarded, etc. Not much we can do                             // 20
  // there if we still want to operate behind proxies.                                                  // 21
  if (!isLocalConnection(req) && !isSslConnection(req)) {                                               // 23
    // connection is not cool. send a 302 redirect!                                                     // 24
    var host = url.parse(Meteor.absoluteUrl()).hostname; // strip off the port number. If we went to a URL with a custom
    // port, we don't know what the custom SSL port is anyway.                                          // 29
                                                                                                        //
    host = host.replace(/:\d+$/, '');                                                                   // 30
    res.writeHead(302, {                                                                                // 32
      'Location': 'https://' + host + req.url,                                                          // 33
      'Access-Control-Allow-Origin': '*'                                                                // 34
    });                                                                                                 // 32
    res.end();                                                                                          // 36
    return;                                                                                             // 37
  } // connection is OK. Proceed normally.                                                              // 38
                                                                                                        //
                                                                                                        //
  var args = arguments;                                                                                 // 41
  oldHttpServerListeners.forEach(function (oldListener) {                                               // 42
    oldListener.apply(httpServer, args);                                                                // 43
  });                                                                                                   // 44
}); // NOTE: this doesn't handle websockets!                                                            // 45
//                                                                                                      // 49
// Websockets come in via the 'upgrade' request. We can override this,                                  // 50
// however the problem is we're not sure if the websocket is actually                                   // 51
// encrypted. We don't get x-forwarded-for, x-forwarded-proto, forwarded, etc.                          // 52
// on websockets. It's possible the 'sec-websocket-origin' header does                                  // 53
// what we want, but that's not clear.                                                                  // 54
//                                                                                                      // 55
// For now, this package allows raw unencrypted DDP connections over                                    // 56
// websockets.                                                                                          // 57
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/force-ssl/force_ssl_both.js");
var exports = require("./node_modules/meteor/force-ssl/force_ssl_server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['force-ssl'] = exports;

})();

//# sourceMappingURL=force-ssl.js.map
