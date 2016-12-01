var fs = require('fs');
var bodyParser = require('body-parser');
var multiparty = require('multiparty');
var langParser = require('accept-language-parser');

const SPOTCONST = require('../../lib/constants');

var restApiRoot = Meteor.settings.private.restapi;

const getMatchedLanguage = (request) => {
  var selectedLanguage = 'ko';

  var supportLanguageList = _.keys(TAPi18n.getLanguages());

  if (!request.headers['accept-language']) {
    return selectedLanguage;
  }

  var acceptLanguageList = langParser.parse(request.headers['accept-language']);
  var acceptLanguage = _.find(acceptLanguageList, language => {
    return _.find(supportLanguageList, supportLanguage => {
      if (language.region) {
        return supportLanguage === language.code + '-' + language.region;
      } else {
        return supportLanguage === language.code;
      }
    });
  });

  if (acceptLanguage) {
    if (acceptLanguage.region) {
      selectedLanguage = acceptLanguage.code + '-' + acceptLanguage.region;
    } else {
      selectedLanguage = acceptLanguage.code;
    }
  }

  return selectedLanguage;
};

const getRequestPreflight = (request, response, params, allowedMethod, onlyAuthenticated, userKey) => {
  var result = {};
  var data = {};

  var selectedLanguage = getMatchedLanguage(request);

  if (request.method.toLowerCase() === 'options') {
    data = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: ''
    };

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Application-ID');
    response.setHeader('Access-Control-Allow-Methods', 'DELETE, GET, OPTIONS, POST, PUT');
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;
    response.end(JSON.stringify(data));

    result.passed = false;
  } else if (!(allowedMethod.toLowerCase() === request.method.toLowerCase() || _.include(allowedMethod.toLowerCase(), request.method.toLowerCase()))) {
    data = {
      status: false,
      code: SPOTCONST.ERROR_NOT_SUPPORTED_METHOD,
      message: TAPi18n.__('error.common.not_supported_method', {}, selectedLanguage)
    };

    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 400;
    response.end(JSON.stringify(data));

    result.passed = false;
  } else if (onlyAuthenticated) {
    if (!userKey) {
      var xuserid = request.headers['x-user-id'];
      var xauthtoken = request.headers['x-auth-token'];

      if (!xuserid) {
        xuserid = params.query['x-user-id'];
      }

      if (!xauthtoken) {
        xauthtoken = params.query['x-auth-token'];
      }

      if (_.isEmpty(xuserid) || _.isEmpty(xauthtoken)) {
        data = {
          status: false,
          code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
          message: TAPi18n.__('error.account.failed_authentication', {}, selectedLanguage)
        };

        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 403;
        response.end(JSON.stringify(data));

        result.passed = false;
      }

      var user = Meteor.users.findOne({
        "_id": xuserid,
        $or: [{
          "services.resume.loginTokens.hashedToken": Accounts._hashLoginToken(xauthtoken)
        }, {
          "services.resume.loginTokens.hashedToken": xauthtoken
        }]
      });

      if (!user) {
        data = {
          status: false,
          code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
          message: TAPi18n.__('error.account.failed_authentication', {}, selectedLanguage)
        };

        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 403;
        response.end(JSON.stringify(data));

        result.passed = false;
      } else {
        result.passed = true;
      }

      result.user = user;
    } else {
      var user = Meteor.users.findOne({
        "_id": userKey
      });

      result.user = user;
    }
  } else {
    result.passed = true;
  }

  result.language = selectedLanguage;

  return result;
};

const multipartyOptions = {
  autoFiles: true,
  maxFilesSize: Meteor.settings.private.files.maxSize,
  uploadDir: Meteor.settings.private.files.upload
};

var RESTAPI = Picker.filter(function(request, response) {
  // s : in underscorestring:underscore.string package

  return s(request.url).startsWith(restApiRoot);
});

RESTAPI.middleware(bodyParser.json());
RESTAPI.middleware(bodyParser.urlencoded({
  extended: true
}));

RESTAPI.route(restApiRoot + '0.1/version', function(params, request, response, next) {
  var checkPreflight = getRequestPreflight(request, response, params, 'GET', false, this.userId);
  if (!checkPreflight.passed) {
    return;
  }

  var data = {
    status: true,
    code: SPOTCONST.ERROR_SUCCEED,
    message: '',
    data: {
      versions: {
        api: '0.1',
        spot27: '0.0.1'
      }
    }
  };

  response.setHeader('Content-Type', 'application/json');
  response.statusCode = 200;
  response.end(JSON.stringify(data));
});

RESTAPI.route(restApiRoot + '0.1/join', function(params, request, response, next) {
  // The only fields that will be recognized in the request body when creating a new user are htmls, username, password, and profile.
  // http://docs.meteor.com/api/passwords.html#Accounts-createUser
  //
  // username
  //   String
  //   A unique name for this user.
  // htmls
  //   String
  //   The user's htmls address.
  // password
  //   String
  //   The user's password. This is not sent in plain text over the wire.
  // profile
  //   Object
  //   The user's profile, typically including the name field.
  //
  // Sample Data : Meteor Standard
  // --------------------------------------------------
  // {
  //   "username": "user01",
  //   "htmls": "user01@abc.xyz",
  //   "password": {
  //     "digest": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
  //     "algorithm": "sha-256"
  //   },
  //   "profile": {
  //     "firstname": "user",
  //     "middlename": "",
  //     "lastname": "last",
  //     "countrytelephonecode": "82",
  //     "phonenumber": "01012340001"
  //   }
  // }
  // -------------------------------------------{error: 400, message: 'The request is not supported.'}-------

  var checkPreflight = getRequestPreflight(request, response, params, 'POST', false, this.userId);
  if (!checkPreflight.passed) {
    return;
  }

  var userData = request.body.data;

  check(userData, Object);

  var user = Meteor.users.findOne({
    "emails.address": userData.email
  });

  if (typeof user !== "undefined") {
    var data = {
      status: false,
      code: SPOTCONST.ERROR_EXIST_EMAIL_ADDRESS,
      message: TAPi18n.__('error.mail.exist_email_address', {}, checkPreflight.language)
    };

    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 400;
    response.end(JSON.stringify(data));

    return;
  }

  var userId = Accounts.createUser(userData);

  if (!userId) {
    var data = {
      status: false,
      code: SPOTCONST.ERROR_FAILED_CREATE_USER,
      message: TAPi18n.__('error.user.failed_create_user', {}, checkPreflight.language)
    };

    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 400;
    response.end(JSON.stringify(data));

    return;
  }

  var data = {
    status: true,
    code: SPOTCONST.ERROR_SUCCEED,
    message: '',
    data: {
      userId: userId
    }
  };

  response.setHeader('Content-Type', 'application/json');
  response.statusCode = 200;
  response.end(JSON.stringify(data));
});

RESTAPI.route(restApiRoot + '0.1/login', function(params, request, response, next) {
  var checkPreflight = getRequestPreflight(request, response, params, 'POST', false, this.userId);
  if (!checkPreflight.passed) {
    return;
  }

  var reqBody = request.body;

  check(reqBody, Object);

  var username = reqBody.username;
  var digest = reqBody.digest;

  var authenticatingUser = Meteor.users.findOne({
    'username': username
  });

  if (!authenticatingUser) {
    var data = {
      status: false,
      code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
      message: TAPi18n.__('error.account.failed_authentication', {}, checkPreflight.language)
    };

    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 401;
    response.end(JSON.stringify(data));

    return;
  }

  if (!(authenticatingUser.services != null ? authenticatingUser.services.password : void 0)) {
    var data = {
      status: false,
      code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
      message: TAPi18n.__('error.account.failed_authentication', {}, checkPreflight.language)
    };

    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 401;
    response.end(JSON.stringify(data));

    return;
  }

  var authToken, hashedToken, passwordVerification;

  var password = {
    digest: digest,
    algorithm: 'sha-256'
  };
  passwordVerification = Accounts._checkPassword(authenticatingUser, password);

  if (passwordVerification.error) {
    var data = {
      status: false,
      code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
      message: TAPi18n.__('error.account.failed_authentication', {}, checkPreflight.language)
    };

    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 401;
    response.end(JSON.stringify(data));

    return;
  }

  authToken = Accounts._generateStampedLoginToken();
  hashedToken = Accounts._hashLoginToken(authToken.token);

  Accounts._insertHashedLoginToken(authenticatingUser._id, {
    hashedToken: hashedToken
  });

  var data = {
    status: true,
    code: SPOTCONST.ERROR_SUCCEED,
    message: '',
    data: {
      authToken: authToken.token,
      userId: authenticatingUser._id
    }
  };

  response.setHeader('Content-Type', 'application/json');
  response.statusCode = 200;
  response.end(JSON.stringify(data));
});

RESTAPI.route(restApiRoot + '0.1/logout', function(params, request, response, next) {
  var checkPreflight = getRequestPreflight(request, response, params, 'GET', true, this.userId);
  if (!checkPreflight.passed) {
    return;
  }

  try {
    Meteor.apply('logout');
  } catch (e) {}

  var data = {
    status: true,
    code: SPOTCONST.ERROR_SUCCEED,
    message: ''
  };

  response.setHeader('Content-Type', 'application/json');
  response.statusCode = 200;
  response.end(JSON.stringify(data));
});

RESTAPI.route(restApiRoot + '0.1/whoami', function(params, request, response, next) {
  var checkPreflight = getRequestPreflight(request, response, params, 'POST', true, this.userId);
  if (!checkPreflight.passed) {
    return;
  }

  var returnData = {};

  var user = checkPreflight.user;
  if (!user) {
    returnData = {
      status: false,
      code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
      message: TAPi18n.__('error.account.failed_authentication', {}, checkPreflight.language)
    };

    response.setHeader('content-type', 'application/json;charset=utf-8');
    response.end(JSON.stringify(returnData));
    return;
  }

  // ====================================================================================================

  returnData = {
    status: true,
    code: SPOTCONST.ERROR_SUCCEED,
    message: '',
    data: {
      userid: user.userid,
      email: user.emails[0].address
    }
  };

  response.setHeader('Content-Type', 'application/json');
  response.statusCode = 200;
  response.end(JSON.stringify(returnData));
});

RESTAPI.route(restApiRoot + '0.1/users/:userid/images', function(params, request, response, next) {
  var checkPreflight = getRequestPreflight(request, response, params, 'POST', true, this.userId);
  if (!checkPreflight.passed) {
    return;
  }

  // ====================================================================================================

  var returnData = {};

  var user = checkPreflight.user;
  if (!user) {
    returnData = {
      status: false,
      code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
      message: TAPi18n.__('error.account.failed_authentication', {}, checkPreflight.language)
    };

    response.setHeader('content-type', 'application/json;charset=utf-8');
    response.end(JSON.stringify(returnData));
    return;
  }

  // ====================================================================================================

  var fields = [];
  var filesOrigin = [];
  var filesThumb = [];

  var form = new multiparty.Form(multipartyOptions);

  form.on('close', Meteor.bindEnvironment(function(error, result) {
    var imageOrigin = filesOrigin[0];
    var imageThumb = filesThumb[0];

    if (filesOrigin.length == 0 || filesThumb.length == 0) {
      // returnData = {
      //   status: false,
      //   code: SPOTCONST.ERROR_INVALID_PARAMETERS,
      //   message: TAPi18n.__('error.common.invalid_parameters', {}, checkPreflight.language)
      // };

      var beforeImageOriginId = user.photo.origin;
      var beforeImageThumbId = user.photo.thumb;

      var nonce = Meteor.users.update({
        _id: user._id
      }, {
        $set: {
          'photo.origin': '',
          'photo.thumb': '',
        }
      });

      if (nonce > 0) {
        var oldImageInfo = ProfileFiles.find({
          $or: [{
            _id: beforeImageOriginId
          }, {
            _id: beforeImageThumbId
          }]
        }, {
          path: 1
        }).fetch();

        _.each(oldImageInfo, function(oldImage) {
          try {
            fs.unlink(oldImage.path);
          } catch(e) {}

          ProfileFiles.remove({
            _id: oldImage._id
          });
        });

        returnData = {
          status: true,
          code: SPOTCONST.ERROR_SUCCEED,
          message: ''
        };
      } else {
        returnData = {
          status: false,
          code: SPOTCONST.ERROR_FAILED_UPDATE_USER_PROFILE,
          message: TAPi18n.__('error.user.failed_update_user_profile', {}, checkPreflight.language)
        };
      }
    } else {
      var beforeImageOriginId = user.photo.origin;
      var beforeImageThumbId = user.photo.thumb;

      var imageOriginId = ProfileFiles.insert({
        owner: user._id,
        path: imageOrigin.path,
        name: imageOrigin.originalFilename,
        size: imageOrigin.size
      });

      var imageThumbId = ProfileFiles.insert({
        owner: user._id,
        path: imageThumb.path,
        name: imageThumb.originalFilename,
        size: imageThumb.size
      });

      var nonce = Meteor.users.update({
        _id: user._id
      }, {
        $set: {
          'photo.origin': imageOriginId,
          'photo.thumb': imageThumbId,
        }
      });

      if (nonce > 0) {
        var oldImageInfo = ProfileFiles.find({
          $or: [{
            _id: beforeImageOriginId
          }, {
            _id: beforeImageThumbId
          }]
        }, {
          path: 1
        }).fetch();

        _.each(oldImageInfo, function(oldImage) {
          try {
            fs.unlink(oldImage.path);
          } catch(e) {}

          ProfileFiles.remove({
            _id: oldImage._id
          });
        });

        returnData = {
          status: true,
          code: SPOTCONST.ERROR_SUCCEED,
          message: '',
          data: {
            origin: imageOriginId,
            thumb: imageThumbId
          }
        };
      } else {
        try {
          fs.unlink(imageOrigin.path);
        } catch(e) {}

        try {
          fs.unlink(imageThumb.path);
        } catch(e) {}

        returnData = {
          status: false,
          code: SPOTCONST.ERROR_FAILED_UPDATE_USER_PROFILE,
          message: TAPi18n.__('error.user.failed_update_user_profile', {}, checkPreflight.language)
        };
      }
    }

    response.setHeader('content-type', 'application/json;charset=utf-8');
    response.end(JSON.stringify(returnData));
  }));

  form.on('field', function(name, value) {
    fields[name] = value;
  });

  form.on('file', function(name, file) {
    // --------------------------------------------------
    // file object
    // {
    //   "fieldName": "photofile",
    //   "originalFilename": "sunset-02.jpg",
    //   "path": "/opt/_meteor/uploaded/20R_lCkHKVi6aQhic6Dz5jzK.jpg",
    //   "headers": {
    //     "content-disposition": "form-data; name=\"photofile\"; filename=\"sunset-02.jpg\"",
    //     "content-type": "image/jpeg"
    //   },
    //   "size": 24581
    // }
    // --------------------------------------------------

    if (file.originalFilename === '') {
      try {
        fs.unlink(file.path);
      } catch(e) {}
    } else {
      var filename = s(file.path).strRightBack('/').value();

      if (file.fieldName === 'origin') {
        var originPath = Meteor.settings.private.files.profile.origin + '/' + filename;

        fs.rename(file.path, originPath, function(error) {});

        file.path = originPath;

        filesOrigin.push(file);
      } else if (file.fieldName === 'thumb') {
        var thumbPath = Meteor.settings.private.files.profile.thumb + '/' + filename;

        fs.rename(file.path, thumbPath, function(error) {});

        file.path = thumbPath;

        filesThumb.push(file);
      }
    }
  });

  // Parse req
  form.parse(request);
  // ====================================================================================================
});

RESTAPI.route(restApiRoot + '0.1/users/:userid/images/origin/:fileid', function(params, request, response, next) {
  var checkPreflight = getRequestPreflight(request, response, params, 'GET', true, this.userId);
  if (!checkPreflight.passed) {
    return;
  }

  // ====================================================================================================
  var filesInfo = ProfileFiles.findOne({
    _id: params.fileid
  }, {
    path: 1,
    name: 1
  });

  if (!filesInfo) {
    response.writeHead(404);
    response.end('File Not found.');
    return;
  }

  var fileData;
  try {
    fileData = fs.readFileSync(filesInfo.path);
  } catch (err) {
    response.writeHead(404);
    response.end('File Not found.');
    return;
  }

  var headers = {
    'Content-type': 'application/octet-stream',
    'Content-Disposition': 'attachment; filename=' + filesInfo.name
  };
  response.writeHead(200, headers);
  response.end(fileData);
  // ====================================================================================================
});

RESTAPI.route(restApiRoot + '0.1/users/:userid/images/thumb/:fileid', function(params, request, response, next) {
  var checkPreflight = getRequestPreflight(request, response, params, 'GET', true, this.userId);
  if (!checkPreflight.passed) {
    return;
  }

  // ====================================================================================================
  var filesInfo = ProfileFiles.findOne({
    _id: params.fileid
  }, {
    path: 1,
    name: 1
  });

  if (!filesInfo) {
    response.writeHead(404);
    response.end('File Not found.');
    return;
  }

  var fileData;
  try {
    fileData = fs.readFileSync(filesInfo.path);
  } catch (err) {
    response.writeHead(404);
    response.end('File Not found.');
    return;
  }

  var headers = {
    'Content-type': 'application/octet-stream',
    'Content-Disposition': 'attachment; filename=' + filesInfo.name
  };
  response.writeHead(200, headers);
  response.end(fileData);
  // ====================================================================================================
});

RESTAPI.route(restApiRoot + '0.1/chats/:chatid/files', function(params, request, response, next) {
  var checkPreflight = getRequestPreflight(request, response, params, 'POST', true, this.userId);
  if (!checkPreflight.passed) {
    return;
  }

  // ====================================================================================================

  var returnData = {};

  var user = checkPreflight.user;
  if (!user) {
    returnData = {
      status: false,
      code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
      message: TAPi18n.__('error.account.failed_authentication', {}, checkPreflight.language)
    };

    response.setHeader('content-type', 'application/json;charset=utf-8');
    response.end(JSON.stringify(returnData));
    return;
  }

  // ====================================================================================================

  var fields = [];
  var filesOrigin = [];
  var filesThumb = [];

  var form = new multiparty.Form(multipartyOptions);

  form.on('close', Meteor.bindEnvironment(function(error, result) {
    var chatId = fields['chatId'];
    var encrypted = fields['encrypted'];
    var imageKind = fields['imageKind'];
    var imageOrigin = filesOrigin[0];
    var imageThumb = filesThumb[0];

    if (filesOrigin.length == 0 || filesThumb.length == 0) {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, checkPreflight.language)
      };
    } else {
      var imageOriginId = ChatFiles.insert({
        chatId: chatId,
        owner: user._id,
        path: imageOrigin.path,
        name: imageOrigin.originalFilename,
        size: imageOrigin.size
      });

      var imageThumbId = ChatFiles.insert({
        chatId: chatId,
        owner: user._id,
        path: imageThumb.path,
        name: imageThumb.originalFilename,
        size: imageThumb.size
      });

      var chat = Chats.findOne({
        _id: chatId
      });

      if (chat) {
        var affectedRecords = Messages.insert({
          chatId: chatId,
          creator: user._id,
          encrypted: (encrypted.toLowerCase() == 'true'),
          file: {
            kind: imageKind,
            name: imageOrigin.originalFilename,
            size: imageOrigin.size,
            origin: imageOriginId,
            thumb: imageThumbId
          },
          messageType: 'image',
          status: 'normal',
          text: '',
          unreaders: _.difference(_.pluck(chat.members || [], 'userId'), user._id)
        });

        if (affectedRecords) {
          returnData = {
            status: true,
            code: SPOTCONST.ERROR_SUCCEED,
            message: '',
            data: {
              messageId: affectedRecords
            }
          };
        } else {
          returnData = {
            status: false,
            code: SPOTCONST.ERROR_FAILED_CREATE_CHAT_MESSAGE,
            message: TAPi18n.__('error.message.failed_create_chat_message', {}, checkPreflight.language)
          };

          try {
            fs.unlink(imageOrigin.path);
          } catch(e) {}

          try {
            fs.unlink(imageThumb.path);
          } catch(e) {}
        }
      } else {
        returnData = {
          status: false,
          code: SPOTCONST.ERROR_NOT_FOUND_CHAT_ROOM,
          message: TAPi18n.__('error.chat.not_found_chat_room', {}, checkPreflight.language)
        };

        try {
          fs.unlink(imageOrigin.path);
        } catch(e) {}

        try {
          fs.unlink(imageThumb.path);
        } catch(e) {}
      }
    }

    response.setHeader('content-type', 'application/json;charset=utf-8');
    response.end(JSON.stringify(returnData));
  }));

  form.on('field', function(name, value) {
    fields[name] = value;
  });

  form.on('file', function(name, file) {
    // --------------------------------------------------
    // file object
    // {
    //   "fieldName": "photofile",
    //   "originalFilename": "sunset-02.jpg",
    //   "path": "/opt/_meteor/uploaded/20R_lCkHKVi6aQhic6Dz5jzK.jpg",
    //   "headers": {
    //     "content-disposition": "form-data; name=\"photofile\"; filename=\"sunset-02.jpg\"",
    //     "content-type": "image/jpeg"
    //   },
    //   "size": 24581
    // }
    // --------------------------------------------------

    if (file.originalFilename === '') {
      try {
        fs.unlink(file.path);
      } catch(e) {}
    } else {
      var filename = s(file.path).strRightBack('/').value();

      if (file.fieldName === 'origin') {
        var originPath = Meteor.settings.private.files.chat.origin + '/' + filename;

        fs.rename(file.path, originPath, function (error) {});

        file.path = originPath;

        filesOrigin.push(file);
      } else if (file.fieldName === 'thumb') {
        var thumbPath = Meteor.settings.private.files.chat.thumb + '/' + filename;

        fs.rename(file.path, thumbPath, function (error) {});

        file.path = thumbPath;

        filesThumb.push(file);
      }
    }
  });

  // Parse req
  form.parse(request);
  // ====================================================================================================
});

RESTAPI.route(restApiRoot + '0.1/chats/:chatid/files/origin/:fileid', function(params, request, response, next) {
  var checkPreflight = getRequestPreflight(request, response, params, 'GET', true, this.userId);
  if (!checkPreflight.passed) {
    return;
  }

  // ====================================================================================================
  var filesInfo = ChatFiles.findOne({
    _id: params.fileid,
    chatId: params.chatid
  }, {
    path: 1,
    name: 1
  });

  if (!filesInfo) {
    response.writeHead(404);
    response.end('File Not found.');
    return;
  }

  var fileData;
  try {
    fileData = fs.readFileSync(filesInfo.path);
  } catch (err) {
    response.writeHead(404);
    response.end('File Not found.');
    return;
  }

  var headers = {
    'Content-type': 'application/octet-stream',
    'Content-Disposition': 'attachment; filename=' + filesInfo.name
  };
  response.writeHead(200, headers);
  response.end(fileData);
  // ====================================================================================================
});

RESTAPI.route(restApiRoot + '0.1/chats/:chatid/files/thumb/:fileid', function(params, request, response, next) {
  var checkPreflight = getRequestPreflight(request, response, params, 'GET', true, this.userId);
  if (!checkPreflight.passed) {
    return;
  }

  // ====================================================================================================
  var filesInfo = ChatFiles.findOne({
    _id: params.fileid,
    chatId: params.chatid
  }, {
    path: 1,
    name: 1
  });

  if (!filesInfo) {
    response.writeHead(404);
    response.end('File Not found.');
    return;
  }

  var fileData;
  try {
    fileData = fs.readFileSync(filesInfo.path);
  } catch (err) {
    response.writeHead(404);
    response.end('File Not found.');
    return;
  }

  var headers = {
    'Content-type': 'application/octet-stream',
    'Content-Disposition': 'attachment; filename=' + filesInfo.name
  };
  response.writeHead(200, headers);
  response.end(fileData);
  // ====================================================================================================
});


RESTAPI.route(restApiRoot + '0.1/test/push/regist', function(params, request, response, next) {
 var checkPreflight = getRequestPreflight(request, response, params, 'POST', true, this.userId);
  if (!checkPreflight.passed) {
    return;
  }

  var returnData = {};

  var tokenData = request.body.data;

  check(tokenData, Object);

  var appName = tokenData.appName;
  var userId = tokenData.userId;
  var token = tokenData.token;

  check(appName, String);
  check(userId, String);
  check(token, Object);

  var user = checkPreflight.user;
  if (!user) {
    returnData = {
      status: false,
      code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
      message: TAPi18n.__('error.account.failed_authentication', {}, checkPreflight.language)
    };

    response.setHeader('content-type', 'application/json;charset=utf-8');
    response.end(JSON.stringify(returnData));
    return;
  }

  var doc;

  if (!doc) {
    doc = Push.appCollection.findOne({
      $and: [
        { token: token },     // Match token
        { appName: appName }, // Match appName
        { token: { $exists: true } }  // Make sure token exists
      ]
    });
  }

  if (!doc) {
    doc = {
      token: token,
      appName: appName,
      userId: user._id,
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    doc._id = Random.id();

    Push.appCollection._collection.insert(doc);
  } else {
    Push.appCollection.update({ _id: doc._id }, {
      $set: {
        updatedAt: new Date(),
        token: token
      }
    });
  }

  if (doc) {
    var removed = Push.appCollection.remove({
      $and: [
        { _id: { $ne: doc._id } },
        { token: doc.token },     // Match token
        { appName: doc.appName }, // Match appName
        { token: { $exists: true } }  // Make sure token exists
      ]
    });

    if (removed && Push.debug) {
      console.log('Push: Removed ' + removed + ' existing app items');
    }
  }

  var data = {
    status: true,
    code: SPOTCONST.ERROR_SUCCEED,
    message: ''
  };

  response.setHeader('Content-Type', 'application/json');
  response.statusCode = 200;
  response.end(JSON.stringify(data));
});