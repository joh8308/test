import React from 'react';
import ReactDOM from 'react-dom';

import {
  Row,
  Col,
  Grid,
  Button,
  TimelineView,
  TimelineItem,
  TimelineBody,
  TimelineIcon,
  TimelineTitle,
  TimelineHeader,
  TimelineAvatar,
} from '@sketchpixy/rubix';

export default class NotificationComponent extends React.Component {
  componentDidMount() {
    (function() {
      $(ReactDOM.findDOMNode(this.refs.sparklineOne)).sparkline([2,3,5,1,2,5,8,6,7,9,3,5,7,8,3,3,2,9,5,3,2,2,4,6,7,8,9,1,12,14,11,3,4,6,9,10,12,9,5,3,2,2,4,6,7,8,9,10,11,12,14,23], {
          type: 'bar',
          barWidth: 2,
          height: '40',
          barSpacing: 1,
          barColor: '#D71F4B'});
      $(ReactDOM.findDOMNode(this.refs.sparklineTwo)).sparkline([10,40,20,30,20,20,40,20,25,35,44,55,66,20,20,30,50,60,30,40,50,60,50,30,20,90,100,100,100,100,100,100], {
          type: 'bar',
          barWidth: 4,
          height: '40',
          barSpacing: 1,
          barColor: '#FADD7F'});
      $(ReactDOM.findDOMNode(this.refs.pieOne)).sparkline([1,0.2], {
          type: 'pie',
          width: '35',
          height: '35',
          sliceColors: ['#FADD7F','#D71F4B']});
      $(ReactDOM.findDOMNode(this.refs.pieTwo)).sparkline([0.2,1], {
          type: 'pie',
          width: '35',
          height: '35',
          sliceColors: ['#ff9900','#109618']});
      $(ReactDOM.findDOMNode(this.refs.pieThree)).sparkline([1,0.2,0.3,0.2], {
          type: 'pie',
          width: '35',
          height: '35',
          sliceColors: ['#ff9900','#109618','#66aa00','#dd4477']});
      $(ReactDOM.findDOMNode(this.refs.pieFour)).sparkline([0.2,0.3,0.4,0.1,1,0.2], {
          type: 'pie',
          width: '35',
          height: '35',
          sliceColors: ['#dd4477','#0099c6','#990099','#ff9900','#B4A1DD','#66aa00']});
    }.bind(this))();
  }
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12} collapseLeft collapseRight>
            <br/>
            <div className='text-left' >
              <Button href='/ltr/createchatroom' xs outlined bsStyle='blue' style={{marginLeft:20}}>
                채팅방 만들기
              </Button>
            </div>
              <TimelineView className='border-black50 tl-darkgreen'>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineIcon glyph='icon-fontello-chat bg-darkgreen fg-white' />
                    <TimelineTitle>
                      James
                      <br/>
                      <div style={{color:'#B4E6C2'}}>
                      (1:1 Chatting)
                      </div>
                    </TimelineTitle>
                  </TimelineHeader>
                  <TimelineBody>
                    <ul>
                      <li>
                        <div>
                          <div className='fg-lightgray'><small><strong>Oct 31, 2016</strong></small></div>
                          <div><small>John 님께서 채팅방을 개설하였습니다.</small></div>
                          <div><img src='/imgs/app/avatars/john-avatar.png' className='border-green' style={{width:40}}/></div>
                          <br/>
                        </div>
                        <div className='text-left' style={{marginLeft:-5}}>
                          <Button xs outlined bsStyle='darkgreen45'>
                            입장
                          </Button>{' '}
                          <Button xs outlined bsStyle='red'>
                            나가기
                          </Button>
                        </div>
                      </li>
                    </ul>
                  </TimelineBody>
                </TimelineItem>
              </TimelineView>
              <TimelineView className='border-black50 tl-deepred'>
              <TimelineItem>
                <TimelineHeader>
                  <TimelineIcon glyph='icon-fontello-chat bg-deepred fg-white' />
                  <TimelineTitle>
                    Development Team
                    <br/>
                    <div style={{color:'#B4E6C2'}}>
                    (5 member)
                    </div>
                  </TimelineTitle>
                </TimelineHeader>
                <TimelineBody>
                  <ul>
                    <li>
                      <div>
                        <div className='fg-lightgray'><small><strong>Nov 3, 2016</strong></small></div>
                        <div><small>미팅장소 도착했습니다.</small></div>
                        <div className='fg-white'><small>(지도)</small></div>
                        <div><img src='/imgs/app/avatars/avatar20.png' className='border-green' style={{width:40}}/></div>
                        <br/>
                      </div>
                      <div className='text-left' style={{marginLeft:-5}}>
                        <Button xs outlined bsStyle='darkgreen45'>
                          입장
                        </Button>{' '}
                        <Button xs outlined bsStyle='red'>
                          나가기
                        </Button>
                      </div>
                    </li>
                  </ul>
                </TimelineBody>
              </TimelineItem>
              </TimelineView>
              <TimelineView className='border-black50 tl-deepred'>
              <TimelineItem>
                <TimelineHeader>
                  <TimelineIcon glyph='icon-fontello-chat bg-deepred fg-white' />
                  <TimelineTitle>
                    John, Sarah 외 1 명
                    <br/>
                    <div style={{color:'#B4E6C2'}}>
                    (3 member)
                    </div>
                  </TimelineTitle>
                </TimelineHeader>
                <TimelineBody>
                  <ul>
                    <li>
                      <div>
                        <div className='fg-lightgray'><small><strong>Nov 3, 2016</strong></small></div>
                        <div><small>이거 사가면 되나요?</small></div>
                        <div className='fg-white'><small>(이미지)</small></div>
                        <div><img src='/imgs/app/avatars/avatar9.png' className='border-green' style={{width:40}}/></div>
                        <br/>
                      </div>
                      <div className='text-left' style={{marginLeft:-5}}>
                        <Button xs outlined bsStyle='darkgreen45'>
                          입장
                        </Button>{' '}
                        <Button xs outlined bsStyle='red'>
                          나가기
                        </Button>
                      </div>
                    </li>
                  </ul>
                </TimelineBody>
              </TimelineItem>
              </TimelineView>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
