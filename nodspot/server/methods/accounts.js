//import { SSR } from 'meteor/meteorhacks:ssr';
import bcrypt from 'bcryptjs';

import {customCheck, nonEmptyString} from './utils/utils';



import Phonenumbers from '../../imports/collections/phonenumbers';
import ReservedUserIds from '../../imports/collections/reserveduserids';

const SPOTCONST = require('../../lib/constants');

Meteor.methods({
  // --------------------------------------------------
  'allUsers' ({userLang}={userLang}) {
    // PLANIFICA DEMO에서 사용

    userLang = userLang || Meteor.settings.private.language.default;

    let currentUserId = this.userId;

    if (!currentUserId) {
      return {
        status: false,
        code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
        message: TAPi18n.__('error.account.failed_authentication', {}, userLang)
      }
    }

    userLang = userLang.trim();

    let resultData = Meteor.users.find({_id: {$ne: currentUserId}}).fetch();

    return resultData;
  },
  // --------------------------------------------------
  'updateUserProfile' ({userLang, countrycode, phonenumber, email}) {
    // 사용자 프로필 중 전화 번호, 메일 주소 변경
    // 사진은 별도의 웹 포스트 방식 사용

    userLang = userLang || Meteor.settings.private.language.default;

    let currentUserId = this.userId;

    if (!currentUserId) {
      return {
        status: false,
        code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
        message: TAPi18n.__('error.account.failed_authentication', {}, userLang)
      }
    }

    if (!
        customCheck([
          {v: countrycode, c: nonEmptyString},
          {v: phonenumber, c: nonEmptyString},
          {v: email, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    countrycode = countrycode.trim();
    phonenumber = phonenumber.trim();
    email = email.trim();

    let returnData = {};

    let updateSet = {};
    if (countrycode !== '') {
      updateSet['phone.countrycode'] = countrycode.replace(/[^0-9]/gi, '');
    }

    if (phonenumber !== '') {
      updateSet['phone.number'] = phonenumber.replace(/[^0-9]/gi, '');
      updateSet['phone.verified'] = false;
    }

    if (email !== '') {
      updateSet['emails.0.address'] = email;
      updateSet['emails.0.verified'] = false;
    }

    let dbCount = Meteor.users.update({
      _id: currentUserId
    }, {
      $set: updateSet
    });

    if (dbCount < 1) {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_UPDATE_USER_PROFILE,
        message: TAPi18n.__('error.user.failed_update_user_profile', {}, userLang)
      };
    } else {
      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: ''
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'changeUserPassword' ({userLang, oldPassword, newPassword}) {
    // 사용자 암호 변경

    userLang = userLang || Meteor.settings.private.language.default;

    let currentUserId = this.userId;

    if (!currentUserId) {
      return {
        status: false,
        code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
        message: TAPi18n.__('error.account.failed_authentication', {}, userLang)
      }
    }

    if (!
        customCheck([
          {v: oldPassword, c: nonEmptyString},
          {v: newPassword, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    oldPassword = oldPassword.trim();
    newPassword = newPassword.trim();

    let returnData = {};

    let user = Meteor.users.findOne({
      _id: currentUserId
    });

    if (!user) {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_NOT_FOUND_CURRENT_USER,
        message: TAPi18n.__('error.user.not_found_current_user', {}, userLang)
      };

      return returnData;
    }

    if (! bcrypt.compareSync(oldPassword, user.services.password.bcrypt)) {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_CHANGE_USER_PASSWORD,
        message: TAPi18n.__('error.user.failed_change_user_password', {}, userLang)
      };

      return returnData;
    }

    let wrapAsyncResult1 = Meteor.wrapAsync(updateUserPassword1)(userLang, currentUserId, bcrypt.hashSync(newPassword, 10));
    // if (wrapAsyncResult1.status == false) {
    //   returnData = {
    //     status: false,
    //     code: SPOTCONST.ERROR_FAILED_CHANGE_USER_PASSWORD,
    //     message: TAPi18n.__('error.user.failed_change_user_password', {}, userLang)
    //   };
    // } else {
    //   let wrapAsyncResult2 = Meteor.wrapAsync(updateUserPassword2)(userLang, currentUserId, newPassword);
    //
    //   if (wrapAsyncResult2.status == false) {
    //     returnData = {
    //       status: false,
    //       coce: ERROR_FAILED_UPDATE_PRINCIPAL,
    //       message: TAPi18n.__('error.principal.failed_update_principal', {}, userLang)
    //     };
    //   } else {
    //     returnData = {
    //       status: true,
    //       code: SPOTCONST.ERROR_SUCCEED,
    //       message: ''
    //     };
    //   }
    // }

    returnData = wrapAsyncResult1;

    return returnData;
  },
  // --------------------------------------------------
  'request.reset.password.email' ({userLang, username}) {
    // 암호 재설정 링크 요청 : 메일로 발송

    userLang = userLang || Meteor.settings.private.language.default;

    T9n.setLanguage(userLang);

    if (!
        customCheck([
          {v: username, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    username = username.trim();

    let returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: ''
    };

    let user = Meteor.users.findOne({username:username});
    if (!user) {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_NOT_FOUND_TARGET_USER,
        message: TAPi18n.__('error.user.not_found_target_user', {}, userLang)
      };

      return returnData;
    }

    const emails = _.pluck(user.emails || [], 'address');
    const caseSensitiveEmail = _.find(emails, email => {
      return email.toLowerCase() === email.toLowerCase();
    });

    try {
      Meteor.defer(function() {
        Accounts.sendResetPasswordEmail(user._id, caseSensitiveEmail);
      });

      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: '',
        data: {
          timestamp: new Date()
        }
      };
    } catch(e) {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_SEND_MAIL,
        message: TAPi18n.__('error.mail.failed_send_mail', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'request.reset.password.sms' ({userLang, username}) {
    // 암호 재설정 링크 요청 : 문자메시지로 발송

    userLang = userLang || Meteor.settings.private.language.default;

    T9n.setLanguage(userLang);

    if (!
        customCheck([
          {v: username, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    username = username.trim();

    let returnData = {};

    let user = Meteor.users.findOne({username:username});
    if (!user) {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_NOT_FOUND_TARGET_USER,
        message: TAPi18n.__('error.user.failed_send_mail', {}, userLang)
      };

      return returnData;
    }

    let token = Random.secret();
    let when = new Date();
    let tokenRecord = {
      token: token,
      email: user.emails[0].address,
      when: when
    };
    Meteor.users.update(user._id, {$set: {
      "services.password.reset": tokenRecord
    }});

    let resetPasswordUrl = Meteor.absoluteUrl('reset-password/' + token, {rootUrl:Meteor.settings.private.url.root, replaceLocalhost:false})

    // --------------------------------------------------
    // let resetPasswordUrl = Meteor.absoluteUrl('reset-password/' + user.services.password.reset.token);
    // console.log('passwordResetUrl : ' + resetPasswordUrl);
    // resetPasswordUrl = 'https://nodapi-dev.nodcoco.com/m/spot27/' + 'reset-password/' + user.services.password.reset.token;

    let url = "https://www.googleapis.com/urlshortener/v1/url?key=" + Meteor.settings.private.googleapis.urlshortener;
    let data = {"longUrl": resetPasswordUrl};

    try {
      let result = HTTP.call("POST", url, {content: "application/json", data: data, timeout: 3000});
      if(result.statusCode == 200) {
        resetPasswordUrl = result.data.id;
      }
    } catch (e) {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_MAKE_SHORTEN_URL,
        message: TAPi18n.__('error.common.failed_make_shorten_url', {}, userLang)
      };

      return returnData;
    }

    // --------------------------------------------------

    try {
      let httpResponse = HTTP.call('POST', Meteor.settings.private.sms.url, {
        data: {
          "user": Meteor.settings.private.sms.user,
          "password": Meteor.settings.private.sms.password,
          "msg": {
            "sender": Meteor.settings.private.sms.senderNumber,
            "receiver": user.phone.number,
            "message": '[SPOT27] ' + TAPi18n.__('service.account.url_for_change_password', {}, userLang) + '\n' + resetPasswordUrl,
            "msg_gb": "A"
          }
        },
        headers: {
          "content-type": "application/json"
        }
      });

      if (httpResponse.statusCode !== 200) {
        returnData = {
          status: false,
          code: SPOTCONST.ERROR_FAILED_SEND_SMS,
          message: TAPi18n.__('error.phone.failed_send_sms', {}, userLang)
        };
      } else {
        returnData = {
          status: true,
          code: SPOTCONST.ERROR_SUCCEED,
          message: ''
        };
      }
    } catch (e) {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_SEND_SMS,
        message: TAPi18n.__('error.phone.failed_send_sms', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'forgotUserPassword' ({userLang, email}) {
    // 암호 분실 신청

    userLang = userLang || Meteor.settings.private.language.default;

    T9n.setLanguage(userLang);

    if (!
        customCheck([
          {v: email, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    email = email.trim();

    let returnData = {};

    let user = Accounts.findUserByEmail(email);
    if (!user) {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_NOT_FOUND_TARGET_USER,
        message: TAPi18n.__('error.user.not_found_target_user', {}, userLang)
      };

      return returnData;
    }

    const emails = _.pluck(user.emails || [], 'address');
    const caseSensitiveEmail = _.find(emails, email => {
      return email.toLowerCase() === email.toLowerCase();
    });

    try {
      Accounts.sendResetPasswordEmail(user._id, caseSensitiveEmail);

      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: ''
      };
    } catch(e) {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_SEND_MAIL,
        message: TAPi18n.__('error.phone.failed_send_mail', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'findMyIdByEmail' ({userLang, email}) {
    // 이메일 정보로 아이디 찾기

    userLang = userLang || Meteor.settings.private.language.default;

    if (!
        customCheck([
          {v: email, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    email = email.trim();

    let returnData = {};

    let dbData = Meteor.users.findOne({
      'emails.address': email
    });

    if (dbData) {
      // 메일 발송 루틴 추가

      SSR.compileTemplate('findUsername', Assets.getText('htmls/findUsername.html'));

      let emailData = {
        username: dbData.username
      };

      Meteor.defer(function() {
        Email.send({
          to: email,
          from: "SPOT27 Support <support@spot27.chat>",
          subject: "[SPOT27] Find My ID",
          html: SSR.render('findUsername', emailData)
        });
      });

      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: '',
        data: {
          timestamp: new Date(),
          userid: dbData.username
        }
      };
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_NOT_FOUND_TARGET_USER,
        message: TAPi18n.__('error.user.not_found_target_user', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'findMyIdByPhone' ({userLang, phonenumber}) {
    // 전화번호 정보로 아이디 찾기

    userLang = userLang || Meteor.settings.private.language.default;

    if (!
        customCheck([
          {v: phonenumber, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    phonenumber = phonenumber.trim();

    let returnData = {};

    let dbData = Meteor.users.findOne({
      'phone.number': phonenumber
    });

    if (dbData) {
      // 문자 메시지 발송 루틴 추가

      try {
        let httpResponse = HTTP.call('POST', Meteor.settings.private.sms.url, {
          data: {
            "user": Meteor.settings.private.sms.user,
            "password": Meteor.settings.private.sms.password,
            "msg": {
              "sender": Meteor.settings.private.sms.senderNumber,
              "receiver": phonenumber,
              "message": '[SPOT27] 아이디 찾기\n' + dbData.username,
              "msg_gb": "A"
            }
          },
          headers: {
            "content-type": "application/json"
          }
        });

        if (httpResponse.statusCode !== 200) {
          returnData = {
            status: false,
            code: SPOTCONST.ERROR_FAILED_SEND_MAIL,
            message: TAPi18n.__('error.mail.failed_send_mail', {}, userLang)
          };
        } else {
          returnData = {
            status: true,
            code: SPOTCONST.ERROR_SUCCEED,
            message: ''
          };
        }
      } catch (e) {
        returnData = {
          status: false,
          code: SPOTCONST.ERROR_FAILED_SEND_MAIL,
          message: TAPi18n.__('error.mail.failed_send_mail', {}, userLang)
        };
      }
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_NOT_FOUND_TARGET_USER,
        message: TAPi18n.__('error.user.not_found_target_user', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'checkDuplicateId' ({userLang, clientId, userId}) {
    // 회원가입시 아이디가 존재하는지 점검 후 예약 설정

    userLang = userLang || Meteor.settings.private.language.default;

    if (!
        customCheck([
          {v: clientId, c: nonEmptyString},
          {v: userId, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    clientId = clientId.trim();
    userId = userId.trim();

    let returnData = {};

    let duplicateInfo = ReservedUserIds.findOne({
      userId: userId
    });

    if (!duplicateInfo) {
      duplicateInfo = Meteor.users.findOne({
        username: userId
      });

      if (!duplicateInfo) {
        let id = ReservedUserIds.insert({
          clientId: clientId,
          userId: userId
        });

        if (id) {
          returnData = {
            status: true,
            code: SPOTCONST.ERROR_SUCCEED,
            message: '',
            data: {
              used: false
            }
          };
        } else {
          returnData = {
            status: true,
            code: SPOTCONST.ERROR_SUCCEED,
            message: '',
            data: {
              used: true
            }
          };
        }
      } else {
        returnData = {
          status: true,
          code: SPOTCONST.ERROR_SUCCEED,
          message: '',
          data: {
            used: true
          }
        };
      }
    } else {
      if (duplicateInfo.clientId !== clientId) {
        returnData = {
          status: true,
          code: SPOTCONST.ERROR_SUCCEED,
          message: '',
          data: {
            used: true
          }
        };
      } else {
        returnData = {
          status: true,
          code: SPOTCONST.ERROR_SUCCEED,
          message: '',
          data: {
            used: false
          }
        };
      }
    }

    return returnData;
  },
  // --------------------------------------------------
  'checkDuplicateEmail' ({userLang, clientId, email}) {
    // 회원가입시 메일 주소가 존재하는지 점검

    userLang = userLang || Meteor.settings.private.language.default;

    if (!
        customCheck([
          {v: clientId, c: nonEmptyString},
          {v: email, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    clientId = clientId.trim();
    email = email.trim();

    let returnData = {};

    let duplicateInfo = Meteor.users.findOne({
      'emails.address': email
    });

    if (!duplicateInfo) {
      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: '',
        data: {
          used: false
        }
      };
    } else {
      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: '',
        data: {
          used: true
        }
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'checkDuplicatePhone' ({userLang, clientId, countrycode, number}) {
    // 회원가입시 전화 번호가 존재하는지 점검

    userLang = userLang || Meteor.settings.private.language.default;

    if (!
        customCheck([
          {v: clientId, c: nonEmptyString},
          {v: countrycode, c: nonEmptyString},
          {v: number, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    clientId = clientId.trim();
    countrycode = countrycode.trim();
    number = number.trim();

    let returnData = {};

    let duplicateInfo = Meteor.users.findOne({
      'phone.countrycode': countrycode,
      'phone.number': number
    });

    if (!duplicateInfo) {
      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: '',
        data: {
          used: false
        }
      };
    } else {
      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: '',
        data: {
          used: true
        }
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'users.by.phonenumbers' ({userLang, phoneNumbers}) {
    // 디바이스에 있는 전화번호 목록으로 정보 조회

    userLang = userLang || Meteor.settings.private.language.default;

    if (!
        customCheck([
          {v: phoneNumbers, c: [String]}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();

    let returnData = {};

    let dbData = Meteor.users.find({
      'phone.number': {
        $in: phoneNumbers
      }
    }, {
      fields: {
        _id: 1,
        emails: 1,
        username: 1,
        name: 1,
        phone: 1,
        photo: 1
      }
    });

    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: '',
      data: {
        users: dbData.fetch()
      }
    };

    return returnData;
  },
  // --------------------------------------------------
  'cancelRegist' ({userLang, clientId, userId}) {
    // 회원가입시 아이디 예약 해제

    userLang = userLang || Meteor.settings.private.language.default;

    if (!
      customCheck([
        {v: clientId, c: nonEmptyString},
        {v: userId, c: nonEmptyString}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    clientId = clientId.trim();
    userId = userId.trim();

    let returnData = {};

    let preoccupation = ReservedUserIds.remove({
      clientId: clientId,
      userId: userId
    });

    if (preoccupation > 0) {
      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: ''
      };
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_DELETE_RESERVED_ID,
        message: TAPi18n.__('error.account.failed_delete_reserved_id', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'registService' ({userLang, type, username, password, email, profile={firstname, middlename, lastname, countrycode, number}}) {
    // 서비스 가입

    userLang = userLang || Meteor.settings.private.language.default;

    T9n.setLanguage(userLang);

    if (!
        customCheck([
          {v: username, c: nonEmptyString},
          {v: password, c: nonEmptyString},
          {v: email, c: nonEmptyString},
          {v: profile, c: Object},
          {v: profile.firstname, c: nonEmptyString},
          {v: profile.middlename, c: String},
          {v: profile.lastname, c: nonEmptyString},
          {v: profile.countrycode, c: nonEmptyString},
          {v: profile.number, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    username = username.trim();
    password = password.trim();
    email = email.trim();
    profile.firstname = profile.firstname.trim();
    profile.middlename = profile.middlename.trim();
    profile.lastname = profile.lastname.trim();
    profile.countrycode = profile.countrycode.trim();
    profile.number = profile.number.trim();

    let returnData = null;

    let wrapAsync = Meteor.wrapAsync(createUserAccount);
    let wrapAsyncResult = wrapAsync(userLang, username, password, email, profile);

    // if (wrapAsyncResult.status == false) {
    //   returnData = {
    //     status: false,
    //     code: SPOTCONST.ERROR_FAILED_CREATE_USER,
    //     message: TAPi18n.__('error.user.failed_create_user', {}, userLang)
    //   };
    // } else {
    //   let wrapAsync2 = Meteor.wrapAsync(createPrincipal);
    //   let wrapAsyncResult2 = wrapAsync2(userLang, wrapAsyncResult.data.userId, password);
    //
    //   returnData = wrapAsyncResult2;
    // }

    returnData = wrapAsyncResult;

    return returnData;
  },
  // --------------------------------------------------
  'unregistService' ({userLang}={userLang}) {
    // 서비스 탈퇴

    userLang = userLang || Meteor.settings.private.language.default;

    let currentUserId = this.userId;

    if (!currentUserId) {
      return {
        status: false,
        code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
        message: TAPi18n.__('error.account.failed_authentication', {}, userLang)
      }
    }

    userLang = userLang.trim();

    let collectionResult = Meteor.users.remove({
      _id: currentUserId
    });

    let returnData = {};

    if (collectionResult > 0) {
      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: ''
      };
    } else {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_DELETE_USER,
        message: TAPi18n.__('error.user.failed_delete_user', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'requestSendVerificationPhone' ({userLang, phone, isMember}) {
    // 휴대전화 검증용 문자 발송 요청

    userLang = userLang || Meteor.settings.private.language.default;

    let currentUserId = this.userId;

    if (!
        customCheck([
          {v: phone, c: nonEmptyString},
          {v: isMember, c: Boolean}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    phone = phone.trim();

    let returnData = {};

    if (isMember) {
      if (!currentUserId) {
        return {
          status: false,
          code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
          message: TAPi18n.__('error.account.failed_authentication', {}, userLang)
        }
      }

      let user = Meteor.users.findOne(currentUserId);

      if (!user) {
        return {
          status: false,
          code: SPOTCONST.ERROR_NOT_FOUND_CURRENT_USER,
          message: TAPi18n.__('error.user.not_found_current_user', {}, userLang)
        }
      }
    }

    let randomSMS = (Math.floor(Random.fraction() * 1000000) + '000000').substr(0, 6);

    try {
      let httpResponse = HTTP.call('POST', Meteor.settings.private.sms.url, {
        data: {
          "user": Meteor.settings.private.sms.user,
          "password": Meteor.settings.private.sms.password,
          "msg": {
            "sender": Meteor.settings.private.sms.senderNumber,
            "receiver": phone,
            "message": '[SPOT27] 전화번호 확인용 코드 : ' + randomSMS,
            "msg_gb": "A"
          }
        },
        headers: {
          "content-type": "application/json"
        }
      });

      if (httpResponse.statusCode !== 200) {
        returnData = {
          status: false,
          code: SPOTCONST.ERROR_FAILED_SEND_SMS,
          message: TAPi18n.__('error.phone.failed_send_sms', {}, userLang)
        };

        return returnData;
      }
    } catch (e) {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_SEND_SMS,
        message: TAPi18n.__('error.phone.failed_send_sms', {}, userLang)
      };

      return returnData;
    }


    let token = Random.secret();
    let tokenRecord = {
      createdAt: (new Date()),
      phone: phone,
      sms: randomSMS.toString(),
      token: token
    };

    if (isMember) {
      Meteor.users.update(currentUserId, {
        $set: {
          "phone.reset": tokenRecord
        }
      });
    } else {
      Phonenumbers.insert(
        tokenRecord
      );
    }

    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: '',
      data: {
        token: token
      }
    };

    return returnData;
  },
  // --------------------------------------------------
  'verifyPhone' ({userLang, phone, token, sms, isMember}) {
    // 휴대전화 검증 요청 확인

    userLang = userLang || Meteor.settings.private.language.default;

    let currentUserId = this.userId;

    if (!
      customCheck([
        {v: phone, c: nonEmptyString},
        {v: token, c: nonEmptyString},
        {v: sms, c: nonEmptyString},
        {v: isMember, c: Boolean}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    phone = phone.trim();
    token = token.trim();
    sms = sms.trim();

    let returnData = {};

    let createdAt;

    if (isMember) {
      if (!currentUserId) {
        return {
          status: false,
          code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
          message: TAPi18n.__('error.account.failed_authentication', {}, userLang)
        }
      }

      let user = Meteor.users.findOne({
        _id: currentUserId,
        "phone.reset.phone": phone,
        "phone.reset.token": token,
        "phone.reset.sms": sms
      });

      if (!user) {
        return {
          status: false,
          code: SPOTCONST.ERROR_EXPIRED_TOKEN,
          message: TAPi18n.__('error.common.expired_token', {}, userLang)
        }
      }

      createdAt = user.phone.reset.createdAt;
    } else {
      let phonenumber = Phonenumbers.findOne({
        phone: phone,
        token: token,
        sms: sms
      });

      if (!phonenumber) {
        return {
          status: false,
          code: SPOTCONST.ERROR_EXPIRED_TOKEN,
          message: TAPi18n.__('error.common.expired_token', {}, userLang)
        }
      }

      createdAt = phonenumber.createdAt;
    }

    let tokenLifetimeMs = 5 * 60 * 1000;
    let currentTimeMs = Date.now();
    if ((currentTimeMs - createdAt) > tokenLifetimeMs) {
      return {
        status: false,
        code: SPOTCONST.ERROR_EXPIRED_TOKEN,
        message: TAPi18n.__('error.common.expired_token', {}, userLang)
      }
    }

    try {
      let affectedRecords = 0;
      if (isMember) {
        // Update the user record by:
        // - Changing the phoneNumber to the new one
        affectedRecords = Meteor.users.update({
          _id: currentUserId,
          'phone.reset.token': token
        }, {
          $set: {
            'phone.number': phone,
            'phone.verified': true
          },
          $unset: {
            'phone.reset': 1
          }
        });
      } else {
        affectedRecords = Phonenumbers.remove({
          phone: phone,
          token: token,
          sms: sms
        });
      }

      if (affectedRecords === 1) {
        returnData = {
          status: true,
          code: SPOTCONST.ERROR_SUCCEED,
          message: ''
        };
      } else {
        returnData = {
          status: false,
          code: SPOTCONST.ERROR_FAILED_UPDATE_USER_PROFILE,
          message: TAPi18n.__('error.user.failed_update_user_profile', {}, userLang)
        };
      }
    } catch (e) {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_UPDATE_USER_PROFILE,
        message: TAPi18n.__('error.user.failed_update_user_profile', {}, userLang)
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'requestSendVerificationEmail' ({userLang, email}) {
    // 이메일 주소 검증용 메일 발송 요청
    // 검증은 미티어 기본 사용

    userLang = userLang || Meteor.settings.private.language.default;

    T9n.setLanguage(userLang);

    let currentUserId = this.userId;

    if (!currentUserId) {
      return {
        status: false,
        code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
        message: TAPi18n.__('error.account.failed_authentication', {}, userLang)
      }
    }

    if (!
      customCheck([
        {v: email, c: nonEmptyString}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    email = email.trim();

    let returnData = {};

    try {
      Accounts.sendVerificationEmail(currentUserId, email);
    } catch (e) {}

    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: ''
    };

    return returnData;
  },
  // --------------------------------------------------
  'spotLogin' ({userLang, username, password}) {
    // 로그인

    userLang = userLang || Meteor.settings.private.language.default;

    // --------------------------------------------------
    // i18n sample : http://i18next.github.io/i18next/pages/doc_features.html
    // console.log('##### i18n : ' + (TAPi18n.__('header.hello', { postProcess: 'sprintf', sprintf: [new Date()], user_name:'누구'}, userLang)));
    // --------------------------------------------------

    if (!
      customCheck([
        {v: username, c: nonEmptyString},
        {v: password, c: nonEmptyString}
      ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    username = username.trim();
    password = password.trim();

    let returnData = {};

    try {
      let user = Meteor.users.findOne({username:username});
      if (!user) {
        returnData = {
          status: false,
          code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
          message: TAPi18n.__('error.account.failed_authentication', {}, userLang)
        };
      } else {
        // try {
        //   bcrypt.hash(password, 10, function(err, crypted) {
        //     bcrypt.compare(user.services.password.bcrypt, crypted, function(err, res) {
        //     });
        //   });
        // } catch (e) {
        //   console.log('ERROR : ' + e.message);
        // }

        let result = Meteor.apply('login', [{
          user: {
            username: username
          },
          password: {
            digest: password,
            algorithm: 'sha-256'
          }
        }]);

        let principal = Principals.findOne({ownerId:user._id, dataType:'usersPrincipal'})
        if (!principal) {
          returnData = {
            status: true,
            code: SPOTCONST.ERROR_SUCCEED,
            message: '',
            data: {
              id: result.id,
              principalId: '',
              token: result.token,
              tokenExpires: result.tokenExpires
            }
          };
        } else {
          returnData = {
            status: true,
            code: SPOTCONST.ERROR_SUCCEED,
            message: '',
            data: {
              id: result.id,
              principalId: principal._id,
              token: result.token,
              tokenExpires: result.tokenExpires
            }
          };
        }
      }
    } catch (e) {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
        message: TAPi18n.__('error.account.failed_authentication', {}, userLang),
        data: {
          reason: e.message
        }
      };
    }

    return returnData;
  },
  // --------------------------------------------------
  'spotLogout' ({userLang}={userLang}) {
    // 로그아웃

    userLang = userLang || Meteor.settings.private.language.default;

    let currentUserId = this.userId;

    if (!currentUserId) {
      return {
        status: false,
        code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
        message: TAPi18n.__('error.account.failed_authentication', {}, userLang)
      }
    }

    userLang = userLang.trim();

    let returnData = {};

    try {
      Meteor.apply('logout');
    } catch (e) {}

    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: ''
    };

    return returnData;
  },
  // --------------------------------------------------
  'logoutOthers' ({userLang, deviceId}) {
    // 다른 장비에서 모두 로그아웃

    userLang = userLang || Meteor.settings.private.language.default;

    let currentUserId = this.userId;

    if (!currentUserId) {
      return {
        status: false,
        code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
        message: TAPi18n.__('error.account.failed_authentication', {}, userLang)
      }
    }

    if (!
        customCheck([
          {v: deviceId, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    deviceId = deviceId.trim();

    try {
      Meteor.runAsUser(currentUserId, (function(_this) {
        Meteor.logoutOtherClients();
      })(this));
    } catch (e) {}

    pushSender(
      userLang,
      {
        type: 'system',
        command: 'other.login',
        deviceId: deviceId,
        sender: currentUserId,
        receivers: [currentUserId],
        chatId: '',
        messageId: '',
        friendMessage: ''
      }
    );

    return {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: ''
    };
  },
  // --------------------------------------------------
  'update.push.config' ({userLang, kind, use, weekdays, time={allDay, begin, end}}) {
    // 푸시 수신 설정

    userLang = userLang || Meteor.settings.private.language.default;

    let currentUserId = this.userId;

    if (!currentUserId) {
      return {
        status: false,
        code: SPOTCONST.ERROR_FAILED_AUTHENTICATION,
        message: TAPi18n.__('error.account.failed_authentication', {}, userLang)
      }
    }

    if (!
        customCheck([
          {v: kind, c: nonEmptyString},
          {v: use, c: Boolean},
          {v: weekdays, c: [Number]},
          {v: time, c: Object},
          {v: time.allDay, c: Boolean},
          {v: time.begin, c: nonEmptyString},
          {v: time.end, c: nonEmptyString}
        ])) {
      return {
        status: false,
        code: SPOTCONST.ERROR_INVALID_PARAMETERS,
        message: TAPi18n.__('error.common.invalid_parameters', {}, userLang)
      }
    }

    userLang = userLang.trim();
    kind = kind.trim();
    time.begin = time.begin.trim();
    time.end = time.end.trim();

    let returnData = {};

    let dbData = Meteor.users.update({
      _id: currentUserId
    }, {
      $set: {
        ['push.' + kind]: {
          use: use,
          weekdays: weekdays,
          time: time
        }
      }
    });

    if (!dbData) {
      returnData = {
        status: false,
        code: SPOTCONST.ERROR_FAILED_UPDATE_USER_PROFILE,
        message: TAPi18n.__('error.user.failed_update_user_profile', {}, userLang)
      };

    } else {
      returnData = {
        status: true,
        code: SPOTCONST.ERROR_SUCCEED,
        message: ''
      };
    }

    return returnData;
  }
});

const createUserAccount = function(userLang, username, password, email, profile, asyncCallback) {
  let returnData = {};

  try {
    let result = Accounts.createUser({
      username: username,
      email: email,
      password: {
        digest: password,
        algorithm: 'sha-256'
      },
      profile: {
        firstname: profile.firstname,
        middlename: profile.middlename.trim(),
        lastname: profile.lastname,
        countrytelephonecode: profile.countrycode,
        phonenumber: profile.number
      }
    });

    returnData = {
      status: true,
      code: SPOTCONST.ERROR_SUCCEED,
      message: '',
      data: {
        userId: result
      }
    };
  } catch (e) {
    returnData = {
      status: false,
      code: SPOTCONST.ERROR_FAILED_CREATE_USER,
      message: TAPi18n.__('error.user.failed_create_user', {}, userLang)
    };
  }

  asyncCallback(null, returnData);
};

const updateUserPassword1 = function(userLang, currentUserId, newPassword, asyncCallback) {
  let returnData = {};

  try {
    Meteor.users.update({
      _id: currentUserId
    }, {
      // ==================================================
      // 이 부분이 있으면 Meteor.wrapAsync 함수가 비정상적으로 동작함
      // --------------------------------------------------
      // $unset: {
      //   'services.password.srp': 1,
      //   'services.password.reset': 1,
      //   'services.resume.loginTokens': 0
      // },
      // $set: {'services.password.bcrypt': bcrypt.hashSync(newPassword, 10)}
      // ==================================================
      $set: {'services.password.bcrypt': newPassword}
    }, {
    }, function(error, response) {
      if (error) {
        returnData = {
          status: false,
          code: SPOTCONST.ERROR_FAILED_CHANGE_USER_PASSWORD,
          message: TAPi18n.__('error.user.failed_change_user_password', {}, userLang)
        };
      } else {
        returnData = {
          status: true,
          code: SPOTCONST.ERROR_SUCCEED,
          message: ''
        };
      }

      asyncCallback(null, returnData);
    });
  } catch (e) {
    returnData = {
      status: false,
      code: SPOTCONST.ERROR_FAILED_CHANGE_USER_PASSWORD,
      message: TAPi18n.__('error.user.failed_change_user_password', {}, userLang)
    };

    asyncCallback(null, returnData);
  }
};
