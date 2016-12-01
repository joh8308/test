import React from 'react';

import {
  Grid, Row, Col, Button
} from '@sketchpixy/rubix';

class ChatNav extends React.Component {
  render() {
    return (
      <ul className='sidebar-nav' {...this.props}>
        {this.props.children}
      </ul>
    );
  }
}

class ChatItem extends React.Component {
  render() {
    var isOffline = true;
    var status = 'border-darkgray';
    if(this.props.idle) status = 'border-yellow';
    if(this.props.admin) status = 'border-red';
    if(this.props.online) status = 'border-green';
    if(status !== 'border-darkgray') isOffline = false;

    let props = {
      ...this.props,
    };

    delete props.idle;
    delete props.admin;
    delete props.online;
    delete props.name;
    delete props.avatar;

    return (
      <li tabIndex='-1' {...props}>
        <a href='#' tabIndex='-1'>
          <img src={`/imgs/app/avatars/${this.props.avatar}.png`} width='30' height='30' className={status} style={{borderWidth: 2, borderStyle: 'solid', borderRadius: 100, padding: 2, position: 'relative', top: -7, opacity: isOffline ? 0.4 : 1}} />
          <span className='name' style={{position: 'relative', top: -2, opacity: isOffline ? 0.4 : 1}}>{this.props.name}</span>
        </a>
      </li>
    );
  }
}

export default class Chat extends React.Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
            <br/>
            <div className='text-left' >
              <Button xs outlined bsStyle='blue' href='/ltr/createchatroom' style={{marginLeft:-5}}>
                그룹 만들기
              </Button>{' '}
            </div>
              <div className='sidebar-header' style={{color:'#89949B'}}>Development Team (4)</div>
              <div className='sidebar-nav-container'>
                <ChatNav style={{marginBottom: 0}}>
                  <ChatItem name='John Jeong' href='/' avatar='john-avatar' admin />
                  <ChatItem name='Jordyn Ouellet' avatar='avatar5' admin />
                  <ChatItem name='Angelina Mills' avatar='avatar10' online />
                  <ChatItem name='Crystal Ford' avatar='avatar11' />
                </ChatNav>
              </div>
              <div className='sidebar-header' style={{color:'#89949B'}}>Design Team (3)</div>
              <div className='sidebar-nav-container'>
                <ChatNav style={{marginBottom: 0}}>
                  <ChatItem name='Toby King' avatar='avatar7' admin />
                  <ChatItem name='Ju Lan' avatar='avatar13' online />
                  <ChatItem name='Lana Collin' avatar='avatar14' online />
                </ChatNav>
              </div>
              <div className='sidebar-header' style={{color:'#89949B'}}>Management Team (5)</div>
              <div className='sidebar-nav-container'>
                <ChatNav style={{marginBottom: 0}}>
                  <ChatItem name='Alexandra Mordin' avatar='avatar20' admin />
                  <ChatItem name='Jonas Schäfer' avatar='avatar17' online />
                  <ChatItem name='Ricardo Ibarra' avatar='avatar15' />
                  <ChatItem name='The Unknown' avatar='avatar16' />
                </ChatNav>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
