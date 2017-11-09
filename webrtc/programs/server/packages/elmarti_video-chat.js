(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var Streamer = Package['rocketchat:streamer'].Streamer;
var UserStatus = Package['mizzao:user-status'].UserStatus;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

var require = meteorInstall({"node_modules":{"meteor":{"elmarti:video-chat":{"lib":{"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/elmarti_video-chat/lib/index.js                                                                //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
var Meteor = void 0;                                                                                       // 1
module.watch(require("meteor/meteor"), {                                                                   // 1
	Meteor: function (v) {                                                                                    // 1
		Meteor = v;                                                                                              // 1
	}                                                                                                         // 1
}, 0);                                                                                                     // 1
var Client = void 0;                                                                                       // 1
module.watch(require("./client"), {                                                                        // 1
	Client: function (v) {                                                                                    // 1
		Client = v;                                                                                              // 1
	}                                                                                                         // 1
}, 1);                                                                                                     // 1
var Services = void 0;                                                                                     // 1
module.watch(require("./server"), {                                                                        // 1
	Services: function (v) {                                                                                  // 1
		Services = v;                                                                                            // 1
	}                                                                                                         // 1
}, 2);                                                                                                     // 1
var Tracker = void 0;                                                                                      // 1
module.watch(require("meteor/tracker"), {                                                                  // 1
	Tracker: function (v) {                                                                                   // 1
		Tracker = v;                                                                                             // 1
	}                                                                                                         // 1
}, 3);                                                                                                     // 1
var Video = void 0;                                                                                        // 1
module.watch(require("./video"), {                                                                         // 1
	Video: function (v) {                                                                                     // 1
		Video = v;                                                                                               // 1
	}                                                                                                         // 1
}, 4);                                                                                                     // 1
var CallLog = void 0;                                                                                      // 1
module.watch(require("./call_log"), {                                                                      // 1
	"default": function (v) {                                                                                 // 1
		CallLog = v;                                                                                             // 1
	}                                                                                                         // 1
}, 5);                                                                                                     // 1
                                                                                                           //
if (Meteor.isClient) {                                                                                     // 10
	Meteor.VideoCallServices = new Client({                                                                   // 11
		meteor: Meteor,                                                                                          // 12
		tracker: Tracker,                                                                                        // 13
		video: Video                                                                                             // 14
	});                                                                                                       // 11
}                                                                                                          // 15
                                                                                                           //
if (Meteor.isServer) {                                                                                     // 16
	Meteor.users.find({                                                                                       // 17
		"status.online": true                                                                                    // 17
	}).observe({                                                                                              // 17
		removed: function (_ref) {                                                                               // 18
			var _id = _ref._id;                                                                                     // 18
			CallLog.find({                                                                                          // 19
				$or: [{                                                                                                // 20
					status: {                                                                                             // 21
						$ne: 'FINISHED'                                                                                      // 22
					},                                                                                                    // 21
					target: _id                                                                                           // 24
				}, {                                                                                                   // 20
					status: {                                                                                             // 26
						$ne: 'FINISHED'                                                                                      // 27
					},                                                                                                    // 26
					caller: _id                                                                                           // 29
				}]                                                                                                     // 25
			}).forEach(function (call) {                                                                            // 19
				return CallLog.update({                                                                                // 31
					_id: call._id                                                                                         // 33
				}, {                                                                                                   // 32
					$set: {                                                                                               // 35
						status: 'FINISHED'                                                                                   // 36
					}                                                                                                     // 35
				});                                                                                                    // 34
			});                                                                                                     // 31
		}                                                                                                        // 39
	});                                                                                                       // 17
	Meteor.methods({                                                                                          // 41
		'VideoCallServices/call': Services.call,                                                                 // 42
		'VideoCallServices/answer': Services.answer,                                                             // 43
		'VideoCallServices/end': Services.end                                                                    // 44
	});                                                                                                       // 41
	Meteor.VideoCallServices = {                                                                              // 46
		/**                                                                                                      // 47
   * Callback envoked on error                                                                             //
   * @param err {Error}                                                                                    //
   * @param data {Object}                                                                                  //
   * @param user {Object}                                                                                  //
   */onError: function (err, data, user) {}                                                                //
	};                                                                                                        // 46
}                                                                                                          // 55
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"publish.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/elmarti_video-chat/lib/publish.js                                                              //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
var Meteor = void 0;                                                                                       // 1
module.watch(require("meteor/meteor"), {                                                                   // 1
    Meteor: function (v) {                                                                                 // 1
        Meteor = v;                                                                                        // 1
    }                                                                                                      // 1
}, 0);                                                                                                     // 1
var CallLog = void 0;                                                                                      // 1
module.watch(require("./call_log"), {                                                                      // 1
    "default": function (v) {                                                                              // 1
        CallLog = v;                                                                                       // 1
    }                                                                                                      // 1
}, 1);                                                                                                     // 1
Meteor.publish('VideoChatPublication', function () {                                                       // 3
    return CallLog.find({                                                                                  // 4
        $or: [{                                                                                            // 5
            caller: this.userId,                                                                           // 6
            status: {                                                                                      // 7
                $ne: "FINISHED"                                                                            // 8
            }                                                                                              // 7
        }, {                                                                                               // 5
            target: this.userId,                                                                           // 11
            status: {                                                                                      // 12
                $ne: "FINISHED"                                                                            // 13
            }                                                                                              // 12
        }]                                                                                                 // 10
    });                                                                                                    // 4
});                                                                                                        // 17
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"call_log.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/elmarti_video-chat/lib/call_log.js                                                             //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
var Meteor = void 0;                                                                                       // 1
module.watch(require("meteor/meteor"), {                                                                   // 1
  Meteor: function (v) {                                                                                   // 1
    Meteor = v;                                                                                            // 1
  }                                                                                                        // 1
}, 0);                                                                                                     // 1
module.exportDefault(new Meteor.Collection("VideoChatCallLog"));                                           // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"client.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/elmarti_video-chat/lib/client.js                                                               //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                    //
                                                                                                           //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                           //
                                                                                                           //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }          //
                                                                                                           //
module.export({                                                                                            // 1
	Client: function () {                                                                                     // 1
		return Client;                                                                                           // 1
	}                                                                                                         // 1
});                                                                                                        // 1
//jshint esversion: 6                                                                                      // 1
var Meteor = void 0,                                                                                       // 2
    Video = void 0;                                                                                        // 2
                                                                                                           //
var Client = function () {                                                                                 //
	function Client(args) {                                                                                   // 5
		var _this = this;                                                                                        // 5
                                                                                                           //
		(0, _classCallCheck3.default)(this, Client);                                                             // 5
		this.callbacks = callbacks;                                                                              // 6
		this.RTCConfiguration = {};                                                                              // 7
		this.RetryLimit = 5;                                                                                     // 8
		this.RetryCount = 0;                                                                                     // 9
		var meteor = args.meteor,                                                                                // 5
		    tracker = args.tracker,                                                                              // 5
		    video = args.video;                                                                                  // 5
		Meteor = meteor;                                                                                         // 11
		Video = video;                                                                                           // 12
		tracker.autorun(function () {                                                                            // 13
			_this.sub = Meteor.subscribe('VideoChatPublication');                                                   // 14
		});                                                                                                      // 15
                                                                                                           //
		Meteor.connection._stream.on('message', this.handleStream.bind(this));                                   // 16
	} /**                                                                                                     // 18
    * Handle the Video chat specific data in the DDP stream                                                //
    * @param msg {string}                                                                                  //
    */                                                                                                     //
                                                                                                           //
	Client.prototype.handleStream = function () {                                                             //
		function handleStream(msg) {                                                                             //
			msg = JSON.parse(msg);                                                                                  // 26
                                                                                                           //
			if (msg.collection === 'VideoChatCallLog' && msg.msg === 'removed') {                                   // 27
				this.onTerminateCall();                                                                                // 29
			}                                                                                                       // 30
                                                                                                           //
			if (msg.collection === 'VideoChatCallLog' && msg.msg === 'added' && msg.fields.target === Meteor.userId() && msg.fields.status === "NEW") {
				this.callLog = msg.fields;                                                                             // 35
				this.stream = new Meteor.Streamer(msg.id);                                                             // 36
				this.stream.on('video_message', this.handleTargetStream.bind(this));                                   // 37
				this.onReceivePhoneCall(this.callLog.caller);                                                          // 38
			}                                                                                                       // 39
                                                                                                           //
			if (msg.collection === 'VideoChatCallLog' && msg.msg === 'added' && msg.fields.caller === Meteor.userId() && msg.fields.status === 'NEW') {
				this.callLog = msg.fields;                                                                             // 44
			}                                                                                                       // 45
                                                                                                           //
			if (msg.msg === 'changed' && msg.collection === 'VideoChatCallLog' && msg.fields !== undefined) {       // 46
				var _msg = msg,                                                                                        // 48
				    fields = _msg.fields;                                                                              // 48
                                                                                                           //
				if (fields.status === 'ACCEPTED' && this.callLog.caller === Meteor.userId()) {                         // 50
					this.onTargetAccept();                                                                                // 51
					this.handleTargetAccept();                                                                            // 52
				}                                                                                                      // 53
			}                                                                                                       // 54
		}                                                                                                        // 55
                                                                                                           //
		return handleStream;                                                                                     //
	}(); /**                                                                                                  //
       * Handle the stream data for the target user                                                        //
       * @param streamData {string}                                                                        //
       */                                                                                                  //
                                                                                                           //
	Client.prototype.handleTargetStream = function () {                                                       //
		function handleTargetStream(streamData) {                                                                //
			var _this2 = this;                                                                                      // 61
                                                                                                           //
			if (typeof streamData === "string") {                                                                   // 62
				streamData = JSON.parse(streamData);                                                                   // 63
			}                                                                                                       // 64
                                                                                                           //
			if (streamData.offer) {                                                                                 // 65
				navigator.mediaDevices.getUserMedia({                                                                  // 66
					audio: true,                                                                                          // 66
					video: true                                                                                           // 66
				}).then(function (stream) {                                                                            // 66
					if (_this2.localVideo) {                                                                              // 67
						_this2.localVideo.setStream(stream, true);                                                           // 68
                                                                                                           //
						_this2.localVideo.play();                                                                            // 69
					}                                                                                                     // 70
                                                                                                           //
					_this2.setupPeerConnection(stream, streamData.offer);                                                 // 71
				}).catch(function (err) {                                                                              // 72
					_this2.onError(err, streamData);                                                                      // 73
				});                                                                                                    // 74
			}                                                                                                       // 75
                                                                                                           //
			if (streamData.candidate) {                                                                             // 76
				if (typeof streamData.candidate === "string") {                                                        // 77
					streamData.candidate = JSON.parse(streamData.candidate);                                              // 78
				}                                                                                                      // 79
                                                                                                           //
				var candidate = streamData.candidate === {} || streamData.candidate === null ? null : new RTCIceCandidate(streamData.candidate);
				if (this.peerConnection) this.peerConnection.addIceCandidate(candidate).catch(function (err) {         // 82
					_this2.onError(err, streamData);                                                                      // 84
				});                                                                                                    // 85
			}                                                                                                       // 86
		}                                                                                                        // 87
                                                                                                           //
		return handleTargetStream;                                                                               //
	}(); /**                                                                                                  //
       * Handle the local mediaDevices when the target accepts the call                                    //
       */                                                                                                  //
                                                                                                           //
	Client.prototype.handleTargetAccept = function () {                                                       //
		function handleTargetAccept() {                                                                          //
			var _this3 = this;                                                                                      // 92
                                                                                                           //
			navigator.mediaDevices.getUserMedia({                                                                   // 93
				audio: true,                                                                                           // 93
				video: true                                                                                            // 93
			}).then(function (stream) {                                                                             // 93
				if (_this3.localVideo) {                                                                               // 94
					_this3.localVideo.pause();                                                                            // 95
                                                                                                           //
					_this3.localVideo.setStream(stream, true);                                                            // 96
                                                                                                           //
					_this3.localVideo.play();                                                                             // 97
				}                                                                                                      // 98
                                                                                                           //
				_this3.setupPeerConnection(stream);                                                                    // 99
			}).catch(function (err) {                                                                               // 100
				_this3.onError(err, msg);                                                                              // 101
			});                                                                                                     // 102
		}                                                                                                        // 103
                                                                                                           //
		return handleTargetAccept;                                                                               //
	}(); /**                                                                                                  //
       * Set up the peer connection                                                                        //
       * @param stream {MediaStream}                                                                       //
       * @param remoteDescription {RTCPeerConnection}                                                      //
       */                                                                                                  //
                                                                                                           //
	Client.prototype.setupPeerConnection = function () {                                                      //
		function setupPeerConnection(stream, remoteDescription) {                                                //
			this.peerConnection = new RTCPeerConnection(this.RTCConfiguration, {                                    // 110
				"optional": [{                                                                                         // 110
					'googIPv6': false                                                                                     // 110
				}]                                                                                                     // 110
			});                                                                                                     // 110
			this.onPeerConnectionCreated();                                                                         // 111
			this.setPeerConnectionCallbacks();                                                                      // 112
			this.peerConnection.addStream(stream);                                                                  // 113
			if (remoteDescription) this.createTargetSession(remoteDescription);else this.createCallSession();       // 114
		}                                                                                                        // 118
                                                                                                           //
		return setupPeerConnection;                                                                              //
	}(); /**                                                                                                  //
       * Set callback for RTCPeerConnection                                                                //
       */                                                                                                  //
                                                                                                           //
	Client.prototype.setPeerConnectionCallbacks = function () {                                               //
		function setPeerConnectionCallbacks() {                                                                  //
			var _this4 = this;                                                                                      // 123
                                                                                                           //
			this.peerConnection.onicecandidate = function (event) {                                                 // 124
				if (event.candidate === undefined) {                                                                   // 126
					event.candidate = {};                                                                                 // 127
				}                                                                                                      // 128
                                                                                                           //
				_this4.stream.emit('video_message', {                                                                  // 129
					candidate: JSON.stringify(event.candidate)                                                            // 129
				});                                                                                                    // 129
			};                                                                                                      // 130
                                                                                                           //
			this.peerConnection.oniceconnectionstatechange = function (event) {                                     // 131
				if (event.target.iceConnectionState === "failed") {                                                    // 132
					_this4.peerConnection = undefined;                                                                    // 133
                                                                                                           //
					if (_this4.RetryCount < _this4.RetryLimit) {                                                          // 134
						navigator.mediaDevices.getUserMedia({                                                                // 135
							audio: true,                                                                                        // 135
							video: true                                                                                         // 135
						}).then(function (stream) {                                                                          // 135
							_this4.RetryCount++;                                                                                // 136
                                                                                                           //
							if (_this4.localVideo) {                                                                            // 137
								_this4.localVideo.pause();                                                                         // 138
                                                                                                           //
								_this4.localVideo.setStream(stream, true);                                                         // 139
                                                                                                           //
								_this4.localVideo.play();                                                                          // 140
							}                                                                                                   // 141
                                                                                                           //
							_this4.setupPeerConnection(stream);                                                                 // 142
						}).catch(function (err) {                                                                            // 143
							_this4.onError(err, msg);                                                                           // 144
						});                                                                                                  // 145
					} else {                                                                                              // 146
						var error = new Error(408, "Could not establish connection");                                        // 147
                                                                                                           //
						_this4.onError(error);                                                                               // 148
					}                                                                                                     // 149
				}                                                                                                      // 151
			};                                                                                                      // 152
                                                                                                           //
			this.peerConnection.onaddstream = function (stream) {                                                   // 153
				if (this.remoteVideo) {                                                                                // 154
					this.remoteVideo.pause();                                                                             // 155
					this.remoteVideo.setStream(stream.stream);                                                            // 156
					this.remoteVideo.play();                                                                              // 157
				}                                                                                                      // 158
			}.bind(this);                                                                                           // 159
		}                                                                                                        // 160
                                                                                                           //
		return setPeerConnectionCallbacks;                                                                       //
	}(); /**                                                                                                  //
       * Create the RTCPeerConnection for the person being called                                          //
       * @param remoteDescription {RemoteDescription}                                                      //
       */                                                                                                  //
                                                                                                           //
	Client.prototype.createTargetSession = function () {                                                      //
		function createTargetSession(remoteDescription) {                                                        //
			var _this5 = this;                                                                                      // 166
                                                                                                           //
			this.peerConnection.setRemoteDescription(remoteDescription).then(function () {                          // 169
				_this5.peerConnection.createAnswer().then(function (answer) {                                          // 171
					_this5.peerConnection.setLocalDescription(answer).catch(function (err) {                              // 172
						_this5.onError(err, answer);                                                                         // 173
					});                                                                                                   // 174
                                                                                                           //
					_this5.stream.emit('video_message', JSON.stringify({                                                  // 175
						answer: answer                                                                                       // 175
					}));                                                                                                  // 175
				}).catch(function (err) {                                                                              // 176
					_this5.onError(err, remoteDescription);                                                               // 177
				});                                                                                                    // 178
			}).catch(function (err) {                                                                               // 179
				_this5.onError(err, remoteDescription);                                                                // 180
			});                                                                                                     // 181
		}                                                                                                        // 183
                                                                                                           //
		return createTargetSession;                                                                              //
	}();                                                                                                      //
                                                                                                           //
	Client.prototype.createCallSession = function () {                                                        //
		function createCallSession() {                                                                           //
			var _this6 = this;                                                                                      // 185
                                                                                                           //
			this.peerConnection.createOffer().then(function (offer) {                                               // 186
				_this6.stream.emit('video_message', JSON.stringify({                                                   // 187
					offer: offer                                                                                          // 187
				}));                                                                                                   // 187
                                                                                                           //
				_this6.peerConnection.setLocalDescription(offer).catch(function (err) {                                // 188
					_this6.onError(err, offer);                                                                           // 189
				});                                                                                                    // 190
			}).catch(function (err) {                                                                               // 192
				return _this6.onError(err);                                                                            // 192
			});                                                                                                     // 192
		}                                                                                                        // 193
                                                                                                           //
		return createCallSession;                                                                                //
	}(); /**                                                                                                  //
       * Call allows you to call a remote user using their userId                                          //
       * @param _id {string}                                                                               //
       * @param local {HTMLElement}                                                                        //
       * @remote remote {HTMLElement}                                                                      //
       */                                                                                                  //
                                                                                                           //
	Client.prototype.call = function () {                                                                     //
		function call(_id, local, remote) {                                                                      //
			this.RetryCount = 0;                                                                                    // 202
			if (local) this.localVideo = new Video(local);                                                          // 203
			if (remote) this.remoteVideo = new Video(remote);                                                       // 205
			Meteor.call('VideoCallServices/call', _id, this.callbacks.call.bind(this));                             // 207
		}                                                                                                        // 208
                                                                                                           //
		return call;                                                                                             //
	}(); /**                                                                                                  //
       * Handle the data stream for the caller                                                             //
       * @param streamData {string}                                                                        //
       */                                                                                                  //
                                                                                                           //
	Client.prototype.handleCallerStream = function () {                                                       //
		function handleCallerStream(streamData) {                                                                //
			var _this7 = this;                                                                                      // 214
                                                                                                           //
			if (typeof streamData === 'string') {                                                                   // 215
				streamData = JSON.parse(streamData);                                                                   // 216
			}                                                                                                       // 217
                                                                                                           //
			if (streamData.answer) {                                                                                // 218
				this.peerConnection.setRemoteDescription(streamData.answer).catch(function (err) {                     // 219
					_this7.onError(err, streamData);                                                                      // 220
				});                                                                                                    // 221
			}                                                                                                       // 222
                                                                                                           //
			if (streamData.candidate) {                                                                             // 224
				if (typeof streamData.candidate === 'string') streamData.candidate = JSON.parse(streamData.candidate);
				var candidate = streamData.candidate === {} || streamData.candidate === null ? null : new RTCIceCandidate(streamData.candidate);
                                                                                                           //
				if (this.peerConnection) {                                                                             // 229
					this.peerConnection.addIceCandidate(streamData.candidate).catch(function (err) {                      // 230
						_this7.onError(err, streamData);                                                                     // 231
					});                                                                                                   // 232
				}                                                                                                      // 233
			}                                                                                                       // 235
		}                                                                                                        // 237
                                                                                                           //
		return handleCallerStream;                                                                               //
	}(); /**                                                                                                  //
       * Answer the phone call                                                                             //
       * @param local {HTMLElement}                                                                        //
       * @param remote {HTMLElement}                                                                       //
       */                                                                                                  //
                                                                                                           //
	Client.prototype.answerPhoneCall = function () {                                                          //
		function answerPhoneCall(local, remote) {                                                                //
			var _this8 = this;                                                                                      // 243
                                                                                                           //
			if (local) this.localVideo = new Video(local);                                                          // 244
			if (remote) this.remoteVideo = new Video(remote);                                                       // 246
			Meteor.call('VideoCallServices/answer', function (err) {                                                // 248
				if (err) _this8.onError(err);                                                                          // 249
			});                                                                                                     // 251
		}                                                                                                        // 252
                                                                                                           //
		return answerPhoneCall;                                                                                  //
	}(); /**                                                                                                  //
       * End the phone call                                                                                //
       */                                                                                                  //
                                                                                                           //
	Client.prototype.endPhoneCall = function () {                                                             //
		function endPhoneCall() {                                                                                //
			var _this9 = this;                                                                                      // 257
                                                                                                           //
			Meteor.call("VideoCallServices/end", function (err) {                                                   // 258
				if (err) {                                                                                             // 259
					_this9.onError(err);                                                                                  // 260
				}                                                                                                      // 261
			});                                                                                                     // 262
		}                                                                                                        // 263
                                                                                                           //
		return endPhoneCall;                                                                                     //
	}();                                                                                                      //
                                                                                                           //
	Client.prototype.onTargetAccept = function () {                                                           //
		function onTargetAccept() {}                                                                             //
                                                                                                           //
		return onTargetAccept;                                                                                   //
	}();                                                                                                      //
                                                                                                           //
	Client.prototype.onReceivePhoneCall = function () {                                                       //
		function onReceivePhoneCall(fields) {}                                                                   //
                                                                                                           //
		return onReceivePhoneCall;                                                                               //
	}();                                                                                                      //
                                                                                                           //
	Client.prototype.onTerminateCall = function () {                                                          //
		function onTerminateCall() {}                                                                            //
                                                                                                           //
		return onTerminateCall;                                                                                  //
	}();                                                                                                      //
                                                                                                           //
	Client.prototype.onPeerConnectionCreated = function () {                                                  //
		function onPeerConnectionCreated() {}                                                                    //
                                                                                                           //
		return onPeerConnectionCreated;                                                                          //
	}();                                                                                                      //
                                                                                                           //
	Client.prototype.onError = function () {                                                                  //
		function onError(err) {}                                                                                 //
                                                                                                           //
		return onError;                                                                                          //
	}();                                                                                                      //
                                                                                                           //
	return Client;                                                                                            //
}();                                                                                                       //
                                                                                                           //
var callbacks = {                                                                                          // 286
	call: function (err, _id) {                                                                               // 287
		this.RetryCount++;                                                                                       // 288
		if (err) this.onError(err, _id);else {                                                                   // 289
			this.stream = new Meteor.Streamer(_id);                                                                 // 292
			this.stream.on('video_message', this.handleCallerStream.bind(this));                                    // 293
		}                                                                                                        // 294
	}                                                                                                         // 295
};                                                                                                         // 286
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"server.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/elmarti_video-chat/lib/server.js                                                               //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
module.export({                                                                                            // 1
    Services: function () {                                                                                // 1
        return Services;                                                                                   // 1
    }                                                                                                      // 1
});                                                                                                        // 1
var Meteor = void 0;                                                                                       // 1
module.watch(require("meteor/meteor"), {                                                                   // 1
    Meteor: function (v) {                                                                                 // 1
        Meteor = v;                                                                                        // 1
    }                                                                                                      // 1
}, 0);                                                                                                     // 1
var check = void 0;                                                                                        // 1
module.watch(require("meteor/check"), {                                                                    // 1
    check: function (v) {                                                                                  // 1
        check = v;                                                                                         // 1
    }                                                                                                      // 1
}, 1);                                                                                                     // 1
var CallLog = void 0;                                                                                      // 1
module.watch(require("./call_log"), {                                                                      // 1
    "default": function (v) {                                                                              // 1
        CallLog = v;                                                                                       // 1
    }                                                                                                      // 1
}, 2);                                                                                                     // 1
var streams = {};                                                                                          // 6
var Services = {                                                                                           // 7
    /**                                                                                                    // 8
     * Call allows you to call a remote user using their userId                                            //
     * @param _id {string}                                                                                 //
     */call: function (_id) {                                                                              //
        check(_id, String);                                                                                // 13
        var meteorUser = Meteor.user();                                                                    // 14
                                                                                                           //
        if (!meteorUser) {                                                                                 // 15
            var err = new Meteor.Error(403, "USER_NOT_LOGGED_IN", {                                        // 16
                caller: meteorUser._id,                                                                    // 17
                target: _id                                                                                // 18
            });                                                                                            // 16
            Meteor.VideoCallServices.onError(err);                                                         // 20
            throw err;                                                                                     // 21
        }                                                                                                  // 22
                                                                                                           //
        if (Services.checkConnect(meteorUser._id, _id)) {                                                  // 23
            var inCall = CallLog.findOne({                                                                 // 24
                status: "CONNECTED",                                                                       // 25
                target: _id                                                                                // 26
            });                                                                                            // 24
                                                                                                           //
            if (inCall) {                                                                                  // 28
                var _err = new Meteor.Error(500, "TARGET_IN_CALL", inCall);                                // 29
                                                                                                           //
                Meteor.VideoCallServices.onError(_err, inCall, Meteor.userId());                           // 30
                throw _err;                                                                                // 31
            } else {                                                                                       // 32
                CallLog.update({                                                                           // 34
                    $or: [{                                                                                // 35
                        status: {                                                                          // 36
                            $ne: "FINISHED"                                                                // 37
                        },                                                                                 // 36
                        caller: meteorUser._id                                                             // 39
                    }, {                                                                                   // 35
                        status: {                                                                          // 41
                            $ne: "FINISHED"                                                                // 42
                        },                                                                                 // 41
                        target: meteorUser._id                                                             // 44
                    }]                                                                                     // 40
                }, {                                                                                       // 34
                    $set: {                                                                                // 48
                        status: "FINISHED"                                                                 // 49
                    }                                                                                      // 48
                });                                                                                        // 47
                var logId = CallLog.insert({                                                               // 52
                    status: "NEW",                                                                         // 53
                    target: _id,                                                                           // 54
                    caller: meteorUser._id                                                                 // 55
                });                                                                                        // 52
                streams[logId] = new Meteor.Streamer(logId);                                               // 57
                streams[logId].allowRead('all');                                                           // 58
                streams[logId].allowWrite('all');                                                          // 59
                return logId;                                                                              // 60
            }                                                                                              // 61
        } else {                                                                                           // 62
            var _err2 = new Meteor.Error(403, "CONNECTION_NOT_ALLOWED", {                                  // 63
                target: meteorUser._id,                                                                    // 64
                caller: _id                                                                                // 65
            });                                                                                            // 63
                                                                                                           //
            Meteor.VideoCallServices.onError(_err2, _id, meteorUser);                                      // 67
            throw _err2;                                                                                   // 68
        }                                                                                                  // 69
    },                                                                                                     // 71
    /**                                                                                                    // 72
     * Check if call connection should be permitted                                                        //
     * @param _id {caller}                                                                                 //
     * @param _id {target}                                                                                 //
     * @returns boolean                                                                                    //
     */checkConnect: function (caller, target) {                                                           //
        return true;                                                                                       // 79
    },                                                                                                     // 80
    /**                                                                                                    // 81
     * Answer current phone call                                                                           //
     */answer: function () {                                                                               //
        var user = Meteor.user();                                                                          // 85
                                                                                                           //
        if (!user) {                                                                                       // 86
            var err = new Meteor.Error(403, "USER_NOT_LOGGED_IN");                                         // 87
            Meteor.VideoCallServices.onError(err);                                                         // 88
            throw err;                                                                                     // 89
        }                                                                                                  // 90
                                                                                                           //
        var session = CallLog.findOne({                                                                    // 91
            target: user._id,                                                                              // 92
            status: 'NEW'                                                                                  // 93
        });                                                                                                // 91
                                                                                                           //
        if (!session) {                                                                                    // 95
            var _err3 = new Meteor.Error(500, 'SESSION_NOT_FOUND', {                                       // 96
                target: user._id                                                                           // 97
            });                                                                                            // 96
                                                                                                           //
            Meteor.VideoCallServices.onError(_err3, undefined, user);                                      // 99
            throw _err3;                                                                                   // 100
        } else {                                                                                           // 101
            CallLog.update({                                                                               // 104
                _id: session._id                                                                           // 105
            }, {                                                                                           // 104
                $set: {                                                                                    // 107
                    status: 'ACCEPTED'                                                                     // 108
                }                                                                                          // 107
            });                                                                                            // 106
        }                                                                                                  // 111
    },                                                                                                     // 112
    /**                                                                                                    // 113
     * End current phone call                                                                              //
     */end: function () {                                                                                  //
        var _id = Meteor.userId();                                                                         // 117
                                                                                                           //
        CallLog.find({                                                                                     // 118
            $or: [{                                                                                        // 119
                status: {                                                                                  // 120
                    $ne: 'FINISHED'                                                                        // 121
                },                                                                                         // 120
                target: _id                                                                                // 123
            }, {                                                                                           // 119
                status: {                                                                                  // 125
                    $ne: 'FINISHED'                                                                        // 126
                },                                                                                         // 125
                caller: _id                                                                                // 128
            }]                                                                                             // 124
        }).forEach(function (call) {                                                                       // 118
            return CallLog.update({                                                                        // 130
                _id: call._id                                                                              // 132
            }, {                                                                                           // 131
                $set: {                                                                                    // 134
                    status: 'FINISHED'                                                                     // 135
                }                                                                                          // 134
            });                                                                                            // 133
        });                                                                                                // 130
    }                                                                                                      // 138
};                                                                                                         // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"video.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/elmarti_video-chat/lib/video.js                                                                //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                    //
                                                                                                           //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                           //
                                                                                                           //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }          //
                                                                                                           //
module.export({                                                                                            // 1
	Video: function () {                                                                                      // 1
		return Video;                                                                                            // 1
	}                                                                                                         // 1
});                                                                                                        // 1
                                                                                                           //
var Video = function () {                                                                                  //
	/**                                                                                                       // 2
  * Wrap video to allow stabler manipulation                                                               //
  * @param video {HTMLElement}                                                                             //
  */function Video(video) {                                                                                //
		var _this = this;                                                                                        // 6
                                                                                                           //
		(0, _classCallCheck3.default)(this, Video);                                                              // 6
		this.onPlaying = false;                                                                                  // 7
		this.onPause = false;                                                                                    // 8
                                                                                                           //
		if (!video) {                                                                                            // 9
			throw new Error("Video element not found");                                                             // 10
		} else {                                                                                                 // 11
			this.element = video;                                                                                   // 12
                                                                                                           //
			this.element.onplaying = function () {                                                                  // 13
				_this.onPlaying = true;                                                                                // 14
				_this.onPause = false;                                                                                 // 15
			};                                                                                                      // 16
                                                                                                           //
			this.element.onpause = function () {                                                                    // 17
				_this.onPlaying = false;                                                                               // 18
				_this.onPause = true;                                                                                  // 19
			};                                                                                                      // 20
		}                                                                                                        // 21
	} /**                                                                                                     // 22
    * Pause the video element                                                                              //
    */                                                                                                     //
                                                                                                           //
	Video.prototype.pause = function () {                                                                     //
		function pause() {                                                                                       //
			if (!this.element.paused && !this.onPause) {                                                            // 28
				this.element.pause();                                                                                  // 29
			}                                                                                                       // 30
		}                                                                                                        // 31
                                                                                                           //
		return pause;                                                                                            //
	}(); /**                                                                                                  //
       * Play the video element                                                                            //
       */                                                                                                  //
                                                                                                           //
	Video.prototype.play = function () {                                                                      //
		function play() {                                                                                        //
			if (this.element.paused && !this.onPlaying) {                                                           // 37
				this.element.play().then(function (_) {                                                                // 38
					// Automatic playback started!                                                                        // 39
					// Show playing UI.                                                                                   // 40
					// We can now safely pause video...                                                                   // 41
					console.log("video playing");                                                                         // 42
				}).catch(function (error) {                                                                            // 43
					// Auto-play was prevented                                                                            // 45
					// Show paused UI.                                                                                    // 46
					console.log("video error", error);                                                                    // 47
				});                                                                                                    // 48
			}                                                                                                       // 49
		}                                                                                                        // 50
                                                                                                           //
		return play;                                                                                             //
	}(); /**                                                                                                  //
       * Set the video stream                                                                              //
       * @param stream {MediaStream}                                                                       //
       * @param muted {Boolean}                                                                            //
       */                                                                                                  //
                                                                                                           //
	Video.prototype.setStream = function () {                                                                 //
		function setStream(stream, muted) {                                                                      //
			this.element.srcObject = stream;                                                                        // 58
                                                                                                           //
			if (muted !== undefined) {                                                                              // 59
				this.element.muted = muted;                                                                            // 60
			} else {                                                                                                // 61
				this.element.muted = false;                                                                            // 62
			}                                                                                                       // 63
		}                                                                                                        // 64
                                                                                                           //
		return setStream;                                                                                        //
	}();                                                                                                      //
                                                                                                           //
	return Video;                                                                                             //
}();                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"node_modules":{"babel-runtime":{"helpers":{"classCallCheck.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// node_modules/meteor/elmarti_video-chat/node_modules/babel-runtime/helpers/classCallCheck.js             //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/elmarti:video-chat/lib/index.js");
require("./node_modules/meteor/elmarti:video-chat/lib/publish.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['elmarti:video-chat'] = {};

})();

//# sourceMappingURL=elmarti_video-chat.js.map
