(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var DDPCommon = Package['ddp-common'].DDPCommon;
var ECMAScript = Package.ecmascript.ECMAScript;
var check = Package.check.check;
var Match = Package.check.Match;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

/* Package-scope variables */
var EV, self, Streamer;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:streamer":{"lib":{"ev.js":function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_streamer/lib/ev.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
/* globals EV:true */ /* exported EV */EV = function () {                                                            // 1
	function EV() {                                                                                                     // 5
		(0, _classCallCheck3.default)(this, EV);                                                                           // 5
		this.handlers = {};                                                                                                // 6
	}                                                                                                                   // 7
                                                                                                                     //
	EV.prototype.emit = function () {                                                                                   // 4
		function emit(event) {                                                                                             // 4
			var _this = this;                                                                                                 // 9
                                                                                                                     //
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {         // 9
				args[_key - 1] = arguments[_key];                                                                                // 9
			}                                                                                                                 // 9
                                                                                                                     //
			if (this.handlers[event]) {                                                                                       // 10
				this.handlers[event].forEach(function (handler) {                                                                // 11
					return handler.apply(_this, args);                                                                              // 11
				});                                                                                                              // 11
			}                                                                                                                 // 12
		}                                                                                                                  // 13
                                                                                                                     //
		return emit;                                                                                                       // 4
	}();                                                                                                                // 4
                                                                                                                     //
	EV.prototype.emitWithScope = function () {                                                                          // 4
		function emitWithScope(event, scope) {                                                                             // 4
			for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {  // 15
				args[_key2 - 2] = arguments[_key2];                                                                              // 15
			}                                                                                                                 // 15
                                                                                                                     //
			if (this.handlers[event]) {                                                                                       // 16
				this.handlers[event].forEach(function (handler) {                                                                // 17
					return handler.apply(scope, args);                                                                              // 17
				});                                                                                                              // 17
			}                                                                                                                 // 18
		}                                                                                                                  // 19
                                                                                                                     //
		return emitWithScope;                                                                                              // 4
	}();                                                                                                                // 4
                                                                                                                     //
	EV.prototype.on = function () {                                                                                     // 4
		function on(event, callback) {                                                                                     // 4
			if (!this.handlers[event]) {                                                                                      // 22
				this.handlers[event] = [];                                                                                       // 23
			}                                                                                                                 // 24
                                                                                                                     //
			this.handlers[event].push(callback);                                                                              // 25
		}                                                                                                                  // 26
                                                                                                                     //
		return on;                                                                                                         // 4
	}();                                                                                                                // 4
                                                                                                                     //
	EV.prototype.once = function () {                                                                                   // 4
		function once(event, callback) {                                                                                   // 4
			self = this;                                                                                                      // 29
			self.on(event, function () {                                                                                      // 30
				function onetimeCallback() {                                                                                     // 30
					callback.apply(this, arguments);                                                                                // 31
					self.removeListener(event, onetimeCallback);                                                                    // 32
				}                                                                                                                // 33
                                                                                                                     //
				return onetimeCallback;                                                                                          // 30
			}());                                                                                                             // 30
		}                                                                                                                  // 34
                                                                                                                     //
		return once;                                                                                                       // 4
	}();                                                                                                                // 4
                                                                                                                     //
	EV.prototype.removeListener = function () {                                                                         // 4
		function removeListener(event, callback) {                                                                         // 4
			if (this.handlers[event]) {                                                                                       // 37
				var index = this.handlers[event].indexOf(callback);                                                              // 38
                                                                                                                     //
				if (index > -1) {                                                                                                // 39
					this.handlers[event].splice(index, 1);                                                                          // 40
				}                                                                                                                // 41
			}                                                                                                                 // 42
		}                                                                                                                  // 43
                                                                                                                     //
		return removeListener;                                                                                             // 4
	}();                                                                                                                // 4
                                                                                                                     //
	EV.prototype.removeAllListeners = function () {                                                                     // 4
		function removeAllListeners(event) {                                                                               // 4
			this.handlers[event] = undefined;                                                                                 // 46
		}                                                                                                                  // 47
                                                                                                                     //
		return removeAllListeners;                                                                                         // 4
	}();                                                                                                                // 4
                                                                                                                     //
	return EV;                                                                                                          // 4
}();                                                                                                                 // 4
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"server.js":function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_streamer/server/server.js                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");                                        //
                                                                                                                     //
var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);                                               //
                                                                                                                     //
var _createClass2 = require("babel-runtime/helpers/createClass");                                                    //
                                                                                                                     //
var _createClass3 = _interopRequireDefault(_createClass2);                                                           //
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
/* globals EV */ /* eslint new-cap: false */var StreamerCentral = function (_EV) {                                   // 1
	(0, _inherits3.default)(StreamerCentral, _EV);                                                                      //
                                                                                                                     //
	function StreamerCentral() {                                                                                        // 5
		(0, _classCallCheck3.default)(this, StreamerCentral);                                                              // 5
                                                                                                                     //
		var _this = (0, _possibleConstructorReturn3.default)(this, _EV.call(this));                                        // 5
                                                                                                                     //
		_this.instances = {};                                                                                              // 8
		return _this;                                                                                                      // 5
	}                                                                                                                   // 9
                                                                                                                     //
	return StreamerCentral;                                                                                             //
}(EV);                                                                                                               //
                                                                                                                     //
Meteor.StreamerCentral = new StreamerCentral();                                                                      // 12
                                                                                                                     //
Meteor.Streamer = function (_EV2) {                                                                                  // 15
	(0, _inherits3.default)(Streamer, _EV2);                                                                            // 15
                                                                                                                     //
	function Streamer(name) {                                                                                           // 16
		var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},                                 // 16
		    _ref$retransmit = _ref.retransmit,                                                                             // 16
		    retransmit = _ref$retransmit === undefined ? true : _ref$retransmit,                                           // 16
		    _ref$retransmitToSelf = _ref.retransmitToSelf,                                                                 // 16
		    retransmitToSelf = _ref$retransmitToSelf === undefined ? false : _ref$retransmitToSelf;                        // 16
                                                                                                                     //
		(0, _classCallCheck3.default)(this, Streamer);                                                                     // 16
                                                                                                                     //
		if (Meteor.StreamerCentral.instances[name]) {                                                                      // 17
			var _ret;                                                                                                         // 17
                                                                                                                     //
			console.warn('Streamer instance already exists:', name);                                                          // 18
			return _ret = Meteor.StreamerCentral.instances[name], (0, _possibleConstructorReturn3.default)(_this2, _ret);     // 19
		}                                                                                                                  // 20
                                                                                                                     //
		var _this2 = (0, _possibleConstructorReturn3.default)(this, _EV2.call(this));                                      // 16
                                                                                                                     //
		Meteor.StreamerCentral.instances[name] = _this2;                                                                   // 24
		_this2.name = name;                                                                                                // 26
		_this2.retransmit = retransmit;                                                                                    // 27
		_this2.retransmitToSelf = retransmitToSelf;                                                                        // 28
		_this2.subscriptions = [];                                                                                         // 30
		_this2.subscriptionsByEventName = {};                                                                              // 31
		_this2.transformers = {};                                                                                          // 32
                                                                                                                     //
		_this2.iniPublication();                                                                                           // 34
                                                                                                                     //
		_this2.initMethod();                                                                                               // 35
                                                                                                                     //
		_this2._allowRead = {};                                                                                            // 37
		_this2._allowEmit = {};                                                                                            // 38
		_this2._allowWrite = {};                                                                                           // 39
                                                                                                                     //
		_this2.allowRead('none');                                                                                          // 41
                                                                                                                     //
		_this2.allowEmit('all');                                                                                           // 42
                                                                                                                     //
		_this2.allowWrite('none');                                                                                         // 43
                                                                                                                     //
		return _this2;                                                                                                     // 16
	}                                                                                                                   // 44
                                                                                                                     //
	Streamer.prototype.allowRead = function () {                                                                        // 15
		function allowRead(eventName, fn) {                                                                                // 15
			if (fn === undefined) {                                                                                           // 78
				fn = eventName;                                                                                                  // 79
				eventName = '__all__';                                                                                           // 80
			}                                                                                                                 // 81
                                                                                                                     //
			if (typeof fn === 'function') {                                                                                   // 83
				return this._allowRead[eventName] = fn;                                                                          // 84
			}                                                                                                                 // 85
                                                                                                                     //
			if (typeof fn === 'string' && ['all', 'none', 'logged'].indexOf(fn) === -1) {                                     // 87
				console.error("allowRead shortcut '" + fn + "' is invalid");                                                     // 88
			}                                                                                                                 // 89
                                                                                                                     //
			if (fn === 'all' || fn === true) {                                                                                // 91
				return this._allowRead[eventName] = function () {                                                                // 92
					return true;                                                                                                    // 93
				};                                                                                                               // 94
			}                                                                                                                 // 95
                                                                                                                     //
			if (fn === 'none' || fn === false) {                                                                              // 97
				return this._allowRead[eventName] = function () {                                                                // 98
					return false;                                                                                                   // 99
				};                                                                                                               // 100
			}                                                                                                                 // 101
                                                                                                                     //
			if (fn === 'logged') {                                                                                            // 103
				return this._allowRead[eventName] = function () {                                                                // 104
					return Boolean(this.userId);                                                                                    // 105
				};                                                                                                               // 106
			}                                                                                                                 // 107
		}                                                                                                                  // 108
                                                                                                                     //
		return allowRead;                                                                                                  // 15
	}();                                                                                                                // 15
                                                                                                                     //
	Streamer.prototype.allowEmit = function () {                                                                        // 15
		function allowEmit(eventName, fn) {                                                                                // 15
			if (fn === undefined) {                                                                                           // 111
				fn = eventName;                                                                                                  // 112
				eventName = '__all__';                                                                                           // 113
			}                                                                                                                 // 114
                                                                                                                     //
			if (typeof fn === 'function') {                                                                                   // 116
				return this._allowEmit[eventName] = fn;                                                                          // 117
			}                                                                                                                 // 118
                                                                                                                     //
			if (typeof fn === 'string' && ['all', 'none', 'logged'].indexOf(fn) === -1) {                                     // 120
				console.error("allowRead shortcut '" + fn + "' is invalid");                                                     // 121
			}                                                                                                                 // 122
                                                                                                                     //
			if (fn === 'all' || fn === true) {                                                                                // 124
				return this._allowEmit[eventName] = function () {                                                                // 125
					return true;                                                                                                    // 126
				};                                                                                                               // 127
			}                                                                                                                 // 128
                                                                                                                     //
			if (fn === 'none' || fn === false) {                                                                              // 130
				return this._allowEmit[eventName] = function () {                                                                // 131
					return false;                                                                                                   // 132
				};                                                                                                               // 133
			}                                                                                                                 // 134
                                                                                                                     //
			if (fn === 'logged') {                                                                                            // 136
				return this._allowEmit[eventName] = function () {                                                                // 137
					return Boolean(this.userId);                                                                                    // 138
				};                                                                                                               // 139
			}                                                                                                                 // 140
		}                                                                                                                  // 141
                                                                                                                     //
		return allowEmit;                                                                                                  // 15
	}();                                                                                                                // 15
                                                                                                                     //
	Streamer.prototype.allowWrite = function () {                                                                       // 15
		function allowWrite(eventName, fn) {                                                                               // 15
			if (fn === undefined) {                                                                                           // 144
				fn = eventName;                                                                                                  // 145
				eventName = '__all__';                                                                                           // 146
			}                                                                                                                 // 147
                                                                                                                     //
			if (typeof fn === 'function') {                                                                                   // 149
				return this._allowWrite[eventName] = fn;                                                                         // 150
			}                                                                                                                 // 151
                                                                                                                     //
			if (typeof fn === 'string' && ['all', 'none', 'logged'].indexOf(fn) === -1) {                                     // 153
				console.error("allowWrite shortcut '" + fn + "' is invalid");                                                    // 154
			}                                                                                                                 // 155
                                                                                                                     //
			if (fn === 'all' || fn === true) {                                                                                // 157
				return this._allowWrite[eventName] = function () {                                                               // 158
					return true;                                                                                                    // 159
				};                                                                                                               // 160
			}                                                                                                                 // 161
                                                                                                                     //
			if (fn === 'none' || fn === false) {                                                                              // 163
				return this._allowWrite[eventName] = function () {                                                               // 164
					return false;                                                                                                   // 165
				};                                                                                                               // 166
			}                                                                                                                 // 167
                                                                                                                     //
			if (fn === 'logged') {                                                                                            // 169
				return this._allowWrite[eventName] = function () {                                                               // 170
					return Boolean(this.userId);                                                                                    // 171
				};                                                                                                               // 172
			}                                                                                                                 // 173
		}                                                                                                                  // 174
                                                                                                                     //
		return allowWrite;                                                                                                 // 15
	}();                                                                                                                // 15
                                                                                                                     //
	Streamer.prototype.isReadAllowed = function () {                                                                    // 15
		function isReadAllowed(scope, eventName) {                                                                         // 15
			if (this._allowRead[eventName]) {                                                                                 // 177
				return this._allowRead[eventName].call(scope, eventName);                                                        // 178
			}                                                                                                                 // 179
                                                                                                                     //
			return this._allowRead['__all__'].call(scope, eventName);                                                         // 181
		}                                                                                                                  // 182
                                                                                                                     //
		return isReadAllowed;                                                                                              // 15
	}();                                                                                                                // 15
                                                                                                                     //
	Streamer.prototype.isEmitAllowed = function () {                                                                    // 15
		function isEmitAllowed(scope, eventName) {                                                                         // 15
			var _allowEmit$__all__;                                                                                           // 184
                                                                                                                     //
			for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {         // 184
				args[_key - 2] = arguments[_key];                                                                                // 184
			}                                                                                                                 // 184
                                                                                                                     //
			if (this._allowEmit[eventName]) {                                                                                 // 185
				var _allowEmit$eventName;                                                                                        // 185
                                                                                                                     //
				return (_allowEmit$eventName = this._allowEmit[eventName]).call.apply(_allowEmit$eventName, [scope, eventName].concat(args));
			}                                                                                                                 // 187
                                                                                                                     //
			return (_allowEmit$__all__ = this._allowEmit['__all__']).call.apply(_allowEmit$__all__, [scope, eventName].concat(args));
		}                                                                                                                  // 190
                                                                                                                     //
		return isEmitAllowed;                                                                                              // 15
	}();                                                                                                                // 15
                                                                                                                     //
	Streamer.prototype.isWriteAllowed = function () {                                                                   // 15
		function isWriteAllowed(scope, eventName, args) {                                                                  // 15
			var _allowWrite$__all__;                                                                                          // 192
                                                                                                                     //
			if (this._allowWrite[eventName]) {                                                                                // 193
				var _allowWrite$eventName;                                                                                       // 193
                                                                                                                     //
				return (_allowWrite$eventName = this._allowWrite[eventName]).call.apply(_allowWrite$eventName, [scope, eventName].concat((0, _toConsumableArray3.default)(args)));
			}                                                                                                                 // 195
                                                                                                                     //
			return (_allowWrite$__all__ = this._allowWrite['__all__']).call.apply(_allowWrite$__all__, [scope, eventName].concat((0, _toConsumableArray3.default)(args)));
		}                                                                                                                  // 198
                                                                                                                     //
		return isWriteAllowed;                                                                                             // 15
	}();                                                                                                                // 15
                                                                                                                     //
	Streamer.prototype.addSubscription = function () {                                                                  // 15
		function addSubscription(subscription, eventName) {                                                                // 15
			this.subscriptions.push(subscription);                                                                            // 201
                                                                                                                     //
			if (!this.subscriptionsByEventName[eventName]) {                                                                  // 203
				this.subscriptionsByEventName[eventName] = [];                                                                   // 204
			}                                                                                                                 // 205
                                                                                                                     //
			this.subscriptionsByEventName[eventName].push(subscription);                                                      // 207
		}                                                                                                                  // 208
                                                                                                                     //
		return addSubscription;                                                                                            // 15
	}();                                                                                                                // 15
                                                                                                                     //
	Streamer.prototype.removeSubscription = function () {                                                               // 15
		function removeSubscription(subscription, eventName) {                                                             // 15
			var index = this.subscriptions.indexOf(subscription);                                                             // 211
                                                                                                                     //
			if (index > -1) {                                                                                                 // 212
				this.subscriptions.splice(index, 1);                                                                             // 213
			}                                                                                                                 // 214
                                                                                                                     //
			if (this.subscriptionsByEventName[eventName]) {                                                                   // 216
				var _index = this.subscriptionsByEventName[eventName].indexOf(subscription);                                     // 217
                                                                                                                     //
				if (_index > -1) {                                                                                               // 218
					this.subscriptionsByEventName[eventName].splice(_index, 1);                                                     // 219
				}                                                                                                                // 220
			}                                                                                                                 // 221
		}                                                                                                                  // 222
                                                                                                                     //
		return removeSubscription;                                                                                         // 15
	}();                                                                                                                // 15
                                                                                                                     //
	Streamer.prototype.transform = function () {                                                                        // 15
		function transform(eventName, fn) {                                                                                // 15
			if (typeof eventName === 'function') {                                                                            // 225
				fn = eventName;                                                                                                  // 226
				eventName = '__all__';                                                                                           // 227
			}                                                                                                                 // 228
                                                                                                                     //
			if (!this.transformers[eventName]) {                                                                              // 230
				this.transformers[eventName] = [];                                                                               // 231
			}                                                                                                                 // 232
                                                                                                                     //
			this.transformers[eventName].push(fn);                                                                            // 234
		}                                                                                                                  // 235
                                                                                                                     //
		return transform;                                                                                                  // 15
	}();                                                                                                                // 15
                                                                                                                     //
	Streamer.prototype.applyTransformers = function () {                                                                // 15
		function applyTransformers(methodScope, eventName, args) {                                                         // 15
			if (this.transformers['__all__']) {                                                                               // 238
				this.transformers['__all__'].forEach(function (transform) {                                                      // 239
					args = transform.call(methodScope, eventName, args);                                                            // 240
					methodScope.tranformed = true;                                                                                  // 241
                                                                                                                     //
					if (!Array.isArray(args)) {                                                                                     // 242
						args = [args];                                                                                                 // 243
					}                                                                                                               // 244
				});                                                                                                              // 245
			}                                                                                                                 // 246
                                                                                                                     //
			if (this.transformers[eventName]) {                                                                               // 248
				this.transformers[eventName].forEach(function (transform) {                                                      // 249
					args = transform.call.apply(transform, [methodScope].concat((0, _toConsumableArray3.default)(args)));           // 250
					methodScope.tranformed = true;                                                                                  // 251
                                                                                                                     //
					if (!Array.isArray(args)) {                                                                                     // 252
						args = [args];                                                                                                 // 253
					}                                                                                                               // 254
				});                                                                                                              // 255
			}                                                                                                                 // 256
                                                                                                                     //
			return args;                                                                                                      // 258
		}                                                                                                                  // 259
                                                                                                                     //
		return applyTransformers;                                                                                          // 15
	}();                                                                                                                // 15
                                                                                                                     //
	Streamer.prototype.iniPublication = function () {                                                                   // 15
		function iniPublication() {                                                                                        // 15
			var stream = this;                                                                                                // 262
			Meteor.publish(this.subscriptionName, function (eventName, useCollection) {                                       // 263
				check(eventName, String);                                                                                        // 264
				check(useCollection, Match.Optional(Boolean));                                                                   // 265
                                                                                                                     //
				if (eventName.length === 0) {                                                                                    // 267
					this.stop();                                                                                                    // 268
					return;                                                                                                         // 269
				}                                                                                                                // 270
                                                                                                                     //
				if (stream.isReadAllowed(this, eventName) !== true) {                                                            // 272
					this.stop();                                                                                                    // 273
					return;                                                                                                         // 274
				}                                                                                                                // 275
                                                                                                                     //
				var subscription = {                                                                                             // 277
					subscription: this,                                                                                             // 278
					eventName: eventName                                                                                            // 279
				};                                                                                                               // 277
				stream.addSubscription(subscription, eventName);                                                                 // 282
				this.onStop(function () {                                                                                        // 284
					stream.removeSubscription(subscription, eventName);                                                             // 285
				});                                                                                                              // 286
                                                                                                                     //
				if (useCollection === true) {                                                                                    // 288
					// Collection compatibility                                                                                     // 289
					this._session.sendAdded(stream.subscriptionName, 'id', {                                                        // 290
						eventName: eventName                                                                                           // 291
					});                                                                                                             // 290
				}                                                                                                                // 293
                                                                                                                     //
				this.ready();                                                                                                    // 295
			});                                                                                                               // 296
		}                                                                                                                  // 297
                                                                                                                     //
		return iniPublication;                                                                                             // 15
	}();                                                                                                                // 15
                                                                                                                     //
	Streamer.prototype.initMethod = function () {                                                                       // 15
		function initMethod() {                                                                                            // 15
			var stream = this;                                                                                                // 300
			var method = {};                                                                                                  // 301
                                                                                                                     //
			method[this.subscriptionName] = function (eventName) {                                                            // 303
				for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
					args[_key2 - 1] = arguments[_key2];                                                                             // 303
				}                                                                                                                // 303
                                                                                                                     //
				check(eventName, String);                                                                                        // 304
				check(args, Array);                                                                                              // 305
				this.unblock();                                                                                                  // 307
                                                                                                                     //
				if (stream.isWriteAllowed(this, eventName, args) !== true) {                                                     // 309
					return;                                                                                                         // 310
				}                                                                                                                // 311
                                                                                                                     //
				var methodScope = {                                                                                              // 313
					userId: this.userId,                                                                                            // 314
					connection: this.connection,                                                                                    // 315
					originalParams: args,                                                                                           // 316
					tranformed: false                                                                                               // 317
				};                                                                                                               // 313
				args = stream.applyTransformers(methodScope, eventName, args);                                                   // 320
				stream.emitWithScope.apply(stream, [eventName, methodScope].concat((0, _toConsumableArray3.default)(args)));     // 322
                                                                                                                     //
				if (stream.retransmit === true) {                                                                                // 324
					stream._emit(eventName, args, this.connection, true);                                                           // 325
				}                                                                                                                // 326
			};                                                                                                                // 327
                                                                                                                     //
			try {                                                                                                             // 329
				Meteor.methods(method);                                                                                          // 330
			} catch (e) {                                                                                                     // 331
				console.error(e);                                                                                                // 332
			}                                                                                                                 // 333
		}                                                                                                                  // 334
                                                                                                                     //
		return initMethod;                                                                                                 // 15
	}();                                                                                                                // 15
                                                                                                                     //
	Streamer.prototype._emit = function () {                                                                            // 15
		function _emit(eventName, args, origin, broadcast) {                                                               // 15
			var _this3 = this;                                                                                                // 336
                                                                                                                     //
			if (broadcast === true) {                                                                                         // 337
				Meteor.StreamerCentral.emit('broadcast', this.name, eventName, args);                                            // 338
			}                                                                                                                 // 339
                                                                                                                     //
			var subscriptions = this.subscriptionsByEventName[eventName];                                                     // 341
                                                                                                                     //
			if (!Array.isArray(subscriptions)) {                                                                              // 342
				return;                                                                                                          // 343
			}                                                                                                                 // 344
                                                                                                                     //
			subscriptions.forEach(function (subscription) {                                                                   // 346
				if (_this3.retransmitToSelf === false && origin && origin === subscription.subscription.connection) {            // 347
					return;                                                                                                         // 348
				}                                                                                                                // 349
                                                                                                                     //
				if (_this3.isEmitAllowed.apply(_this3, [subscription.subscription, eventName].concat((0, _toConsumableArray3.default)(args)))) {
					subscription.subscription._session.sendChanged(_this3.subscriptionName, 'id', {                                 // 352
						eventName: eventName,                                                                                          // 353
						args: args                                                                                                     // 354
					});                                                                                                             // 352
				}                                                                                                                // 356
			});                                                                                                               // 357
		}                                                                                                                  // 358
                                                                                                                     //
		return _emit;                                                                                                      // 15
	}();                                                                                                                // 15
                                                                                                                     //
	Streamer.prototype.emit = function () {                                                                             // 15
		function emit(eventName) {                                                                                         // 15
			for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {  // 360
				args[_key3 - 1] = arguments[_key3];                                                                              // 360
			}                                                                                                                 // 360
                                                                                                                     //
			this._emit(eventName, args, undefined, true);                                                                     // 361
		}                                                                                                                  // 362
                                                                                                                     //
		return emit;                                                                                                       // 15
	}();                                                                                                                // 15
                                                                                                                     //
	Streamer.prototype.emitWithoutBroadcast = function () {                                                             // 15
		function emitWithoutBroadcast(eventName) {                                                                         // 15
			for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {  // 364
				args[_key4 - 1] = arguments[_key4];                                                                              // 364
			}                                                                                                                 // 364
                                                                                                                     //
			this._emit(eventName, args, undefined, false);                                                                    // 365
		}                                                                                                                  // 366
                                                                                                                     //
		return emitWithoutBroadcast;                                                                                       // 15
	}();                                                                                                                // 15
                                                                                                                     //
	(0, _createClass3.default)(Streamer, [{                                                                             // 15
		key: "name",                                                                                                       // 15
		get: function () {                                                                                                 // 15
			return this._name;                                                                                                // 47
		},                                                                                                                 // 48
		set: function (name) {                                                                                             // 15
			check(name, String);                                                                                              // 51
			this._name = name;                                                                                                // 52
		}                                                                                                                  // 53
	}, {                                                                                                                // 15
		key: "subscriptionName",                                                                                           // 15
		get: function () {                                                                                                 // 15
			return "stream-" + this.name;                                                                                     // 56
		}                                                                                                                  // 57
	}, {                                                                                                                // 15
		key: "retransmit",                                                                                                 // 15
		get: function () {                                                                                                 // 15
			return this._retransmit;                                                                                          // 60
		},                                                                                                                 // 61
		set: function (retransmit) {                                                                                       // 15
			check(retransmit, Boolean);                                                                                       // 64
			this._retransmit = retransmit;                                                                                    // 65
		}                                                                                                                  // 66
	}, {                                                                                                                // 15
		key: "retransmitToSelf",                                                                                           // 15
		get: function () {                                                                                                 // 15
			return this._retransmitToSelf;                                                                                    // 69
		},                                                                                                                 // 70
		set: function (retransmitToSelf) {                                                                                 // 15
			check(retransmitToSelf, Boolean);                                                                                 // 73
			this._retransmitToSelf = retransmitToSelf;                                                                        // 74
		}                                                                                                                  // 75
	}]);                                                                                                                // 15
	return Streamer;                                                                                                    // 15
}(EV);                                                                                                               // 15
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/rocketchat:streamer/lib/ev.js");
require("./node_modules/meteor/rocketchat:streamer/server/server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['rocketchat:streamer'] = {}, {
  Streamer: Streamer
});

})();

//# sourceMappingURL=rocketchat_streamer.js.map
