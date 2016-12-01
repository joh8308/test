import {customCheck, nonEmptyString} from './utils/utils';

var nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');

const SPOTCONST = require('../../lib/constants');

var convertUint8ArrayObject = function(obj) {
  var objToArray=function(kk) {
    var s=[];
    for (var c in kk) s[c]=kk[c]
    return new Uint8Array(s);
  };
  var t=Object.prototype.toString.call(obj);
  if (t==="[object Array]") {
    obj=obj.map(convertUint8ArrayObject);
  } else if (t==="[object Object]") {
    if (obj[0]) {
      obj=objToArray(obj);
    } else if (obj["$binary"]) {
      obj=nacl.util.decodeBase64(obj["$binary"]);
    } else {
      for (var key in obj) {
        obj[key]=convertUint8ArrayObject(obj[key]);
      }
    }
  }
  return obj;
};

Meteor.methods({
  // --------------------------------------------------
  'create.principals' ({userLang, principalData}) {
    // principals에 신규 데이터 등록

    userLang = userLang || Meteor.settings.private.language.default;

    var currentUserId = this.userId;

    if (!currentUserId) {
      return {
        status: false,
        code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
        message: TAPi18n.__('error.account.failed_authentication', {}, userLang)
      }
    }
    principalData = convertUint8ArrayObject(principalData);
    if (!
        customCheck([
          {v: principalData, c: Object}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();

    var returnData = {};

    // var randomId = Random.id();
    //
    // if (principalData.dataType === 'messagesPrincipal') {
    //   principalData.dataId = randomId;
    // }

    if (Principals.findOne({
        _id: principalData._id,
        dataType: 'usersPrincipal'
      })
    ) {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_EXIST_PRINCIPAL,
        message: TAPi18n.__('error.principal.exist_principal', {}, userLang)
      };

      return returnData;
    }

    var dbData = Principals.insert(principalData);

    if (dbData) {
      if (principalData.dataType === 'usersPrincipal') {
        Principals.remove({
          dataType:'usersPrincipal',
          dataId: currentUserId,
          _id: {
            $ne: principalData._id
          }
        });
      }

      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: '',
        data: {
          messageId: dbData
        }
      };
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_CREATE_PRINCIPAL,
        message: TAPi18n.__('error.principal.failed_create_principal', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'update.principals' ({userLang, principalId, principalData}) {
    // principals에 변경 데이터 업데이트

    userLang = userLang || Meteor.settings.private.language.default;

    var currentUserId = this.userId;

    if (!currentUserId) {
      return {
        status: false,
        code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
        message: TAPi18n.__('error.account.failed_authentication', {}, userLang)
      }
    }

    principalData = convertUint8ArrayObject(principalData);
    if (!
        customCheck([
          {v: principalId, c: nonEmptyString},
          {v: principalData, c: Object}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    principalId = principalId.trim();

    var returnData = {};

    var dbData = Principals.update({
      _id: principalId
    }, principalData
    );

    if (dbData) {
      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: '',
        data: {
          messageId: dbData
        }
      };
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_UPDATE_PRINCIPAL,
        message: TAPi18n.__('error.principal.failed_update_principal', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'delete.principals' ({userLang, principalId}) {
    // principals에서 데이터 삭제

    userLang = userLang || Meteor.settings.private.language.default;

    var currentUserId = this.userId;

    if (!currentUserId) {
      return {
        status: false,
        code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
        message: TAPi18n.__('error.account.failed_authentication', {}, userLang)
      }
    }

    if (!
        customCheck([
          {v: principalId, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    principalId = principalId.trim();

    var returnData = {};

    var dbData = Principals.remove({
      _id: principalId
    });

    if (dbData) {
      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: '',
        data: {
          messageId: dbData
        }
      };
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_DELETE_PRINCIPAL,
        message: TAPi18n.__('error.principal.failed_delete_principal', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'retrieve.principals' ({userLang, principalType, principalId}) {
    // principals에서 데이터 조회

    userLang = userLang || Meteor.settings.private.language.default;

    var currentUserId = this.userId;

    if (!currentUserId) {
      return {
        status: false,
        code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
        message: TAPi18n.__('error.account.failed_authentication', {}, userLang)
      }
    }

    if (!
        customCheck([
          {v: principalType, c: nonEmptyString},
          {v: principalId, c: String}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    principalType = principalType.trim();
    principalId = principalId.trim();

    var returnData = {};
    var dbData = null;

    if (principalType === 'usersPrincipal') {
      dbData = Principals.findOne({
        ownerId: currentUserId,
        dataType: principalType
      });
    } else {
      dbData = Principals.findOne({
        _id: principalId,
        dataType: principalType
      });
    }

    if (dbData) {
      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: '',
        data: {
          principalData: EJSON.fromJSONValue(dbData)
        }
      };
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_RETRIEVE_PRINCIPAL,
        message: TAPi18n.__('error.principal.failed_retrieve_principal', {}, userLang)
      };
    }

    return returnData;
  }
  // --------------------------------------------------
});
