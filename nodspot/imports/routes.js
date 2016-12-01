import React from 'react';
import classNames from 'classnames';
import { IndexRoute, Route } from 'react-router';
import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

/* Common Components */

import Sidebar from '../imports/common/sidebar';
import Header from '../imports/common/header';
import Footer from '../imports/common/footer';

export default class App extends React.Component {
  render() {
    return (
      <MainContainer {...this.props}>
        <Sidebar />
        <Header />
        <div id='body'>
          <Grid>
            <Row>
              <Col xs={12}>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
        <Footer />
      </MainContainer>
    );
  }
}
