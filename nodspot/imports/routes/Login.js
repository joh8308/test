import React from 'react';
import classNames from 'classnames';
import { browserHistory, Link, withRouter } from 'react-router';
import CRYTPO from 'crypto-js'

import {
  Row,
  Col,
  Modal,
  Icon,
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
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(){
    let Id=ReactDOM.findDOMNode(this.refs.Id).value.trim();
    let password=ReactDOM.findDOMNode(this.refs.password).value.trim();
    let sha256Password = CRYTPO.SHA256(password).toString();

    Meteor.call('spotLogin',{userLang:'ko', username:Id, password:sha256Password}, function(error, result){
      if(!error && result.status){
        browserHistory.push('/ltr/mailbox/inbox');
      }
      else{
        this.basicModal.open('아이디 또는 비밀번호가 다릅니다.');
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
                          <h3 style={{margin: 0, padding: 25}}>Sign in to NODSPOT</h3>
                        </div>
                        <div className='bg-hoverblue fg-black50 text-center' style={{padding: 12.5}}>
                          <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                            <Form onSubmit={this.handleSubmit.bind(this)}>
                              <FormGroup controlId='emailaddress'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-user' />
                                  </InputGroup.Addon>
                                  <FormControl autoFocus type='email' ref='Id' className='border-focus-blue' placeholder='ID' />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup controlId='password'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-key' />
                                  </InputGroup.Addon>
                                  <FormControl type='password' ref='password' className='border-focus-blue' placeholder='password' />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <Grid>
                                  <Row>
                                    <Col xs={6} collapseLeft collapseRight style={{paddingTop: 10}}>
                                      <Link to={::this.getPath('signup')}>Create account</Link>
                                    </Col>
                                    <Col xs={6} collapseLeft collapseRight className='text-right'>
                                      <Button outlined lg type='button' bsStyle='blue' onClick={this.handleSubmit.bind(this)}>Login</Button>
                                      <BasicModal ref={(c) => this.basicModal = c} />
                                    </Col>
                                  </Row>
                                </Grid>
                                <div style={{marginTop: 25}}>
                                  Forgot <Link to={::this.getPath('forgotid')}>ID</Link> or <Link to={::this.getPath('forgotpass')}>password?</Link>
                                </div>
                              </FormGroup>
                            </Form>
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
