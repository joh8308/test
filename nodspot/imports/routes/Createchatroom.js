import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import SpotUserCollection from '../collections/spotUserCollection';

import {
  Row,
  Col,
  Icon,
  Grid,
  Label,
  Nav,
  NavItem,
  Image,
  Badge,
  Panel,
  Button,
  PanelLeft,
  InputGroup,
  FormGroup,
  Modal,
  Popover,
  Tab,
  Tooltip,
  PanelBody,
  Form,
  ListGroup,
  LoremIpsum,
  OverlayTrigger,
  ButtonGroup,
  ButtonToolbar,
  ListGroupItem,
  PanelContainer,
  PanelTabContainer,
  PanelHeader,
  PanelFooter,
  FormControl,
} from '@sketchpixy/rubix';

class PanelLeftHorizontal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchUser: ''
    };
  }

  render() {
    return (
      <div>
      {this.props.users && this.props.users.length>0 ?
        this.props.users.map((user)=>{
          console.log(user);
          return (
            <PanelTabContainer id='panel-body-left' defaultActiveKey="home" key={user._id}>
              <PanelHeader className='bg-green'>
                <Grid>
                  <Row>
                    <Col xs={12} className='fg-white'>
                      <h4>개발팀</h4>
                    </Col>
                  </Row>
                </Grid>
              </PanelHeader>
              <Panel horizontal style={{marginTop:-12}}>
                <PanelLeft className='bg-green fg-white panel-sm-2'>
                  <Nav bsStyle="tabs">
                    <NavItem eventKey="home">
                       초대
                    </NavItem>
                    <NavItem eventKey="user">
                      취소
                    </NavItem>
                  </Nav>
                </PanelLeft>
                <PanelBody className='panel-sm-10' style={{paddingTop: 0}}>
                  <Grid>
                    <Row>
                      <Col xs={12}>
                        <Tab.Content animation={false}>
                          <Tab.Pane eventKey="home" style={{marginLeft:20, marginTop:10}}>
                            <Image src='/imgs/app/avatars/john.jpg' height='50' width='50' style={{display: 'block', borderRadius: 100, border: '2px solid #fff'}} />
                            <p style={{marginLeft:-12}}>{user.name.last+' '+user.name.first}</p>
                          </Tab.Pane>
                          <Tab.Pane eventKey="user" style={{marginLeft:20, marginTop:10}}>
                            <Image src='/imgs/app/avatars/john.jpg' height='50' width='50' style={{display: 'block', borderRadius: 100, border: '2px solid #fff'}} />
                            <p style={{marginLeft:-12}}>{user.name.last+' '+user.name.first}</p>
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Grid>
                </PanelBody>
              </Panel>
            </PanelTabContainer>
          )
        })
      : '' }
      </div>
    );
  }
}

@withRouter
class CreateChatroom extends React.Component {
  static propTypes = {
    createitem: React.PropTypes.array
  };

  constructor(props){
    super(props)
    this.state = {
      activeItem: 'name',
      activeName: 'green',
      activePhone: 'gray',
      activeEmail: 'gray',
      createItem: '',
      arrayvar: []
    };
  }

  handleName(){
    this.setState({
      activeItem: 'name',
      activeName: 'green',
      activePhone: 'gray',
      activeEmail: 'gray'
    });
  }

  handlePhone(){
    this.setState({
      activeItem: 'phone',
      activeName: 'gray',
      activePhone: 'green',
      activeEmail: 'gray'
    });
  }

  handleEmail(){
    this.setState({
      activeItem: 'email',
      activeName: 'gray',
      activePhone: 'gray',
      activeEmail: 'green'
    });
  }

  handleSearch(){
    let keyword=ReactDOM.findDOMNode(this.refs.searchform).value.trim();
    let subsItem={};
    var arrayvar = this.state.arrayvar.slice();
    arrayvar.push(keyword);
    this.setState({ arrayvar: arrayvar },function(){
      console.log(this.state.arrayvar);
    });


    if(this.state.activeItem=='name'){
      subsItem=Meteor.subscribe('searchByName', keyword, function() {
        console.log('data');
        console.log(SpotUserCollection.find().fetch());

        this.setState({
          createItem: SpotUserCollection.find().fetch()
        });
      }.bind(this));
    }

    else if(this.state.activeItem=='phone'){
      subsItem=Meteor.subscribe('searchByPhone', keyword, function() {
        console.log('data');
        console.log(SpotUserCollection.find().fetch());


        this.setState({
          createItem: SpotUserCollection.find().fetch()
        });
      }.bind(this));
    }
    else {
      subsItem=Meteor.subscribe('searchByEmail', keyword, function() {
        console.log('data');
        console.log(SpotUserCollection.find().fetch());

        this.setState({
          createItem: SpotUserCollection.find().fetch()
        });
      }.bind(this));
    }
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.router.push('/ltr/mailbox/compose');
  }

  render() {
   return (
     <div ref='chatcontainer'>
       <PanelContainer className='inbox' style={{position:'fixed', left:250, right:0, marginTop:-30, zIndex:100000}}>
         <Panel>
           <PanelBody style={{paddingTop: 0}}>
             <Grid>
               <Row>
                 <Col xs={8} style={{paddingTop: 12.5}}>
                   <ButtonToolbar className='inbox-toolbar'>
                     <ButtonGroup>
                       <Button bsStyle={this.state.activeName} onClick={::this.handleName.bind(this)}>
                         이름
                       </Button>
                       <Button bsStyle={this.state.activePhone} onClick={this.handlePhone.bind(this)} >
                         전화번호
                       </Button>
                       <Button bsStyle={this.state.activeEmail} onClick={this.handleEmail.bind(this)}>
                         이메일
                       </Button>
                     </ButtonGroup>
                   </ButtonToolbar>
                   <Form style={{marginTop:30, width:'150%'}}>
                     <FormGroup>
                       <InputGroup>
                         <FormControl type='text' ref='searchform' placeholder='Enter of keyword...' className='border-orange border-focus-darkorange'/>
                         <InputGroup.Button>
                           <Button type='button' bsStyle='orange' onClick={this.handleSearch.bind(this)}>
                             <Icon glyph='icon-fontello-search'/>
                           </Button>
                         </InputGroup.Button>
                       </InputGroup>
                     </FormGroup>
                     <Modal.Footer>
                       <Button bsStyle='danger'>취소</Button>
                       <Button style={{marginLeft:10}} bsStyle='green'>만들기</Button>
                     </Modal.Footer>
                   </Form>
                 </Col>
               </Row>
             </Grid>
             </PanelBody>
           </Panel>
         </PanelContainer>
         <Grid>
           <Row style={{marginTop:200}}>
             <Col xs={12}>
              <PanelLeftHorizontal users={this.state.createItem} />
             </Col>
           </Row>
         </Grid>
       </div>
   );
 }
}

export default createContainer((params) => {
  let { id } = params;
  let _id = id;

  Meteor.subscribe('searchUsers2', 'YoHan');

  return {
    createitem: SpotUserCollection.find({_id}).fetch() || []
  };
}, CreateChatroom);
