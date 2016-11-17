// ====================================================================================================
// This removes the password field but returns it,
// so that you can re-add it later, preserving the
// desired order of the fields
var pwd = AccountsTemplates.removeField('password');

AccountsTemplates.addFields([
  {
    _id: "username",
    type: "text",
    displayName: "Username",
    required: true,
    minLength: 5,
    trim: true,
    lowercase: true
  },
  pwd,
  {
    _id: "firstname",
    type: "text",
    displayName: "First Name",
    required: true,
    minLength: 1,
    trim: true
  },
  {
    _id: "middlename",
    type: "text",
    displayName: "Middle Name",
    required: false,
    minLength: 1,
    trim: true
  },
  {
    _id: "lastname",
    type: "text",
    displayName: "Last Name",
    required: true,
    minLength: 1,
    trim: true
  },
  {
    _id: "countrytelephonecode",
    type: "text",
    displayName: "Country Telephone Code",
    required: true,
    minLength: 2,
    errStr: 'Invalid Country Telephone Code!',
    trim: true
  },
  {
    _id: "phonenumber",
    type: "text",
    displayName: "Phone Number",
    required: true,
    minLength: 10,
    errStr: 'Invalid Phone number!',
    trim: true
  }
]);

AccountsTemplates.configure({
  defaultContentRegion: 'main',
  defaultLayout: 'publicLayout',
  defaultLayoutRegions: {
    main: ''
  },

  // Behavior
  confirmPassword: true,
  defaultState: 'signIn',
  enablePasswordChange: true,
  enforceEmailVerification: false,
  focusFirstInput: true,
  forbidClientAccountCreation: false,
  lowercaseUsername: false,
  overrideLoginErrors: true,
  redirectTimeout: 4000,
  sendVerificationEmail: true,
  socialLoginStyle: 'popup',

  // Appearance
  hideSignInLink: false,
  hideSignUpLink: false,
  showAddRemoveServices: false,
  showForgotPasswordLink: true,
  showLabels: true,
  showPlaceholders: true,
  showResendVerificationEmailLink: true,


  // Client-side Validation
  continuousValidation: false,
  negativeFeedback: false,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: false,
  showValidating: false,

  // Links
  homeRoutePath: '/',
  privacyUrl: 'privacy',
  termsUrl: 'terms-of-use',

  // Hooks
  // onLogoutHook: function() {
  // },
  onSubmitHook: function(error, state) {
    if (error) {
      return;
    }
    var password = Session.get('password');
    if (state === 'signIn' || state === 'signUp') {
      // // ################################################################################
      // // DDP와 연계시 이상으로 인해 로그인시 강제로 초기화하도록 함.
      // // ================================================================================
      // // EncryptionUtils.onSignIn(password);
      // // --------------------------------------------------------------------------------
      // EncryptionUtils.extendProfile(password);
      // // ################################################################################

      EncryptionUtils.onSignIn(password);
    }
  },
  preSignUpHook: function(password, info) {
    Session.setAuth(
      'password',
      password
    );
  },
  // postSignUpHook: function(userId, info) {
  // },

  // Texts
  texts: {
    button: {
      signUp: "지금 등록"
    },
    socialSignUp: "등록",
    title: {
      forgotPwd: "암호 재설정"
    }
  }
});

// ================================================================================

// AccountsTemplates.configureRoute('signIn');
// AccountsTemplates.configureRoute('forgotPwd');
// AccountsTemplates.configureRoute('signUp');
// AccountsTemplates.configureRoute('resetPwd');

AccountsTemplates.configureRoute('resendVerificationEmail', {
  layoutType: 'blaze',
  name: 'resendVerificationEmail',
  path: '/send-again',
  template: 'fullPageAtForm',
  layoutTemplate: 'publicLayout',
  layoutRegions: {
    main: 'fullPageAtForm'
  },
  contentRegion: 'main'
});

AccountsTemplates.configureRoute('signIn', {
  layoutType: 'blaze',
  name: 'signIn',
  path: '/sign-in',
  template: 'fullPageAtForm',
  layoutTemplate: 'publicLayout',
  layoutRegions: {
    main: 'fullPageAtForm'
  },
  contentRegion: 'main'
});

AccountsTemplates.configureRoute('signUp', {
  layoutType: 'blaze',
  name: 'signUp',
  path: '/sign-up',
  template: 'fullPageAtForm',
  layoutTemplate: 'publicLayout',
  layoutRegions: {
    main: 'fullPageAtForm'
  },
  contentRegion: 'main'
});

AccountsTemplates.configureRoute('forgotPwd', {
  layoutType: 'blaze',
  name: 'forgotPwd',
  path: '/forgot-password',
  template: 'fullPageAtForm',
  layoutTemplate: 'publicLayout',
  layoutRegions: {
    main: 'fullPageAtForm'
  },
  contentRegion: 'main'
});

// ================================================================================
