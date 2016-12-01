import React from 'react';

import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn,
  LoremIpsum, Grid, Row, Col, FormControl,
  Label, Progress, Icon,
  SidebarDivider
} from '@sketchpixy/rubix';

import { Link, withRouter } from 'react-router';

import ChatComponent from './chat';
import TimelineComponent from './timeline';
import NotificationsComponent from './notifications';

@withRouter
class ApplicationSidebar extends React.Component {
  handleChange(e) {
    this._nav.search(e.target.value);
  }

  getPath(path) {
    var dir = this.props.location.pathname.search('rtl') !== -1 ? 'rtl' : 'ltr';
    path = `/${dir}/${path}`;
    return path;
  }
}

@withRouter
export default class SidebarContainer extends React.Component {
  getPath(path) {
    var dir = this.props.location.pathname.search('rtl') !== -1 ? 'rtl' : 'ltr';
    path = `/${dir}/${path}`;
    return path;
  }

  render() {
    return (
      <div id='sidebar'>
        <div id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col xs={4} collapseRight>
                <img src='/imgs/app/avatars/john-avatar.png' width='40' height='40' />
              </Col>
              <Col xs={8} collapseLeft id='avatar-col'>
                <div style={{top: 23, fontSize: 16, lineHeight: 1, position: 'relative'}}>John Jeong</div>
                <div>
                  <Progress id='demo-progress' value={30} color='#ffffff'/>
                  <Link to={::this.getPath('lock')}>
                    <Icon id='demo-icon' bundle='fontello' glyph='lock-5' />
                  </Link>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
        <SidebarControls>
          <SidebarControlBtn bundle='fontello' glyph='group' sidebar={0} active={true} />
          <SidebarControlBtn bundle='fontello' glyph='chat-1' sidebar={1} />
          <SidebarControlBtn bundle='fontello' glyph='bell-5' sidebar={2} />
        </SidebarControls>
        <div id='sidebar-container'>
          <Sidebar sidebar={0}>
            <ChatComponent />
          </Sidebar>
          <Sidebar sidebar={1}>
            <NotificationsComponent />
          </Sidebar>
          <Sidebar sidebar={2}>
            <TimelineComponent />
          </Sidebar>
        </div>
      </div>
    );
  }
}
