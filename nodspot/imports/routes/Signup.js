import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Random} from 'meteor/random';
import {moment} from 'meteor/momentjs:moment';

import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Link, withRouter} from 'react-router';

import {
  Row,
  Col,
  Icon,
  Grid,
  Form,
  Badge,
  Modal,
  Panel,
  Button,
  PanelBody,
  FormGroup,
  LoremIpsum,
  InputGroup,
  FormControl,
  ButtonGroup,
  ButtonToolbar,
  PanelContainer,
} from '@sketchpixy/rubix';

class BasicModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  close() {
    this.setState({
      showModal: false
    });
  }

  open(text) {
    this.setState({
      showModal: true
    });
    this.setState({
      warning: text
    });
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={::this.close}>
        <Modal.Header closeButton>
          <Modal.Title>경고</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.warning}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={::this.close} bsStyle='danger'>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class ModalSize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      totalTime: 180000,
      timer: null,
      duplicated: true,
      verify: false,
      token: ''
    };
    this.calcTime = this.calcTime.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  calcTime(){
    this.setState({
      totalTime: this.state.totalTime - 1000
    }, function() {
      if (this.state.totalTime == 0){
        this.close();
      }
    });
  }

  close() {
    clearInterval(this.timer);

    this.setState({
      showModal: false
    });
    this.props.phoneverify(this.state.verify);
  }

  open() {
    let duplicate;
    this.setState({
      showModal: true
    },function () {
      this.setState({
        totalTime: 180000
      });
    });
    Meteor.call('checkDuplicatePhone', {userLang:'ko', countrycode:'82', clientId:this.props.clientId, number:this.props.phonenumber}, function(error, result){
      if (!error && result.status) {
        if (result.data.used) {
            console.log('SUCCESSED and data usable.... : phonenumber is used --> not usable');
        }
        else {
          this.setState({
            duplicated: result.data.used
          },function(){
            Meteor.call('requestSendVerificationPhone', {userLang:'ko', phone:this.props.phonenumber, isMember:false}, function(error, result){
              if(!error && result.status){
                this.setState({
                  token: result.data.token
                },function(){
                  this.timer = setInterval(this.calcTime, 1000);
                });
              }
              else{
                alert('error:'+error);
              }
            }.bind(this));
          });
        }
      } else {
        alert('unknown error...');
      }
    }.bind(this));
  }

  resend_verify(){
    this.basicModal.open('인증번호를 재발송했습니다.');
    Meteor.call('checkDuplicatePhone', {userLang:'ko', countrycode:'82', clientId:this.props.clientId, number:this.props.phonenumber}, function(error, result){
      if (!error && result.status) {
        if (result.data.used) {
            console.log('SUCCESSED and data usable.... : phonenumber is used --> not usable');
        }
        else {
          this.setState({
            duplicated: result.data.used
          },function(){
            Meteor.call('requestSendVerificationPhone', {userLang:'ko', phone:this.props.phonenumber, isMember:false}, function(error, result){
              if(!error && result.status){
                this.setState({
                  token: result.data.token
                });
              }
              else{
                alert('error:'+error);
              }
            }.bind(this));
          });
        }
      } else {
        alert('unknown error');
      }
    }.bind(this));
  }

  _verify() {
    let input=ReactDOM.findDOMNode(this.refs.verifyInput).value.trim();
    Meteor.call('verifyPhone', {userLang:'ko',phone:this.props.phonenumber,token:this.state.token, sms:input, isMember:false}, function(error, result){
      let verify=false;

      if(!error && result.status){
        this.setState({
          duplicated: true,
          verify: true
        });
        this.close();
      }
      else{
        this.setState({
          showModal: false,
          dupulicated: false
        });
        this.close();
      }
    }.bind(this));

  }

  render() {
    return (
      <Modal show={this.state.showModal} bsSize={this.props.size}>
        <Modal.Header>
          <Modal.Title>인증하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" autoFocus value={this.state.value} onChange={this.handleChange} maxLength={6} ref='verifyInput' style={{marginRight:10, marginBottom:20}} /> 남은 시간 {moment(this.state.totalTime).format('mm:ss')}
            <Button onClick={this.resend_verify.bind(this)}>인증번호 재전송</Button>
            <BasicModal ref={(c) => this.basicModal = c} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={::this.close} bsStyle='danger'>취소</Button>
          <Button onClick={::this._verify} bsStyle='primary'>확인</Button>
          <BasicModal ref={(c) => this.basicModal = c} />
        </Modal.Footer>
      </Modal>
    );
  }
}

@withRouter
export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: Random.id(),
      phonenumber: '',
      verify: false,
      idduplicated: false,
      emailduplicated: false,
      phoneduplicated: false
    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.phoneverify=this.phoneverify.bind(this);
    this.verifyPopup=this.verifyPopup.bind(this);
    this.changephone=this.changephone.bind(this);
  }

  changephone(){
    this.setState({
      verify: false
    });
  }

  duplicateid(username){
    let duplicate=false;
    Meteor.call('checkDuplicateId', {userLang:'ko', countrycode:'82', clientId:this.state.clientId, userId:username}, function(error, result){
      if(!error && result.status) {
        if (result.data.used) {
          this.setState({
            idduplicated: true
          });
        }
      }
    }.bind(this));
  }

  duplicatemail(email){
    let duplicate=false;
    Meteor.call('checkDuplicateEmail', {userLang:'ko', countrycode:'82', clientId:this.state.clientId, email:email}, function(error, result){
      if(!error && result.status) {
        if (result.data.used) {
          this.setState({
            emailduplicated: true
          });
        }
      }
    }.bind(this));
  }

  duplicatephone(phonenumber){
    Meteor.call('checkDuplicatePhone', {userLang:'ko', countrycode:'82', clientId:this.state.clientId, number:phonenumber}, function(error, result){
      if (!error && result.status) {
        if (result.data.used) {
          this.setState({
            phoneduplicated: true
          });
        }
      }
    }.bind(this));
  }

  handleSubmit() {
    let username = ReactDOM.findDOMNode(this.refs.username).value.trim();
    let password = ReactDOM.findDOMNode(this.refs.password).value.trim();
    let confirmpassword = ReactDOM.findDOMNode(this.refs.confirmpassword).value.trim()
    let email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    let firstname = ReactDOM.findDOMNode(this.refs.firstname).value.trim();
    let middlename = ReactDOM.findDOMNode(this.refs.middlename).value.trim();
    let lastname = ReactDOM.findDOMNode(this.refs.lastname).value.trim();
    let phonenumber = ReactDOM.findDOMNode(this.refs.mobile).value.trim();
    let mailExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
    let phoneExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    this.setState({
      phonenumber: phonenumber
    });

    this.duplicateid(username);

    if(this.state.idduplicated==true){
      this.basicModal.open('사용중인 아이디입니다.');
      this.setState({
        idduplicated:false
      });
      return false;
    }

    this.duplicatemail(email);

    if(this.state.emailduplicated==true){
      this.basicModal.open('사용중인 이메일입니다.');
      this.setState({
        emailduplicated:false
      });
      return false;
    }

    this.duplicatephone(phonenumber);

    if(this.state.phoneduplicated==true){
      this.basicModal.open('사용중인 전화번호입니다.');
      this.setState({
        phoneduplicated:false
      });
      return false;
    }

    if (username.length < 1) {
      this.basicModal.open('아이디를 입력하세요.');
      return;
    }

    if (password.length < 6) {
      this.basicModal.open('비밀번호는 6자이상 입력해야합니다.');
      return;
    }

    if (password != confirmpassword) {
      this.basicModal.open('비밀번호 확인을 잘못 입력하였습니다.');
      return;
    }

    if (firstname.length < 1) {
      this.basicModal.open('이름을 입력하세요.');
      return;
    }

    if (lastname.length < 1) {
      this.basicModal.open('성을 입력하세요.');
      return;
    }

    if (email.length < 1) {
      this.basicModal.open('이메일을 입력하세요.');
      return;
    }

    if (!email.match(mailExp)) {
      this.basicModal.open('이메일 형식이 맞지 않습니다.');
      return;
    }

    if (phonenumber.length < 1) {
      this.basicModal.open('휴대폰 번호를 입력하세요.');
      return;
    }

    if (!phonenumber.match(phoneExp)) {
      this.basicModal.open('휴대폰 형식이 맞지 않습니다.');
      return;
    }

    if(this.state.verify==false){
      this.basicModal.open('휴대폰 인증이 완료되지 않았습니다');
      return;
    }

    Session.set('password', password);

    Accounts.createUser({
      'username': ReactDOM.findDOMNode(this.refs.username).value.trim(),
      'email': ReactDOM.findDOMNode(this.refs.email).value.trim(),
      'password': password,
      'profile': {
        'firstname': ReactDOM.findDOMNode(this.refs.firstname).value.trim(),
        'middlename': ReactDOM.findDOMNode(this.refs.middlename).value.trim(),
        'lastname': ReactDOM.findDOMNode(this.refs.lastname).value.trim(),
        'countrytelephonecode': '82',
        'phonenumber': ReactDOM.findDOMNode(this.refs.mobile).value.trim()
      }
    }, function(error, result) {
      if (Meteor.user()) {
        EncryptionUtils.onSignIn(password);
        //browserHistory.push('/ltr/mailbox/inbox');
        window.location.href='/ltr/mailbox/inbox';
      }
    });
  }

  back(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.router.goBack();
  }

  componentDidMount() {
    $('html').addClass('authentication');
  }

  componentWillUnmount() {
    $('html').removeClass('authentication');
  }

  getPath(path) {
    var dir = this.props.location.pathname.search('rtl') !== -1 ? 'rtl' : 'ltr';
    path = `/${dir}/${path}`;
    return path;
  }

  verifyPopup () {
    let phoneExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    let phonenum=ReactDOM.findDOMNode(this.refs.mobile).value.trim();
    Meteor.call('checkDuplicatePhone', {userLang:'ko', countrycode:'82', clientId:this.state.clientId, number:phonenum}, function(error, result){
      if (!error && result.status) {
        if (result.data.used) {
            this.basicModal.open('사용중인 번호입니다.');
          }
        else{
          this.setState({
            phonenumber: ReactDOM.findDOMNode(this.refs.mobile).value.trim()
          },function () {
            if (!this.state.phonenumber.match(phoneExp)) {
              this.basicModal.open('휴대폰 형식이 맞지 않습니다.');
              return;
            }
            else{
              this.smallModal.open();
            }
          });
        }
      }
    }.bind(this));
  }

  phoneverify(verify){
    if(verify == true){
      this.basicModal.open('휴대폰 인증이 완료되었습니다');
      this.setState({
        verify: true
      });

    }
    else{
      this.basicModal.open('휴대폰 인증이 완료되지 않았습니다');
      return false;
    }
  }

  render() {
    return (
      <div id='auth-container' className='login'>
        <div id='auth-row'>
          <div id='auth-cell'>
            <Grid>
              <Row>
                <Col sm={4} smOffset={4} xs={10} xsOffset={1} collapseLeft collapseRight>
                  <PanelContainer controls={false}>
                    <Panel>
                      <PanelBody style={{padding: 0}}>
                        <div className='text-center bg-darkblue fg-white'>
                          <h3 style={{margin: 0, padding: 25}}>Sign up</h3>
                        </div>
                        <div>
                          <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                            <Form>
                              <FormGroup controlId='username'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-user' />
                                  </InputGroup.Addon>
                                  <FormControl ref="username" autoFocus type='text' className='border-focus-blue' placeholder='Username' />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup controlId='password'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-key' />
                                  </InputGroup.Addon>
                                  <FormControl ref="password" type='password' className='border-focus-blue' placeholder='password' />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup controlId='password'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-key-inv' />
                                  </InputGroup.Addon>
                                  <FormControl ref='confirmpassword' type='password' className='border-focus-blue' placeholder='confirm password' />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup controlId='firstname'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-vcard' />
                                  </InputGroup.Addon>
                                  <FormControl ref='firstname' type='firstname' className='border-focus-blue' placeholder='firstname' />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup controlId='middlename'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-vcard' />
                                  </InputGroup.Addon>
                                  <FormControl ref='middlename' type='middlename' className='border-focus-blue' placeholder='middlename' />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup controlId='lastname'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-vcard' />
                                  </InputGroup.Addon>
                                  <FormControl ref='lastname' type='lastname' className='border-focus-blue' placeholder='lastname' />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup controlId='emailaddress'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-mail' />
                                  </InputGroup.Addon>
                                  <FormControl ref='email' type='email' className='border-focus-blue' placeholder='support@nod-bizware.com' />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup controlId='mobile'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-mobile' />
                                  </InputGroup.Addon>
                                  <FormControl ref='mobile' type='mobile' className='border-focus-blue' placeholder='010-OOOO-OOOO' onChange={this.changephone} />
                                </InputGroup>
                              </FormGroup>
                              <Button type='button' bsStyle='primary' onClick={this.verifyPopup.bind(this)} style={{marginLeft:200}}>휴대폰 인증</Button>
                              <ModalSize phoneverify={this.phoneverify} phonenumber={this.state.phonenumber} clientId={this.state.clientId} size='small' ref={(c) => this.smallModal = c} />
                              <FormGroup style={{marginTop:25}}>
                                <Grid>
                                  <Row>
                                    <Col xs={12} collapseLeft collapseRight>
                                      <Button type='button' outlined lg bsStyle='blue' block onClick={this.handleSubmit.bind(this)}>Create account</Button>
                                      <BasicModal ref={(c) => this.basicModal = c} />
                                    </Col>
                                  </Row>
                                </Grid>
                              </FormGroup>
                            </Form>
                          </div>
                          <div className='bg-hoverblue fg-black50 text-center' style={{padding: 25, paddingTop: 12.5}}>
                            <div style={{marginTop: 25}}>
                              Already have an account? <Link to={::this.getPath('login')}>Login</Link>
                            </div>
                          </div>
                        </div>
                      </PanelBody>
                    </Panel>
                  </PanelContainer>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
