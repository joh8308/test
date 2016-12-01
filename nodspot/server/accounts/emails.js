Accounts.emailTemplates.siteName = "SPOT27";
Accounts.emailTemplates.from = "SPOT27 Support <support@spot27.chat>";

Accounts.emailTemplates.resetPassword = {
  from() {
    return "SPOT27 Support <support@spot27.chat>";
  },
  subject() {
    return "[SPOT27] " + T9n.get('mail.title.resetPassword', true);
  },
  html(user, url) {
    var params = {
      url: url,
      hello: T9n.get('mail.hello', true, {name: user.username}),
      content1: T9n.get('mail.body.resetPassword.content1', true),
      content2: T9n.get('mail.body.resetPassword.content2', true),
      ps: T9n.get('mail.body.resetPassword.ps', true),
      clickUrl: T9n.get('mail.body.resetPassword.clickUrl', true),
      buttonTitle: T9n.get('mail.body.resetPassword.buttonTitle', true),
      thanks: T9n.get('mail.body.resetPassword.thanks', true)
    };

    SSR.compileTemplate('spotForgotPassword', Assets.getText('htmls/forgotPassword.html'));

    return SSR.render("spotForgotPassword", params);
  }
};

Accounts.emailTemplates.verifyEmail = {
  from() {
    return "SPOT27 Support <support@spot27.chat>";
  },
  subject() {
    return "[SPOT27] " + T9n.get('mail.title.verifyEmail', true);
  },
  html(user, url) {
    var params = {
      url: url,
      username: user.username,
      hello: T9n.get('mail.hello', true, {name: user.username}),
      content1: T9n.get('mail.body.verifyEmail.content1', true),
      content2: T9n.get('mail.body.verifyEmail.content2', true),
      content3: T9n.get('mail.body.verifyEmail.content3', true),
      ps: T9n.get('mail.body.verifyEmail.ps', true),
      clickUrl: T9n.get('mail.body.verifyEmail.clickUrl', true),
      buttonTitle: T9n.get('mail.body.verifyEmail.buttonTitle', true),
      thanks: T9n.get('mail.body.verifyEmail.thanks', true)
    };

    SSR.compileTemplate('spotVerifyEmail', Assets.getText('htmls/verifyEmail.html'));

    return SSR.render("spotVerifyEmail", params);
  }
};