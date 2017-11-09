(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

var require = meteorInstall({"node_modules":{"meteor":{"force-ssl-common":{"force_ssl_common.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/force-ssl-common/force_ssl_common.js                                                        //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
module.export({                                                                                         // 1
  isLocalConnection: function () {                                                                      // 1
    return isLocalConnection;                                                                           // 1
  },                                                                                                    // 1
  isSslConnection: function () {                                                                        // 1
    return isSslConnection;                                                                             // 1
  }                                                                                                     // 1
});                                                                                                     // 1
var forwarded = void 0;                                                                                 // 1
module.watch(require("forwarded-http"), {                                                               // 1
  "default": function (v) {                                                                             // 1
    forwarded = v;                                                                                      // 1
  }                                                                                                     // 1
}, 0);                                                                                                  // 1
                                                                                                        //
// Determine if the connection is only over localhost. Both we                                          // 3
// received it on localhost, and all proxies involved received on                                       // 4
// localhost (supports "forwarded" and "x-forwarded-for").                                              // 5
var isLocalConnection = function (req) {                                                                // 6
  var localhostRegexp = /^\s*(127\.0\.0\.1|\[?::1\]?)\s*$/;                                             // 7
  var request = Object.create(req);                                                                     // 8
  request.connection = Object.assign({}, req.connection, {                                              // 9
    remoteAddress: req.connection.remoteAddress || req.socket.remoteAddress                             // 12
  });                                                                                                   // 12
  var forwardedParams = forwarded(request);                                                             // 14
  var isLocal = true;                                                                                   // 15
  Object.keys(forwardedParams.for).forEach(function (forKey) {                                          // 16
    if (!localhostRegexp.test(forKey)) {                                                                // 17
      isLocal = false;                                                                                  // 18
    }                                                                                                   // 19
  });                                                                                                   // 20
  return isLocal;                                                                                       // 21
}; // Determine if the connection was over SSL at any point. Either we                                  // 22
// received it as SSL, or a proxy did and translated it for us.                                         // 25
                                                                                                        //
                                                                                                        //
var isSslConnection = function (req) {                                                                  // 26
  var forwardedParams = forwarded(req);                                                                 // 27
  return req.connection.pair || forwardedParams.proto && forwardedParams.proto.indexOf('https') !== -1;
};                                                                                                      // 30
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"node_modules":{"forwarded-http":{"package.json":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// ../../.1.0.14.jma8ox++os+web.browser+web.cordova/npm/node_modules/forwarded-http/package.json        //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
exports.name = "forwarded-http";
exports.version = "0.3.0";
exports.main = "lib/index.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// node_modules/meteor/force-ssl-common/node_modules/forwarded-http/lib/index.js                        //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
'use strict'

var debug = require('debug')('forwarded-http')
var filter = require('ip-filter')
var http = require('http')
var IP = require('ip')
var rfc7239 = require('./rfc7239')
var schemas = require('./schemas')
var util = require('util')
var ipRegExp = require('ip-port-regex')

module.exports = function (req, options) {
  var opts = util._extend({
    filter: '*',
    allowPrivate: true
  }, options)

  if (!req || !(req instanceof http.IncomingMessage)) {
    throw new TypeError('a request of type: "http.IncomingMessage" is required')
  }

  // start with default values
  var forwarded = {
    ips: [req.connection.remoteAddress],
    port: req.connection.remotePort,
    ports: [req.connection.remotePort],
    proto: req.connection.encrypted ? 'https' : 'http',
    host: req.headers && req.headers.host ? req.headers.host : undefined
  }

  // construct "for" object
  forwarded.for = {}

  // set default value
  forwarded.for[req.connection.remoteAddress] = req.connection.remotePort

  // exit early
  if (Object.keys(req.headers).length === 0) {
    return forwarded
  }

  // loop through schemas
  schemas.forEach(function (schema) {
    // detect host
    if (schema.host && req.headers[schema.host]) {
      debug('found %s header', schema.host)

      forwarded.host = req.headers[schema.host]
    }

    // detect protocol
    if (schema.proto) {
      var proto = false

      if (typeof schema.proto === 'function') {
        proto = schema.proto(req)
      } else {
        if (req.headers[schema.proto]) {
          debug('found %s header', schema.proto)

          proto = req.headers[schema.proto]
        }
      }

      // overwrite
      if (proto) {
        forwarded.proto = proto
      }
    }

    // detect ports
    if (schema.port && req.headers[schema.port]) {
      debug('found %s header', schema.port)

      var port = req.headers[schema.port]

      // attach to global list
      forwarded.ports.push(port)

      // TODO: how to determine priority / final value?
      forwarded.port = port
    }

    // detect IPs
    if (schema.ip && req.headers[schema.ip]) {
      debug('found %s header', schema.ip)

      var ips = req.headers[schema.ip].split(/ *, */)

      // attach to global list
      Array.prototype.push.apply(forwarded.ips, ips)

      // construct "for"
      ips.forEach(function (ip) {
        forwarded.for[ip] = forwarded.port
      })
    }
  })

  // append missing ips to forward.for
  var diff = forwarded.ips.filter(function (ip) {
    return forwarded.for[ip] !== undefined
  })

  diff.forEach(function (ip) {
    forwarded.for[ip] = forwarded.port
  })

  // process RFC7239 and use to overwrite
  if (req.headers.forwarded) {
    var rfc = rfc7239(req.headers.forwarded)
    if (rfc.for) {
      rfc.for.forEach(function (node) {
        var parts = ipRegExp.parts(node)

        // console.log(node, parts)

        var ip = parts.ip === null ? node : parts.ip
        var port = parts.port === null ? forwarded.port : parts.port

        forwarded.ips.push(ip)
        forwarded.ports.push(port)
        forwarded.for[ip] = port
      })
    }

    if (rfc.proto) {
      forwarded.proto = rfc.proto
    }

    if (rfc.host) {
      forwarded.host = rfc.host
    }

    if (rfc.by) {
      forwarded.by = rfc.by
    }
  }

  // clear out duplicate port entries
  var uniqueFilter = function (value, index, self) {
    return self.indexOf(value) === index
  }

  forwarded.ips = forwarded.ips.filter(uniqueFilter)
  forwarded.ports = forwarded.ports.filter(uniqueFilter)

  forwarded.ips = forwarded.ips.filter(function (ip) {
    // use IP filters
    var filtered = null

    try {
      filtered = filter(ip, opts.filter)
    } catch (e) {
      debug('[%s] %s', ip, e.message)
    }

    // remove private ips
    return (filtered !== null && (opts.allowPrivate === true ? true : IP.isPublic(ip)))
  })

  Object.keys(forwarded.for).forEach(function (ip) {
    // use IP filters
    var filtered = filter(ip, opts.filter, true)

    // remove private ips
    if (filtered === null || (opts.allowPrivate === true ? false : IP.isPrivate(ip))) {
      delete forwarded.for[ip]
    }
  })

  return forwarded
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
var exports = require("./node_modules/meteor/force-ssl-common/force_ssl_common.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['force-ssl-common'] = exports;

})();

//# sourceMappingURL=force-ssl-common.js.map
