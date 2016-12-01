import React from 'react';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router';

import {
  Row,
  Col,
  Icon,
  Modal,
  Grid,
  Form,
  Badge,
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

@withRouter
export default class Forgotpass extends React.Component {
  constructor(props) {
    super(props);
    this.sendmail=this.sendmail.bind(this);
    this.sendmsg=this.sendmsg.bind(this);
  }

  sendmail(){
    let id = ReactDOM.findDOMNode(this.refs.emailid).value.trim();

    Meteor.call('request.reset.password.email', {userLang:'ko', username:id},function(error, result){
      if(!error && result.status){
        this.basicModal.open('이메일로 비밀번호 재설정 주소를 발송하였습니다.');
      }
      else{
        this.basicModal.open('가입되지 않은 아이디입니다.');
        return false;
      }
    }.bind(this));
  }

  sendmsg(){
    let id = ReactDOM.findDOMNode(this.refs.phoneid).value.trim();

    Meteor.call('request.reset.password.sms', {userLang:'ko', username:id},function(error, result){
      if(!error && result.status){
        this.basicModal.open('휴대폰 메시지로 비밀번호 재설정 주소를 발송하였습니다.');
      }
      else{
        this.basicModal.open('가입되지 않은 아이디입니다.');
        return false;
      }
    }.bind(this));
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
                          <h3 style={{margin: 0, padding: 25}}>Find Password</h3>
                        </div>
                        <div>
                          <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                            <Form onSubmit={::this.back}>
                              <FormGroup controlId='emailaddress'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-mail' />
                                  </InputGroup.Addon>
                                  <FormControl type='email' ref='emailid' className='border-focus-blue' placeholder='Enter of ID' />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <Grid>
                                  <Row>
                                    <Col xs={12} collapseLeft collapseRight>
                                      <Button type='button' outlined lg bsStyle='blue' block onClick={this.sendmail.bind(this)}>Send Mail</Button>
                                      <BasicModal ref={(c) => this.basicModal = c} />
                                    </Col>
                                  </Row>
                                </Grid>
                              </FormGroup>
                            </Form>
                            <Form onSubmit={::this.back}>
                              <FormGroup controlId='password'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-mobile' />
                                  </InputGroup.Addon>
                                  <FormControl type='mobile' ref='phoneid' className='border-focus-blue' placeholder='Enter of ID' />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <Grid>
                                  <Row>
                                    <Col xs={12} collapseLeft collapseRight>
                                      <Button type='button' outlined lg bsStyle='blue' block onClick={this.sendmsg.bind(this)}>Send Message</Button>
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
