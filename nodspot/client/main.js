import {Meteor} from 'meteor/meteor';
import React from 'react';
import {render} from 'react-dom'
import {Router, Route, browserHistory} from 'react-router';

/* App Components */
import App from '../imports/routes';

/* Containers */
// import CreateChatroomConatainer from '../imports/containers/createchatroomcontainer';

/* Pages */
import Dashboard from '../imports/routes/Dashboard';

import Inbox from '../imports/routes/Inbox';
import Mail from '../imports/routes/Mail';
import Compose from '../imports/routes/Compose';
import CreateChatroom from '../imports/routes/Createchatroom';
import Gallery from '../imports/routes/Gallery';

import Social from '../imports/routes/Social';

import Posts from '../imports/routes/Posts';
import Post from '../imports/routes/Post';

import Panels from '../imports/routes/Panels';

import LineSeries from '../imports/routes/LineSeries';
import AreaSeries from '../imports/routes/AreaSeries';
import BarColSeries from '../imports/routes/BarColSeries';
import MixedSeries from '../imports/routes/MixedSeries';
import PieDonutSeries from '../imports/routes/PieDonutSeries';

import Chartjs from '../imports/routes/Chartjs';
import C3js from '../imports/routes/C3js';
import Morrisjs from '../imports/routes/Morrisjs';

import StaticTimeline from '../imports/routes/StaticTimeline';
import InteractiveTimeline from '../imports/routes/InteractiveTimeline';

import Codemirrorjs from '../imports/routes/Codemirrorjs';
import Maps from '../imports/routes/Maps';
import Editor from '../imports/routes/Editor';

import Buttons from '../imports/routes/Buttons';
import Dropdowns from '../imports/routes/Dropdowns';
import TabsAndNavs from '../imports/routes/TabsAndNavs';
import Sliders from '../imports/routes/Sliders';
import Knobs from '../imports/routes/Knobs';
import Modals from '../imports/routes/Modals';
import Messengerjs from '../imports/routes/Messengerjs';

import Controls from '../imports/routes/Controls';
import XEditable from '../imports/routes/XEditable';
import Wizard from '../imports/routes/Wizard';

import Tables from '../imports/routes/Tables';
import Datatablesjs from '../imports/routes/Datatablesjs';
import Tablesawjs from '../imports/routes/Tablesawjs';

import Grids from '../imports/routes/Grids';
import Calendar from '../imports/routes/Calendar';

import Dropzonejs from '../imports/routes/Dropzonejs';
import Cropjs from '../imports/routes/Cropjs';

import Fonts from '../imports/routes/Fonts';

import Login from '../imports/routes/Login';
import Signup from '../imports/routes/Signup';
import Forgotid from '../imports/routes/Forgotid';
import Forgotpass from '../imports/routes/Forgotpass';
import Invoice from '../imports/routes/Invoice';
import Pricing from '../imports/routes/Pricing';

import Lock from '../imports/routes/Lock';

/* import Collections */
import '../imports/collections/chatfiles';
import '../imports/collections/chats';
import '../imports/collections/deviceTokens';
import '../imports/collections/friends';
import '../imports/collections/messages';
import '../imports/collections/missedChats';
import '../imports/collections/phonenumbers';
import '../imports/collections/principals';
import '../imports/collections/profilefiles';
import '../imports/collections/reserveduserids';
import '../imports/collections/users';

/* import main stylesheet */
import './sass/main.scss';

Meteor.startup(() => {
  EncryptionUtils.configure({
    enforceEmailVerification: false
  });

  // ReactRouterSSR.Run(routes, {
  //   rootElement: 'app-container'
  // });

  const routes = (
    <Route component={App}>
      <Route path='dashboard' component={Dashboard} />
      <Route path='createchatroom' component={CreateChatroom} />
      <Route path='mailbox/inbox' component={Inbox}  />
      <Route path='mailbox/mail' component={Mail} />
      <Route path='mailbox/compose' component={Compose} />
      <Route path='gallery' component={Gallery} />
      <Route path='social' component={Social} />
      <Route path='blog/posts' component={Posts} />
      <Route path='blog/post' component={Post} />
      <Route path='panels' component={Panels} />
      <Route path='charts/rubix/line' component={LineSeries} />
      <Route path='charts/rubix/area' component={AreaSeries} />
      <Route path='charts/rubix/barcol' component={BarColSeries} />
      <Route path='charts/rubix/mixed' component={MixedSeries} />
      <Route path='charts/rubix/piedonut' component={PieDonutSeries} />
      <Route path='charts/chartjs' component={Chartjs} />
      <Route path='charts/c3js' component={C3js} />
      <Route path='charts/morrisjs' component={Morrisjs} />
      <Route path='timeline' component={StaticTimeline} />
      <Route path='interactive-timeline' component={InteractiveTimeline} />
      <Route path='codemirror' component={Codemirrorjs} />
      <Route path='maps' component={Maps} />
      <Route path='editor' component={Editor} />
      <Route path='ui-elements/buttons' component={Buttons} />
      <Route path='ui-elements/dropdowns' component={Dropdowns} />
      <Route path='ui-elements/tabs-and-navs' component={TabsAndNavs} />
      <Route path='ui-elements/sliders' component={Sliders} />
      <Route path='ui-elements/knobs' component={Knobs} />
      <Route path='ui-elements/modals' component={Modals} />
      <Route path='ui-elements/messenger' component={Messengerjs} />
      <Route path='forms/controls' component={Controls} />
      <Route path='forms/x-editable' component={XEditable} />
      <Route path='forms/wizard' component={Wizard} />
      <Route path='tables/bootstrap-tables' component={Tables} />
      <Route path='tables/datatables' component={Datatablesjs} />
      <Route path='tables/tablesaw' component={Tablesawjs} />
      <Route path='grid' component={Grids} />
      <Route path='calendar' component={Calendar} />
      <Route path='file-utilities/dropzone' component={Dropzonejs} />
      <Route path='file-utilities/crop' component={Cropjs} />
      <Route path='fonts' component={Fonts} />
      <Route path='invoice' component={Invoice} />
      <Route path='pricing' component={Pricing} />
    </Route>
  );

  /**
   * No Sidebar, Header or Footer. Only the Body is rendered.
   */
  const basicRoutes = (
    <Route>
      <Route path='lock' component={Lock} />
      <Route path='login' component={Login} />
      <Route path='signup' component={Signup} />
      <Route path='forgotid' component={Forgotid} />
      <Route path='forgotpass' component={Forgotpass} />
    </Route>
  );

  const combinedRoutes = (
    <Route>
      <Route>
        {routes}
      </Route>
      <Route>
        {basicRoutes}
      </Route>
    </Route>
  );

  render (
    <Router history={browserHistory}>
      <Route>
        <Route path='/' component={Login} />
        <Route path='/ltr'>
          {combinedRoutes}
        </Route>
        <Route path='/rtl'>
          {combinedRoutes}
        </Route>
      </Route>
    </Router>,
    document.getElementById('app-container')
  );
});
