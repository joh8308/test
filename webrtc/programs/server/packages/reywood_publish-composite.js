(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var check = Package.check.check;
var Match = Package.check.Match;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var _ = Package.underscore._;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

/* Package-scope variables */
var enableDebugLogging, publishComposite;

var require = meteorInstall({"node_modules":{"meteor":{"reywood:publish-composite":{"lib":{"publish_composite.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/reywood_publish-composite/lib/publish_composite.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({                                                                                                        // 1
    enableDebugLogging: function () {                                                                                  // 1
        return enableDebugLogging;                                                                                     // 1
    },                                                                                                                 // 1
    publishComposite: function () {                                                                                    // 1
        return publishComposite;                                                                                       // 1
    }                                                                                                                  // 1
});                                                                                                                    // 1
                                                                                                                       //
var _ = void 0;                                                                                                        // 1
                                                                                                                       //
module.watch(require("meteor/underscore"), {                                                                           // 1
    _: function (v) {                                                                                                  // 1
        _ = v;                                                                                                         // 1
    }                                                                                                                  // 1
}, 0);                                                                                                                 // 1
var Meteor = void 0;                                                                                                   // 1
module.watch(require("meteor/meteor"), {                                                                               // 1
    Meteor: function (v) {                                                                                             // 1
        Meteor = v;                                                                                                    // 1
    }                                                                                                                  // 1
}, 1);                                                                                                                 // 1
var Publication = void 0;                                                                                              // 1
module.watch(require("./publication"), {                                                                               // 1
    "default": function (v) {                                                                                          // 1
        Publication = v;                                                                                               // 1
    }                                                                                                                  // 1
}, 2);                                                                                                                 // 1
var Subscription = void 0;                                                                                             // 1
module.watch(require("./subscription"), {                                                                              // 1
    "default": function (v) {                                                                                          // 1
        Subscription = v;                                                                                              // 1
    }                                                                                                                  // 1
}, 3);                                                                                                                 // 1
var debugLog = void 0,                                                                                                 // 1
    enableDebugLogging = void 0;                                                                                       // 1
module.watch(require("./logging"), {                                                                                   // 1
    debugLog: function (v) {                                                                                           // 1
        debugLog = v;                                                                                                  // 1
    },                                                                                                                 // 1
    enableDebugLogging: function (v) {                                                                                 // 1
        enableDebugLogging = v;                                                                                        // 1
    }                                                                                                                  // 1
}, 4);                                                                                                                 // 1
                                                                                                                       //
function publishComposite(name, options) {                                                                             // 9
    return Meteor.publish(name, function () {                                                                          // 10
        function publish() {                                                                                           // 10
            var subscription = new Subscription(this);                                                                 // 11
                                                                                                                       //
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {                     // 10
                args[_key] = arguments[_key];                                                                          // 10
            }                                                                                                          // 10
                                                                                                                       //
            var instanceOptions = prepareOptions.call(this, options, args);                                            // 12
            var publications = [];                                                                                     // 13
            instanceOptions.forEach(function (opt) {                                                                   // 15
                var pub = new Publication(subscription, opt);                                                          // 16
                pub.publish();                                                                                         // 17
                publications.push(pub);                                                                                // 18
            });                                                                                                        // 19
            this.onStop(function () {                                                                                  // 21
                publications.forEach(function (pub) {                                                                  // 22
                    return pub.unpublish();                                                                            // 22
                });                                                                                                    // 22
            });                                                                                                        // 23
            debugLog('Meteor.publish', 'ready');                                                                       // 25
            this.ready();                                                                                              // 26
        }                                                                                                              // 27
                                                                                                                       //
        return publish;                                                                                                // 10
    }());                                                                                                              // 10
} // For backwards compatibility                                                                                       // 28
                                                                                                                       //
                                                                                                                       //
Meteor.publishComposite = publishComposite;                                                                            // 31
                                                                                                                       //
function prepareOptions(options, args) {                                                                               // 33
    var preparedOptions = options;                                                                                     // 34
                                                                                                                       //
    if (typeof preparedOptions === 'function') {                                                                       // 36
        preparedOptions = preparedOptions.apply(this, args);                                                           // 37
    }                                                                                                                  // 38
                                                                                                                       //
    if (!preparedOptions) {                                                                                            // 40
        return [];                                                                                                     // 41
    }                                                                                                                  // 42
                                                                                                                       //
    if (!_.isArray(preparedOptions)) {                                                                                 // 44
        preparedOptions = [preparedOptions];                                                                           // 45
    }                                                                                                                  // 46
                                                                                                                       //
    return preparedOptions;                                                                                            // 48
}                                                                                                                      // 49
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"doc_ref_counter.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/reywood_publish-composite/lib/doc_ref_counter.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                                //
                                                                                                                       //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                       //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
var DocumentRefCounter = function () {                                                                                 //
    function DocumentRefCounter(observer) {                                                                            // 2
        (0, _classCallCheck3.default)(this, DocumentRefCounter);                                                       // 2
        this.heap = {};                                                                                                // 3
        this.observer = observer;                                                                                      // 4
    }                                                                                                                  // 5
                                                                                                                       //
    DocumentRefCounter.prototype.increment = function () {                                                             //
        function increment(collectionName, docId) {                                                                    //
            var key = collectionName + ":" + docId.valueOf();                                                          // 8
                                                                                                                       //
            if (!this.heap[key]) {                                                                                     // 9
                this.heap[key] = 0;                                                                                    // 10
            }                                                                                                          // 11
                                                                                                                       //
            this.heap[key] += 1;                                                                                       // 12
        }                                                                                                              // 13
                                                                                                                       //
        return increment;                                                                                              //
    }();                                                                                                               //
                                                                                                                       //
    DocumentRefCounter.prototype.decrement = function () {                                                             //
        function decrement(collectionName, docId) {                                                                    //
            var key = collectionName + ":" + docId.valueOf();                                                          // 16
                                                                                                                       //
            if (this.heap[key]) {                                                                                      // 17
                this.heap[key] -= 1;                                                                                   // 18
                this.observer.onChange(collectionName, docId, this.heap[key]);                                         // 20
            }                                                                                                          // 21
        }                                                                                                              // 22
                                                                                                                       //
        return decrement;                                                                                              //
    }();                                                                                                               //
                                                                                                                       //
    return DocumentRefCounter;                                                                                         //
}();                                                                                                                   //
                                                                                                                       //
module.exportDefault(DocumentRefCounter);                                                                              // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"logging.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/reywood_publish-composite/lib/logging.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({                                                                                                        // 1
    debugLog: function () {                                                                                            // 1
        return debugLog;                                                                                               // 1
    },                                                                                                                 // 1
    enableDebugLogging: function () {                                                                                  // 1
        return enableDebugLogging;                                                                                     // 1
    }                                                                                                                  // 1
});                                                                                                                    // 1
/* eslint-disable no-console */var debugLoggingEnabled = false;                                                        // 1
                                                                                                                       //
function debugLog(source, message) {                                                                                   // 5
    if (!debugLoggingEnabled) {                                                                                        // 6
        return;                                                                                                        // 6
    }                                                                                                                  // 6
                                                                                                                       //
    var paddedSource = source;                                                                                         // 7
                                                                                                                       //
    while (paddedSource.length < 35) {                                                                                 // 8
        paddedSource += ' ';                                                                                           // 8
    }                                                                                                                  // 8
                                                                                                                       //
    console.log("[" + paddedSource + "] " + message);                                                                  // 9
}                                                                                                                      // 10
                                                                                                                       //
function enableDebugLogging() {                                                                                        // 12
    debugLoggingEnabled = true;                                                                                        // 13
}                                                                                                                      // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"publication.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/reywood_publish-composite/lib/publication.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                                //
                                                                                                                       //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                       //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
var Meteor = void 0;                                                                                                   // 1
module.watch(require("meteor/meteor"), {                                                                               // 1
    Meteor: function (v) {                                                                                             // 1
        Meteor = v;                                                                                                    // 1
    }                                                                                                                  // 1
}, 0);                                                                                                                 // 1
var Match = void 0,                                                                                                    // 1
    check = void 0;                                                                                                    // 1
module.watch(require("meteor/check"), {                                                                                // 1
    Match: function (v) {                                                                                              // 1
        Match = v;                                                                                                     // 1
    },                                                                                                                 // 1
    check: function (v) {                                                                                              // 1
        check = v;                                                                                                     // 1
    }                                                                                                                  // 1
}, 1);                                                                                                                 // 1
                                                                                                                       //
var _ = void 0;                                                                                                        // 1
                                                                                                                       //
module.watch(require("meteor/underscore"), {                                                                           // 1
    _: function (v) {                                                                                                  // 1
        _ = v;                                                                                                         // 1
    }                                                                                                                  // 1
}, 2);                                                                                                                 // 1
var debugLog = void 0;                                                                                                 // 1
module.watch(require("./logging"), {                                                                                   // 1
    debugLog: function (v) {                                                                                           // 1
        debugLog = v;                                                                                                  // 1
    }                                                                                                                  // 1
}, 3);                                                                                                                 // 1
var PublishedDocumentList = void 0;                                                                                    // 1
module.watch(require("./published_document_list"), {                                                                   // 1
    "default": function (v) {                                                                                          // 1
        PublishedDocumentList = v;                                                                                     // 1
    }                                                                                                                  // 1
}, 4);                                                                                                                 // 1
                                                                                                                       //
var Publication = function () {                                                                                        //
    function Publication(subscription, options, args) {                                                                // 10
        (0, _classCallCheck3.default)(this, Publication);                                                              // 10
        check(options, {                                                                                               // 11
            find: Function,                                                                                            // 12
            children: Match.Optional([Object]),                                                                        // 13
            collectionName: Match.Optional(String)                                                                     // 14
        });                                                                                                            // 11
        this.subscription = subscription;                                                                              // 17
        this.options = options;                                                                                        // 18
        this.args = args || [];                                                                                        // 19
        this.childrenOptions = options.children || [];                                                                 // 20
        this.publishedDocs = new PublishedDocumentList();                                                              // 21
        this.collectionName = options.collectionName;                                                                  // 22
    }                                                                                                                  // 23
                                                                                                                       //
    Publication.prototype.publish = function () {                                                                      //
        function publish() {                                                                                           //
            var _this = this;                                                                                          // 25
                                                                                                                       //
            this.cursor = this._getCursor();                                                                           // 26
                                                                                                                       //
            if (!this.cursor) {                                                                                        // 27
                return;                                                                                                // 27
            }                                                                                                          // 27
                                                                                                                       //
            var collectionName = this._getCollectionName(); // Use Meteor.bindEnvironment to make sure the callbacks are run with the same
            // environmentVariables as when publishing the "parent".                                                   // 32
            // It's only needed when publish is being recursively run.                                                 // 33
                                                                                                                       //
                                                                                                                       //
            this.observeHandle = this.cursor.observe({                                                                 // 34
                added: Meteor.bindEnvironment(function (doc) {                                                         // 35
                    var alreadyPublished = _this.publishedDocs.has(doc._id);                                           // 36
                                                                                                                       //
                    if (alreadyPublished) {                                                                            // 38
                        debugLog('Publication.observeHandle.added', collectionName + ":" + doc._id + " already published");
                                                                                                                       //
                        _this.publishedDocs.unflagForRemoval(doc._id);                                                 // 40
                                                                                                                       //
                        _this._republishChildrenOf(doc);                                                               // 41
                                                                                                                       //
                        _this.subscription.changed(collectionName, doc._id, doc);                                      // 42
                    } else {                                                                                           // 43
                        _this.publishedDocs.add(collectionName, doc._id);                                              // 44
                                                                                                                       //
                        _this._publishChildrenOf(doc);                                                                 // 45
                                                                                                                       //
                        _this.subscription.added(collectionName, doc);                                                 // 46
                    }                                                                                                  // 47
                }),                                                                                                    // 48
                changed: Meteor.bindEnvironment(function (newDoc) {                                                    // 49
                    debugLog('Publication.observeHandle.changed', collectionName + ":" + newDoc._id);                  // 50
                                                                                                                       //
                    _this._republishChildrenOf(newDoc);                                                                // 51
                }),                                                                                                    // 52
                removed: function (doc) {                                                                              // 53
                    debugLog('Publication.observeHandle.removed', collectionName + ":" + doc._id);                     // 54
                                                                                                                       //
                    _this._removeDoc(collectionName, doc._id);                                                         // 55
                }                                                                                                      // 56
            });                                                                                                        // 34
            this.observeChangesHandle = this.cursor.observeChanges({                                                   // 59
                changed: function (id, fields) {                                                                       // 60
                    debugLog('Publication.observeChangesHandle.changed', collectionName + ":" + id);                   // 61
                                                                                                                       //
                    _this.subscription.changed(collectionName, id, fields);                                            // 62
                }                                                                                                      // 63
            });                                                                                                        // 59
        }                                                                                                              // 65
                                                                                                                       //
        return publish;                                                                                                //
    }();                                                                                                               //
                                                                                                                       //
    Publication.prototype.unpublish = function () {                                                                    //
        function unpublish() {                                                                                         //
            debugLog('Publication.unpublish', this._getCollectionName());                                              // 68
                                                                                                                       //
            this._stopObservingCursor();                                                                               // 69
                                                                                                                       //
            this._unpublishAllDocuments();                                                                             // 70
        }                                                                                                              // 71
                                                                                                                       //
        return unpublish;                                                                                              //
    }();                                                                                                               //
                                                                                                                       //
    Publication.prototype._republish = function () {                                                                   //
        function _republish() {                                                                                        //
            this._stopObservingCursor();                                                                               // 74
                                                                                                                       //
            this.publishedDocs.flagAllForRemoval();                                                                    // 76
            debugLog('Publication._republish', 'run .publish again');                                                  // 78
            this.publish();                                                                                            // 79
            debugLog('Publication._republish', 'unpublish docs from old cursor');                                      // 81
                                                                                                                       //
            this._removeFlaggedDocs();                                                                                 // 82
        }                                                                                                              // 83
                                                                                                                       //
        return _republish;                                                                                             //
    }();                                                                                                               //
                                                                                                                       //
    Publication.prototype._getCursor = function () {                                                                   //
        function _getCursor() {                                                                                        //
            return this.options.find.apply(this.subscription.meteorSub, this.args);                                    // 86
        }                                                                                                              // 87
                                                                                                                       //
        return _getCursor;                                                                                             //
    }();                                                                                                               //
                                                                                                                       //
    Publication.prototype._getCollectionName = function () {                                                           //
        function _getCollectionName() {                                                                                //
            return this.collectionName || this.cursor && this.cursor._getCollectionName();                             // 90
        }                                                                                                              // 91
                                                                                                                       //
        return _getCollectionName;                                                                                     //
    }();                                                                                                               //
                                                                                                                       //
    Publication.prototype._publishChildrenOf = function () {                                                           //
        function _publishChildrenOf(doc) {                                                                             //
            _.each(this.childrenOptions, function () {                                                                 // 94
                function createChildPublication(options) {                                                             // 94
                    var pub = new Publication(this.subscription, options, [doc].concat(this.args));                    // 95
                    this.publishedDocs.addChildPub(doc._id, pub);                                                      // 96
                    pub.publish();                                                                                     // 97
                }                                                                                                      // 98
                                                                                                                       //
                return createChildPublication;                                                                         // 94
            }(), this);                                                                                                // 94
        }                                                                                                              // 99
                                                                                                                       //
        return _publishChildrenOf;                                                                                     //
    }();                                                                                                               //
                                                                                                                       //
    Publication.prototype._republishChildrenOf = function () {                                                         //
        function _republishChildrenOf(doc) {                                                                           //
            this.publishedDocs.eachChildPub(doc._id, function (publication) {                                          // 102
                publication.args[0] = doc;                                                                             // 103
                                                                                                                       //
                publication._republish();                                                                              // 104
            });                                                                                                        // 105
        }                                                                                                              // 106
                                                                                                                       //
        return _republishChildrenOf;                                                                                   //
    }();                                                                                                               //
                                                                                                                       //
    Publication.prototype._unpublishAllDocuments = function () {                                                       //
        function _unpublishAllDocuments() {                                                                            //
            var _this2 = this;                                                                                         // 108
                                                                                                                       //
            this.publishedDocs.eachDocument(function (doc) {                                                           // 109
                _this2._removeDoc(doc.collectionName, doc.docId);                                                      // 110
            }, this);                                                                                                  // 111
        }                                                                                                              // 112
                                                                                                                       //
        return _unpublishAllDocuments;                                                                                 //
    }();                                                                                                               //
                                                                                                                       //
    Publication.prototype._stopObservingCursor = function () {                                                         //
        function _stopObservingCursor() {                                                                              //
            debugLog('Publication._stopObservingCursor', 'stop observing cursor');                                     // 115
                                                                                                                       //
            if (this.observeHandle) {                                                                                  // 117
                this.observeHandle.stop();                                                                             // 118
                delete this.observeHandle;                                                                             // 119
            }                                                                                                          // 120
                                                                                                                       //
            if (this.observeChangesHandle) {                                                                           // 122
                this.observeChangesHandle.stop();                                                                      // 123
                delete this.observeChangesHandle;                                                                      // 124
            }                                                                                                          // 125
        }                                                                                                              // 126
                                                                                                                       //
        return _stopObservingCursor;                                                                                   //
    }();                                                                                                               //
                                                                                                                       //
    Publication.prototype._removeFlaggedDocs = function () {                                                           //
        function _removeFlaggedDocs() {                                                                                //
            var _this3 = this;                                                                                         // 128
                                                                                                                       //
            this.publishedDocs.eachDocument(function (doc) {                                                           // 129
                if (doc.isFlaggedForRemoval()) {                                                                       // 130
                    _this3._removeDoc(doc.collectionName, doc.docId);                                                  // 131
                }                                                                                                      // 132
            }, this);                                                                                                  // 133
        }                                                                                                              // 134
                                                                                                                       //
        return _removeFlaggedDocs;                                                                                     //
    }();                                                                                                               //
                                                                                                                       //
    Publication.prototype._removeDoc = function () {                                                                   //
        function _removeDoc(collectionName, docId) {                                                                   //
            this.subscription.removed(collectionName, docId);                                                          // 137
                                                                                                                       //
            this._unpublishChildrenOf(docId);                                                                          // 138
                                                                                                                       //
            this.publishedDocs.remove(docId);                                                                          // 139
        }                                                                                                              // 140
                                                                                                                       //
        return _removeDoc;                                                                                             //
    }();                                                                                                               //
                                                                                                                       //
    Publication.prototype._unpublishChildrenOf = function () {                                                         //
        function _unpublishChildrenOf(docId) {                                                                         //
            debugLog('Publication._unpublishChildrenOf', "unpublishing children of " + this._getCollectionName() + ":" + docId);
            this.publishedDocs.eachChildPub(docId, function (publication) {                                            // 145
                publication.unpublish();                                                                               // 146
            });                                                                                                        // 147
        }                                                                                                              // 148
                                                                                                                       //
        return _unpublishChildrenOf;                                                                                   //
    }();                                                                                                               //
                                                                                                                       //
    return Publication;                                                                                                //
}();                                                                                                                   //
                                                                                                                       //
module.exportDefault(Publication);                                                                                     // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"subscription.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/reywood_publish-composite/lib/subscription.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                                //
                                                                                                                       //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                       //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
var _ = void 0;                                                                                                        // 1
                                                                                                                       //
module.watch(require("meteor/underscore"), {                                                                           // 1
    _: function (v) {                                                                                                  // 1
        _ = v;                                                                                                         // 1
    }                                                                                                                  // 1
}, 0);                                                                                                                 // 1
var DocumentRefCounter = void 0;                                                                                       // 1
module.watch(require("./doc_ref_counter"), {                                                                           // 1
    "default": function (v) {                                                                                          // 1
        DocumentRefCounter = v;                                                                                        // 1
    }                                                                                                                  // 1
}, 1);                                                                                                                 // 1
var debugLog = void 0;                                                                                                 // 1
module.watch(require("./logging"), {                                                                                   // 1
    debugLog: function (v) {                                                                                           // 1
        debugLog = v;                                                                                                  // 1
    }                                                                                                                  // 1
}, 2);                                                                                                                 // 1
                                                                                                                       //
var Subscription = function () {                                                                                       //
    function Subscription(meteorSub) {                                                                                 // 8
        var _this = this;                                                                                              // 8
                                                                                                                       //
        (0, _classCallCheck3.default)(this, Subscription);                                                             // 8
        this.meteorSub = meteorSub;                                                                                    // 9
        this.docHash = {};                                                                                             // 10
        this.refCounter = new DocumentRefCounter({                                                                     // 11
            onChange: function (collectionName, docId, refCount) {                                                     // 12
                debugLog('Subscription.refCounter.onChange', collectionName + ":" + docId.valueOf() + " " + refCount);
                                                                                                                       //
                if (refCount <= 0) {                                                                                   // 14
                    meteorSub.removed(collectionName, docId);                                                          // 15
                                                                                                                       //
                    _this._removeDocHash(collectionName, docId);                                                       // 16
                }                                                                                                      // 17
            }                                                                                                          // 18
        });                                                                                                            // 11
    }                                                                                                                  // 20
                                                                                                                       //
    Subscription.prototype.added = function () {                                                                       //
        function added(collectionName, doc) {                                                                          //
            this.refCounter.increment(collectionName, doc._id);                                                        // 23
                                                                                                                       //
            if (this._hasDocChanged(collectionName, doc._id, doc)) {                                                   // 25
                debugLog('Subscription.added', collectionName + ":" + doc._id);                                        // 26
                this.meteorSub.added(collectionName, doc._id, doc);                                                    // 27
                                                                                                                       //
                this._addDocHash(collectionName, doc);                                                                 // 28
            }                                                                                                          // 29
        }                                                                                                              // 30
                                                                                                                       //
        return added;                                                                                                  //
    }();                                                                                                               //
                                                                                                                       //
    Subscription.prototype.changed = function () {                                                                     //
        function changed(collectionName, id, changes) {                                                                //
            if (this._shouldSendChanges(collectionName, id, changes)) {                                                // 33
                debugLog('Subscription.changed', collectionName + ":" + id);                                           // 34
                this.meteorSub.changed(collectionName, id, changes);                                                   // 35
                                                                                                                       //
                this._updateDocHash(collectionName, id, changes);                                                      // 36
            }                                                                                                          // 37
        }                                                                                                              // 38
                                                                                                                       //
        return changed;                                                                                                //
    }();                                                                                                               //
                                                                                                                       //
    Subscription.prototype.removed = function () {                                                                     //
        function removed(collectionName, id) {                                                                         //
            debugLog('Subscription.removed', collectionName + ":" + id.valueOf());                                     // 41
            this.refCounter.decrement(collectionName, id);                                                             // 42
        }                                                                                                              // 43
                                                                                                                       //
        return removed;                                                                                                //
    }();                                                                                                               //
                                                                                                                       //
    Subscription.prototype._addDocHash = function () {                                                                 //
        function _addDocHash(collectionName, doc) {                                                                    //
            this.docHash[buildHashKey(collectionName, doc._id)] = doc;                                                 // 46
        }                                                                                                              // 47
                                                                                                                       //
        return _addDocHash;                                                                                            //
    }();                                                                                                               //
                                                                                                                       //
    Subscription.prototype._updateDocHash = function () {                                                              //
        function _updateDocHash(collectionName, id, changes) {                                                         //
            var key = buildHashKey(collectionName, id);                                                                // 50
            var existingDoc = this.docHash[key] || {};                                                                 // 51
            this.docHash[key] = _.extend(existingDoc, changes);                                                        // 52
        }                                                                                                              // 53
                                                                                                                       //
        return _updateDocHash;                                                                                         //
    }();                                                                                                               //
                                                                                                                       //
    Subscription.prototype._shouldSendChanges = function () {                                                          //
        function _shouldSendChanges(collectionName, id, changes) {                                                     //
            return this._isDocPublished(collectionName, id) && this._hasDocChanged(collectionName, id, changes);       // 56
        }                                                                                                              // 58
                                                                                                                       //
        return _shouldSendChanges;                                                                                     //
    }();                                                                                                               //
                                                                                                                       //
    Subscription.prototype._isDocPublished = function () {                                                             //
        function _isDocPublished(collectionName, id) {                                                                 //
            var key = buildHashKey(collectionName, id);                                                                // 61
            return !!this.docHash[key];                                                                                // 62
        }                                                                                                              // 63
                                                                                                                       //
        return _isDocPublished;                                                                                        //
    }();                                                                                                               //
                                                                                                                       //
    Subscription.prototype._hasDocChanged = function () {                                                              //
        function _hasDocChanged(collectionName, id, doc) {                                                             //
            var existingDoc = this.docHash[buildHashKey(collectionName, id)];                                          // 66
                                                                                                                       //
            if (!existingDoc) {                                                                                        // 68
                return true;                                                                                           // 68
            }                                                                                                          // 68
                                                                                                                       //
            return _.any(_.keys(doc), function (key) {                                                                 // 70
                return !_.isEqual(doc[key], existingDoc[key]);                                                         // 70
            });                                                                                                        // 70
        }                                                                                                              // 71
                                                                                                                       //
        return _hasDocChanged;                                                                                         //
    }();                                                                                                               //
                                                                                                                       //
    Subscription.prototype._removeDocHash = function () {                                                              //
        function _removeDocHash(collectionName, id) {                                                                  //
            var key = buildHashKey(collectionName, id);                                                                // 74
            delete this.docHash[key];                                                                                  // 75
        }                                                                                                              // 76
                                                                                                                       //
        return _removeDocHash;                                                                                         //
    }();                                                                                                               //
                                                                                                                       //
    return Subscription;                                                                                               //
}();                                                                                                                   //
                                                                                                                       //
function buildHashKey(collectionName, id) {                                                                            // 79
    return collectionName + "::" + id.valueOf();                                                                       // 80
}                                                                                                                      // 81
                                                                                                                       //
module.exportDefault(Subscription);                                                                                    // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"published_document.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/reywood_publish-composite/lib/published_document.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                                //
                                                                                                                       //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                       //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
var PublishedDocument = function () {                                                                                  //
    function PublishedDocument(collectionName, docId) {                                                                // 2
        (0, _classCallCheck3.default)(this, PublishedDocument);                                                        // 2
        this.collectionName = collectionName;                                                                          // 3
        this.docId = docId;                                                                                            // 4
        this.childPublications = [];                                                                                   // 5
        this._isFlaggedForRemoval = false;                                                                             // 6
    }                                                                                                                  // 7
                                                                                                                       //
    PublishedDocument.prototype.addChildPub = function () {                                                            //
        function addChildPub(childPublication) {                                                                       //
            this.childPublications.push(childPublication);                                                             // 10
        }                                                                                                              // 11
                                                                                                                       //
        return addChildPub;                                                                                            //
    }();                                                                                                               //
                                                                                                                       //
    PublishedDocument.prototype.eachChildPub = function () {                                                           //
        function eachChildPub(callback) {                                                                              //
            this.childPublications.forEach(callback);                                                                  // 14
        }                                                                                                              // 15
                                                                                                                       //
        return eachChildPub;                                                                                           //
    }();                                                                                                               //
                                                                                                                       //
    PublishedDocument.prototype.isFlaggedForRemoval = function () {                                                    //
        function isFlaggedForRemoval() {                                                                               //
            return this._isFlaggedForRemoval;                                                                          // 18
        }                                                                                                              // 19
                                                                                                                       //
        return isFlaggedForRemoval;                                                                                    //
    }();                                                                                                               //
                                                                                                                       //
    PublishedDocument.prototype.unflagForRemoval = function () {                                                       //
        function unflagForRemoval() {                                                                                  //
            this._isFlaggedForRemoval = false;                                                                         // 22
        }                                                                                                              // 23
                                                                                                                       //
        return unflagForRemoval;                                                                                       //
    }();                                                                                                               //
                                                                                                                       //
    PublishedDocument.prototype.flagForRemoval = function () {                                                         //
        function flagForRemoval() {                                                                                    //
            this._isFlaggedForRemoval = true;                                                                          // 26
        }                                                                                                              // 27
                                                                                                                       //
        return flagForRemoval;                                                                                         //
    }();                                                                                                               //
                                                                                                                       //
    return PublishedDocument;                                                                                          //
}();                                                                                                                   //
                                                                                                                       //
module.exportDefault(PublishedDocument);                                                                               // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"published_document_list.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/reywood_publish-composite/lib/published_document_list.js                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                                //
                                                                                                                       //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                       //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
var _ = void 0;                                                                                                        // 1
                                                                                                                       //
module.watch(require("meteor/underscore"), {                                                                           // 1
    _: function (v) {                                                                                                  // 1
        _ = v;                                                                                                         // 1
    }                                                                                                                  // 1
}, 0);                                                                                                                 // 1
var PublishedDocument = void 0;                                                                                        // 1
module.watch(require("./published_document"), {                                                                        // 1
    "default": function (v) {                                                                                          // 1
        PublishedDocument = v;                                                                                         // 1
    }                                                                                                                  // 1
}, 1);                                                                                                                 // 1
                                                                                                                       //
var PublishedDocumentList = function () {                                                                              //
    function PublishedDocumentList() {                                                                                 // 7
        (0, _classCallCheck3.default)(this, PublishedDocumentList);                                                    // 7
        this.documents = {};                                                                                           // 8
    }                                                                                                                  // 9
                                                                                                                       //
    PublishedDocumentList.prototype.add = function () {                                                                //
        function add(collectionName, docId) {                                                                          //
            var key = valueOfId(docId);                                                                                // 12
                                                                                                                       //
            if (!this.documents[key]) {                                                                                // 14
                this.documents[key] = new PublishedDocument(collectionName, docId);                                    // 15
            }                                                                                                          // 16
        }                                                                                                              // 17
                                                                                                                       //
        return add;                                                                                                    //
    }();                                                                                                               //
                                                                                                                       //
    PublishedDocumentList.prototype.addChildPub = function () {                                                        //
        function addChildPub(docId, publication) {                                                                     //
            if (!publication) {                                                                                        // 20
                return;                                                                                                // 20
            }                                                                                                          // 20
                                                                                                                       //
            var key = valueOfId(docId);                                                                                // 22
            var doc = this.documents[key];                                                                             // 23
                                                                                                                       //
            if (typeof doc === 'undefined') {                                                                          // 25
                throw new Error("Doc not found in list: " + key);                                                      // 26
            }                                                                                                          // 27
                                                                                                                       //
            this.documents[key].addChildPub(publication);                                                              // 29
        }                                                                                                              // 30
                                                                                                                       //
        return addChildPub;                                                                                            //
    }();                                                                                                               //
                                                                                                                       //
    PublishedDocumentList.prototype.get = function () {                                                                //
        function get(docId) {                                                                                          //
            var key = valueOfId(docId);                                                                                // 33
            return this.documents[key];                                                                                // 34
        }                                                                                                              // 35
                                                                                                                       //
        return get;                                                                                                    //
    }();                                                                                                               //
                                                                                                                       //
    PublishedDocumentList.prototype.remove = function () {                                                             //
        function remove(docId) {                                                                                       //
            var key = valueOfId(docId);                                                                                // 38
            delete this.documents[key];                                                                                // 39
        }                                                                                                              // 40
                                                                                                                       //
        return remove;                                                                                                 //
    }();                                                                                                               //
                                                                                                                       //
    PublishedDocumentList.prototype.has = function () {                                                                //
        function has(docId) {                                                                                          //
            return !!this.get(docId);                                                                                  // 43
        }                                                                                                              // 44
                                                                                                                       //
        return has;                                                                                                    //
    }();                                                                                                               //
                                                                                                                       //
    PublishedDocumentList.prototype.eachDocument = function () {                                                       //
        function eachDocument(callback, context) {                                                                     //
            _.each(this.documents, function () {                                                                       // 47
                function execCallbackOnDoc(doc) {                                                                      // 47
                    callback.call(this, doc);                                                                          // 48
                }                                                                                                      // 49
                                                                                                                       //
                return execCallbackOnDoc;                                                                              // 47
            }(), context || this);                                                                                     // 47
        }                                                                                                              // 50
                                                                                                                       //
        return eachDocument;                                                                                           //
    }();                                                                                                               //
                                                                                                                       //
    PublishedDocumentList.prototype.eachChildPub = function () {                                                       //
        function eachChildPub(docId, callback) {                                                                       //
            var doc = this.get(docId);                                                                                 // 53
                                                                                                                       //
            if (doc) {                                                                                                 // 55
                doc.eachChildPub(callback);                                                                            // 56
            }                                                                                                          // 57
        }                                                                                                              // 58
                                                                                                                       //
        return eachChildPub;                                                                                           //
    }();                                                                                                               //
                                                                                                                       //
    PublishedDocumentList.prototype.getIds = function () {                                                             //
        function getIds() {                                                                                            //
            var docIds = [];                                                                                           // 61
            this.eachDocument(function (doc) {                                                                         // 63
                docIds.push(doc.docId);                                                                                // 64
            });                                                                                                        // 65
            return docIds;                                                                                             // 67
        }                                                                                                              // 68
                                                                                                                       //
        return getIds;                                                                                                 //
    }();                                                                                                               //
                                                                                                                       //
    PublishedDocumentList.prototype.unflagForRemoval = function () {                                                   //
        function unflagForRemoval(docId) {                                                                             //
            var doc = this.get(docId);                                                                                 // 71
                                                                                                                       //
            if (doc) {                                                                                                 // 73
                doc.unflagForRemoval();                                                                                // 74
            }                                                                                                          // 75
        }                                                                                                              // 76
                                                                                                                       //
        return unflagForRemoval;                                                                                       //
    }();                                                                                                               //
                                                                                                                       //
    PublishedDocumentList.prototype.flagAllForRemoval = function () {                                                  //
        function flagAllForRemoval() {                                                                                 //
            this.eachDocument(function (doc) {                                                                         // 79
                doc.flagForRemoval();                                                                                  // 80
            });                                                                                                        // 81
        }                                                                                                              // 82
                                                                                                                       //
        return flagAllForRemoval;                                                                                      //
    }();                                                                                                               //
                                                                                                                       //
    return PublishedDocumentList;                                                                                      //
}();                                                                                                                   //
                                                                                                                       //
function valueOfId(docId) {                                                                                            // 85
    if (docId === null) {                                                                                              // 86
        throw new Error('Document ID is null');                                                                        // 87
    }                                                                                                                  // 88
                                                                                                                       //
    if (typeof docId === 'undefined') {                                                                                // 89
        throw new Error('Document ID is undefined');                                                                   // 90
    }                                                                                                                  // 91
                                                                                                                       //
    return docId.valueOf();                                                                                            // 92
}                                                                                                                      // 93
                                                                                                                       //
module.exportDefault(PublishedDocumentList);                                                                           // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
var exports = require("./node_modules/meteor/reywood:publish-composite/lib/publish_composite.js");
require("./node_modules/meteor/reywood:publish-composite/lib/doc_ref_counter.js");
require("./node_modules/meteor/reywood:publish-composite/lib/logging.js");
require("./node_modules/meteor/reywood:publish-composite/lib/publication.js");
require("./node_modules/meteor/reywood:publish-composite/lib/subscription.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['reywood:publish-composite'] = exports, {
  enableDebugLogging: enableDebugLogging,
  publishComposite: publishComposite
});

})();

//# sourceMappingURL=reywood_publish-composite.js.map
