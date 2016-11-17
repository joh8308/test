import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import {passwordSignupFields} from '../modules/AccountsUi.jsx';

import '../css/LoginButtons.import.less';

const isValid = {
  password(password) {
    return password.length >= 6 || alert('Password must be at least 6 characters long');
  },
  username(username) {
    return username.length >= 3 || alert('Username must be at least 3 characters long');
  },
  loginPasswordRepeat(password, passwordRepeat) {
    if (! passwordRepeat) {
      return true;
    }

    return password === passwordRepeat || alert('Password don\'t match');
  },
  changePasswordRepeat(password, passwordRepeat) {
    if (! passwordRepeat) {
      return false;
    }

    return password === passwordRepeat || alert('Password don\'t match');
  }
};

class LoginField extends Component {
  onValueChange(event) {
    this.props.onChange(this.props.fieldName, event.target.value);
  }

  render() {
    let {fieldName, fieldLabel, fieldType} = this.props;

    return (
      <div className={`login-${fieldName}-label-and-input`}>
        <label htmlFor={`login-${fieldName}`}>
          {fieldLabel}
        </label>
        <input id={`login-${fieldName}`} type={fieldType || 'text'} onKeyDown={this.props.onKeyDown.bind(this)} onChange={this.onValueChange.bind(this)}/>
      </div>
    );
  }
}

@reactMixin.decorate(LinkedStateMixin)
class LoginMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAccount: false,
      username: '',
      password: '',
      passwordRepeat: ''
    };
  }

  onCreateAccountClick() {
    this.setState({
      createAccount: true
    });
  }

  onSignInClick() {
    this.setState({
      createAccount: false
    });
  }

  onKeyDown(event) {
    // enter key
    if (event.which === 13) {
      this.onSubmit();
    }
  }

  onSubmit() {
    let options = {
      username: this.state.username,
      password: this.state.password
    };

    if (! isValid.username(options.username) ||
        ! isValid.password(options.password) ||
        ! isValid.loginPasswordRepeat(options.password, this.state.passwordRepeat)) {
      return false;
    }

    if (this.state.createAccount) {
      Accounts.createUser(options, (err) => {
        if (err) {
          alert(err.reason || 'Unknown error');
        } else {
          this.props.onCloseClick.call(this);
        }
      });
    } else {
      Meteor.loginWithPassword({username: options.username}, options.password, (err) => {
        if (err) {
          alert(err.reason || 'Unknown error');
        } else {
          this.props.onCloseClick.call(this);
        }
      });
    }
  }

  onFieldChange(fieldName, value) {
    let newFieldState = {};

    newFieldState[fieldName] = value;

    this.setState(newFieldState);
  }

  loginFields() {
    let fields = [];
    let option = passwordSignupFields();

    if (option.indexOf('USERNAME_AND_EMAIL') > -1 ||
        option.indexOf('USERNAME_AND_OPTIONAL_EMAIL') > -1) {
      fields.push({
        fieldName: 'username-or-email', fieldLabel: 'Username or Email'
      });
    } else if (option.indexOf('USERNAME_ONLY') > - 1) {
      fields.push({
        fieldName: 'username', fieldLabel: 'Username'
      });
    } else if (option.indexOf('EMAIL_ONLY') > -1) {
      fields.push({
        fieldName: 'email', fieldLabel: 'Email', fieldType: 'email'
      });
    }

    fields.push({
      fieldName: 'password',
      fieldLabel: 'Password',
      fieldType: 'password'
    });
    return fields;
  }

  signupFields() {
    let fields = [];
    let option = passwordSignupFields();

    if (option.indexOf('USERNAME_AND_EMAIL') > -1 ||
        option.indexOf('USERNAME_AND_OPTIONAL_EMAIL') > -1 ||
        option.indexOf('USERNAME_ONLY') > -1) {
      fields.push({
        fieldName: 'username', fieldLabel: 'Username'
      });
    }

    if (option.indexOf('USERNAME_AND_EMAIL') > -1 ||
        option.indexOf('EMAIL_ONLY') > -1) {
      fields.push({
        fieldName: 'email', fieldLabel: 'Email', fieldType: 'email'
      });
    }

    if (option.indexOf('USERNAME_AND_OPTIONAL_EMAIL') > -1) {
      fields.push({
        fieldName: 'email', fieldLabel: 'Email (optional)', fieldType: 'email'
      })
    }

    fields.push({
      fieldName: 'password',
      fieldLabel: 'Password',
      fieldType: 'password'
    });

    if (option.indexOf('USERNAME_AND_OPTIONAL_EMAIL') > -1 ||
        option.indexOf('USERNAME_ONLY') > -1) {
      fields.push({
        fieldName: 'password-again',
        fieldLabel: 'Password (again)',
        fieldType: 'password'
      });
    }

    return fields;
  }

  render() {
    if (this.props.closed) {
      return (<div></div>);
    }

    let showFields = this.state.createAccount && this.signupFields() || this.loginFields();
    let accountButton = (<a id="signup-link" className="additional-link" onClick={this.onCreateAccountClick.bind(this)}>Create account</a>);
    let confirmPassword = this.state.createAccount && (
      <div className="login-password-again-label-and-input">
        <label htmlFor="login-password-again">
          Password (again)
        </label>
        <input id="login-password-again" type="password" onKeyDown={this.onKeyDown.bind(this)} valueLink={this.linkState('passwordRepeat')}/>
      </div>
    );
    let buttonText = this.state.createAccount && 'Create Account' || 'Sign in';

    if (this.state.createAccount) {
      accountButton = (<a id="back-to-login-link" className="additional-link" onClick={this.onSignInClick.bind(this)}>Sign in</a>);
    }

    return (
      <div id="login-dropdown-list" className="accounts-dialog">
        <a className="login-close-text" onClick={this.props.onCloseClick.bind(this)}>Close</a>
        <div className="login-close-text-clear"></div>

        {showFields.map((fields) =>
          <LoginField {...fields} onKeyDown={this.onKeyDown.bind(this)} onChange={this.onFieldChange.bind(this)} />
        )}

        <div className="login-button login-button-form-submit" id="login-buttons-password" onClick={this.onSubmit.bind(this)}>
          {buttonText}
        </div>

        <div className="additional-link-container">
          {accountButton}
        </div>
      </div>
    );
  }
}

@reactMixin.decorate(LinkedStateMixin)
class ChangePasswordMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordRepeat: ''
    };
  }

  onKeyDown(event) {
    // enter key
    if (event.which === 13) {
      this.onSubmit();
    }
  }

  onSubmit() {
    let {oldPassword, newPassword, newPasswordRepeat} = this.state;

    if (! isValid.password(oldPassword) ||
        ! isValid.password(newPassword) ||
        ! isValid.changePasswordRepeat(newPassword, newPasswordRepeat)) {
      return false;
    }

    Accounts.changePassword(oldPassword, newPassword, (err) => {
      if (err) {
        alert(err.reason || 'Unkown error');
      } else {
        alert('Password changed');
        this.props.onChangePassword();
      }
    });
  }

  render() {
    return (
      <div>
        <div className="login-close-text-clear"></div>
        <div id="login-old-password-label-and-input">
          <label id="login-old-password-label" for="login-old-password">
            Current Password
          </label>
          <input id="login-old-password" type="password" onKeyDown={this.onKeyDown.bind(this)} valueLink={this.linkState('oldPassword')}/>
        </div>
        <div id="login-password-label-and-input">
          <label id="login-password-label" for="login-password">
            New Password
          </label>
          <input id="login-password" type="password" onKeyDown={this.onKeyDown.bind(this)} valueLink={this.linkState('newPassword')}/>
        </div>
        <div id="login-password-again-label-and-input">
          <label id="login-password-again-label" for="login-password-again">
            New Password (again)
          </label>
          <input id="login-password-again" type="password" onKeyDown={this.onKeyDown.bind(this)} valueLink={this.linkState('newPasswordRepeat')}/>
        </div>
        <div className="login-button login-button-form-submit" id="login-buttons-do-change-password" onClick={this.onSubmit.bind(this)}>
          Change password
        </div>
      </div>
    );
  }
}

class LoggedInMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changePassword: false
    };
  }

  onChangePasswordClick() {
    this.setState({
      changePassword: true
    });
  }

  onChangePassword() {
    this.props.onCloseClick();
    this.setState({
      changePassword: false
    });
  }

  onLogoutClick() {
    Meteor.logout(() => {
      this.props.onCloseClick();
    });
  }

  render() {
    if (this.props.closed) {
      return (<div></div>);
    }

    let content = this.state.changePassword && (
      <ChangePasswordMenu
        onChangePassword={this.onChangePassword.bind(this)}
      />
    ) || (
      <div>
        <div className="login-close-text-clear"></div>
        <div className="login-button" id="login-buttons-open-change-password" onClick={this.onChangePasswordClick.bind(this)}>
          Change password
        </div>
        <div className="login-button" id="login-buttons-logout" onClick={this.onLogoutClick.bind(this)}>
          Sign out
        </div>
      </div>
    );

    return (
      <div id="login-dropdown-list" className="accounts-dialog">
        <a className="login-close-text" onClick={this.props.onCloseClick.bind(this)}>Close</a>
        {content}
      </div>
    );
  }
}

@reactMixin.decorate(ReactMeteorData)
export default class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: true,
      loginText: 'Sign in ▾'
    };
  }

  getMeteorData() {
    var user = Meteor.user();

    return {
      loginText: user && (
        user.username ||
        (user.profile && user.profile.name) ||
        (user.emails && user.emails[0] && user.emails[0].address)
      ) + ' ▾' || '',
      user: user
    };
  }

  onSignInClick() {
    this.setState({
      closed: false
    });
  }

  onCloseClick() {
    this.setState({
      closed: true
    });
  }

  render() {
    var dropdown = this.data.user && (
      <LoggedInMenu
        closed={this.state.closed}
        onCloseClick={this.onCloseClick.bind(this)}
      />
    ) || (
      <LoginMenu
        closed={this.state.closed}
        onCloseClick={this.onCloseClick.bind(this)}
      />
    );

    return (
      <div id="login-buttons" className="login-buttons-dropdown-align-">
        <div className="login-link-and-dropdown-list">
          <a className="login-link-text" id="login-sign-in-link" onClick={this.onSignInClick.bind(this)}>{this.data.loginText || this.state.loginText}</a>
          {dropdown}
        </div>
      </div>
    );
  }
}
