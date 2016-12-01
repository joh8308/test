import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router';

import {
  Row,
  Col,
  Icon,
  Grid,
  Label,
  Badge,
  Panel,
  Button,
  PanelLeft,
  PanelBody,
  ListGroup,
  LoremIpsum,
  ButtonGroup,
  ButtonToolbar,
  ListGroupItem,
  PanelContainer,
  PanelHeader,
  PanelFooter,
  FormControl,
} from '@sketchpixy/rubix';

class InboxNavItem extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={8} collapseLeft collapseRight>
            <Icon glyph={this.props.glyph} className='inbox-item-icon'/>
            <span>{this.props.title}</span>
          </Col>
          <Col xs={4} className='text-right' collapseLeft collapseRight>
            <div style={{marginTop: 5}}><Label className={this.props.labelClass}>{this.props.labelValue}</Label></div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

class InboxNavTag extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} collapseLeft collapseRight>
            <Badge className={this.props.badgeClass}>{' '}</Badge>
            <span>{this.props.title}</span>
          </Col>
        </Row>
      </Grid>
    );
  }
}

class chatItem extends React.Component {
  render(){
    return(
      <div className="direct-chat-msg right">
        <div className="direct-chat-info clearfix">
          <span className="direct-chat-name pull-right">John Jeong</span>
        </div>
        <img className="direct-chat-img" src="/imgs/app/avatars/john-avatar.png" alt="Message User Image" />
        <div className="inbox-date text-right direct-chat-text" style={{marginRight:10, borderColor:'#56b596', background:'#56b596', color:'#fff'}}>
          Hello, Crystal.
        </div>
        <div className="direct-chat-info clearfix" style={{marginTop:50, marginRight:60}}>
          <span className="direct-chat-timestamp pull-right">23 Jan 2:05 pm</span>
        </div>
      </div>
    )
  }
}

@withRouter
class InboxItem extends React.Component {
  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.router.push('/ltr/mailbox/mail');
  }
  render() {
    var classes = classNames({
      'inbox-item': true,
      'unread': this.props.unread
    });

    var linkProps = {
      href: '/ltr/mailbox/mail',
      onClick: ::this.handleClick,
      className: classes,
    };

    return (
        <div className='inbox-avatar'>
          <img src={this.props.src} width='40' height='40' className={this.props.imgClass + ' hidden-xs'} />
          <div className='inbox-avatar-name'>
            <div className='fg-darkgrayishblue75'>{this.props.name}</div>
            <div><small><Badge className={this.props.labelClass} style={{marginRight: 5, display: this.props.labelValue ? 'inline':'none'}}>{this.props.labelValue}</Badge><span>{this.props.description}</span></small></div>
          </div>
          <div className='inbox-date hidden-sm hidden-xs fg-darkgray40 text-right'>
            <div style={{position: 'relative', top: 5, color:'#5D5B5B'}}>{this.props.date}</div>
          </div>
          <div className='inbox-date hidden-sm hidden-xs fg-darkgray40 text-right'>
            <div className='direct-chat-text' style={{position: 'relative', top: 5, color:'#5D5B5B'}}>{this.props.msg}</div>
          </div>
        </div>
    );
  }
}

@withRouter
export default class Inbox extends React.Component {
  // componentDidMount() {
  //     let chat=ReactDOM.findDOMNode(this.refs.chatcontainer).value.trim();
  //     chat.scrollTop = 0
  // }
  //
  // createTodo(event) {
  //   event.preventDefault();
  //   const input = this.newTodoInput;
  //   if (input.value.trim()) {
  //     Meteor.call('sendMessage',{
  //       text: ReactDOM.findDOMNode(this.refs.chat).value.trim()
  //     }, displayError);
  //     input.value = '';
  //   }
  // }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.router.push('/ltr/mailbox/compose');
  }

  renderRightchat(){
    return(
      <div className="direct-chat-msg right">
        <div className="direct-chat-info clearfix">
          <span className="direct-chat-name pull-right">John Jeong</span>
        </div>
        <img className="direct-chat-img" src="/imgs/app/avatars/john-avatar.png" alt="Message User Image" />
        <div className="inbox-date text-right direct-chat-text" style={{marginRight:10, borderColor:'#56b596', background:'#56b596', color:'#fff'}}>
          Hello, Crystal.
        </div>
        <div className="direct-chat-info clearfix" style={{marginTop:50, marginRight:60}}>
          <span className="direct-chat-timestamp pull-right">23 Jan 2:05 pm</span>
        </div>
      </div>
    );
  }

  renderLeftchat(){
    return(
      <div className="direct-chat-msg">
        <div className="direct-chat-info clearfix">
          <span className="direct-chat-name pull-left">Crystal Ford</span>
        </div>
        <img className="direct-chat-img" src="/imgs/app/avatars/avatar11.png" alt="Message User Image" />
        <div className="inbox-date text-left direct-chat-text" style={{textAlign:'left',marginLeft:10, float:'left', borderColor:'#3c8dbc', background:'#3c8dbc', color:'#fff'}}>
          Good evening, John!
        </div>
        <div className="direct-chat-info clearfix" style={{marginTop:50, marginLeft:60}}>
          <span className="direct-chat-timestamp pull-left">25 Jan 1:28 pm</span>
        </div>
      </div>
    );
  }

  rendersendpanel(){
    return(
      <PanelContainer style={{position:'fixed', bottom:-30, left:250, right:0}}>
        <PanelBody>
          <FormControl componentClass='textarea' ref='chat' rows='3' placeholder="Enter message." style={{border: 'none'}} />
        </PanelBody>
        <PanelFooter className='fg-black75 bg-green' style={{padding: '12.5px 25px'}}>
          <Grid>
            <Row>
              <Col xs={6} collapseLeft collapseRight>
                <a href='#' style={{border: 'none'}}><Icon glyph='icon-dripicons-location icon-1-and-quarter-x fg-text fg-black75' style={{marginRight: 25}} /></a>
                <a href='#' style={{border: 'none'}}><Icon glyph='icon-dripicons-camera icon-1-and-quarter-x fg-text fg-black75' style={{marginRight: 25}} /></a>
              </Col>
              <Col xs={6} className='text-right' collapseLeft collapseRight>
                <Button bsStyle='darkblue'>send</Button>
              </Col>
            </Row>
          </Grid>
        </PanelFooter>
      </PanelContainer>
    );
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
                       <Button bsStyle='blue' onClick={::this.handleClick}>
                         대화 초대하기
                       </Button>
                     </ButtonGroup>
                     <ButtonGroup>
                       <Button bsStyle='red' onClick={::this.handleClick}>
                         대화방 나가기
                       </Button>
                     </ButtonGroup>
                   </ButtonToolbar>
                 </Col>
                 <Col xs={4} className='text-right'>
                   <div className='inbox-avatar'>
                     <img src='/imgs/app/avatars/john-avatar.png' width='40' height='40' style={{marginRight:10}} />
                     <img src='/imgs/app/avatars/avatar11.png' width='40' height='40' style={{marginRight:10}} />
                   </div>
                 </Col>
               </Row>
             </Grid>
             </PanelBody>
           </Panel>
         </PanelContainer>
         <Grid>
           <Row  style={{marginTop:50}}>
             <Col xs={12}>
               <div className="direct-chat-msg right">
                 <div className="direct-chat-info clearfix">
                   <span className="direct-chat-name pull-right">John Jeong</span>
                 </div>
                 <img className="direct-chat-img" src="/imgs/app/avatars/john-avatar.png" alt="Message User Image" />
                 <div className="inbox-date text-right direct-chat-text" style={{marginRight:10, borderColor:'#56b596', background:'#56b596', color:'#fff'}}>
                   Hello, Crystal.
                 </div>
                 <div className="direct-chat-info clearfix" style={{marginTop:50, marginRight:60}}>
                   <span className="direct-chat-timestamp pull-right">23 Jan 2:05 pm</span>
                 </div>
               </div>
               <div className="direct-chat-msg">
                 <div className="direct-chat-info clearfix">
                   <span className="direct-chat-name pull-left">Crystal Ford</span>
                 </div>
                 <img className="direct-chat-img" src="/imgs/app/avatars/avatar11.png" alt="Message User Image" />
                 <div className="inbox-date text-left direct-chat-text" style={{textAlign:'left',marginLeft:10, float:'left', borderColor:'#3c8dbc', background:'#3c8dbc', color:'#fff'}}>
                   Good evening, John!
                 </div>
                 <div className="direct-chat-info clearfix" style={{marginTop:50, marginLeft:60}}>
                   <span className="direct-chat-timestamp pull-left">25 Jan 1:28 pm</span>
                 </div>
               </div>
               <div className="direct-chat-msg right">
                 <div className="direct-chat-info clearfix">
                   <span className="direct-chat-name pull-right">John Jeong</span>
                 </div>
                 <img className="direct-chat-img" src="/imgs/app/avatars/john-avatar.png" alt="Message User Image" />
                 <div className="inbox-date text-right direct-chat-text" style={{marginRight:10, borderColor:'#56b596', background:'#56b596', color:'#fff'}}>
                   We have a lunch meeting.
                 </div>
                 <div className="direct-chat-info clearfix" style={{marginTop:50, marginRight:60}}>
                   <span className="direct-chat-timestamp pull-right">23 Jan 2:05 pm</span>
                 </div>
               </div>
               <div className="direct-chat-msg">
                 <div className="direct-chat-info clearfix">
                   <span className="direct-chat-name pull-left">Crystal Ford</span>
                 </div>
                 <img className="direct-chat-img" src="/imgs/app/avatars/avatar11.png" alt="Message User Image" />
                 <div className="inbox-date text-left direct-chat-text" style={{textAlign:'left',marginLeft:10, float:'left', borderColor:'#3c8dbc', background:'#3c8dbc', color:'#fff'}}>
                   Oh, really?
                 </div>
                 <div className="direct-chat-info clearfix" style={{marginTop:50, marginLeft:60}}>
                   <span className="direct-chat-timestamp pull-left">25 Jan 1:28 pm</span>
                 </div>
               </div>
               <div className="direct-chat-msg">
                 <div className="direct-chat-info clearfix">
                   <span className="direct-chat-name pull-left">Crystal Ford</span>
                 </div>
                 <img className="direct-chat-img" src="/imgs/app/avatars/avatar11.png" alt="Message User Image" />
                 <div className="inbox-date text-left direct-chat-text" style={{textAlign:'left',marginLeft:10, float:'left', borderColor:'#3c8dbc', background:'#3c8dbc', color:'#fff'}}>
                   Sorry, I have plans this afternoon.
                 </div>
                 <div className="direct-chat-info clearfix" style={{marginTop:50, marginLeft:60}}>
                   <span className="direct-chat-timestamp pull-left">25 Jan 1:28 pm</span>
                 </div>
               </div>
               <div className="direct-chat-msg right">
                 <div className="direct-chat-info clearfix">
                   <span className="direct-chat-name pull-right">John Jeong</span>
                 </div>
                 <img className="direct-chat-img" src="/imgs/app/avatars/john-avatar.png" alt="Message User Image" />
                 <div className="inbox-date text-right direct-chat-text" style={{marginRight:10, borderColor:'#56b596', background:'#56b596', color:'#fff'}}>
                   I want to cancel plan.
                 </div>
                 <div className="direct-chat-info clearfix" style={{marginTop:50, marginRight:60}}>
                   <span className="direct-chat-timestamp pull-right">23 Jan 2:05 pm</span>
                 </div>
               </div>
               <div className="direct-chat-msg right">
                 <div className="direct-chat-info clearfix">
                   <span className="direct-chat-name pull-right">John Jeong</span>
                 </div>
                 <img className="direct-chat-img" src="/imgs/app/avatars/john-avatar.png" alt="Message User Image" />
                 <div className="inbox-date text-right direct-chat-text" style={{marginRight:10, borderColor:'#56b596', background:'#56b596', color:'#fff'}}>
                   Hurry up.
                 </div>
                 <div className="direct-chat-info clearfix" style={{marginTop:50, marginRight:60}}>
                   <span className="direct-chat-timestamp pull-right">23 Jan 2:05 pm</span>
                 </div>
               </div>
               <div className="direct-chat-msg">
                 <div className="direct-chat-info clearfix">
                   <span className="direct-chat-name pull-left">Crystal Ford</span>
                 </div>
                 <img className="direct-chat-img" src="/imgs/app/avatars/avatar11.png" alt="Message User Image" />
                 <div className="inbox-date text-left direct-chat-text" style={{textAlign:'left',marginLeft:10, float:'left', borderColor:'#3c8dbc', background:'#3c8dbc', color:'#fff'}}>
                   Sorry, John. Can we reschedule?
                 </div>
                 <div className="direct-chat-info clearfix" style={{marginTop:50, marginLeft:60}}>
                   <span className="direct-chat-timestamp pull-left">25 Jan 1:28 pm</span>
                 </div>
               </div>
               <div className="direct-chat-msg right">
                 <div className="direct-chat-info clearfix">
                   <span className="direct-chat-name pull-right">John Jeong</span>
                 </div>
                 <img className="direct-chat-img" src="/imgs/app/avatars/john-avatar.png" alt="Message User Image" />
                 <div className="inbox-date text-right direct-chat-text" style={{marginRight:10, borderColor:'#56b596', background:'#56b596', color:'#fff'}}>
                   You haven't seen the last of me.
                 </div>
                 <div className="direct-chat-info clearfix" style={{marginTop:50, marginRight:60}}>
                   <span className="direct-chat-timestamp pull-right">23 Jan 2:05 pm</span>
                 </div>
               </div>
               <div className="direct-chat-msg right">
                 <div className="direct-chat-info clearfix">
                   <span className="direct-chat-name pull-right">John Jeong</span>
                 </div>
                 <img className="direct-chat-img" src="/imgs/app/avatars/john-avatar.png" alt="Message User Image" />
                 <div className="inbox-date text-right direct-chat-text" style={{marginRight:10, borderColor:'#56b596', background:'#56b596', color:'#fff'}}>
                   See you next Monday.
                 </div>
                 <div className="direct-chat-info clearfix" style={{marginTop:50, marginRight:60}}>
                   <span className="direct-chat-timestamp pull-right">23 Jan 2:05 pm</span>
                 </div>
               </div>
             </Col>
           </Row>
         </Grid>
         <div style={{marginTop:100}}></div>
         {this.rendersendpanel()}
       </div>
   );
 }
}
