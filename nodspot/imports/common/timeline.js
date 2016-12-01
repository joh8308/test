import React from 'react';

import {
  Grid,
  Row,
  Col,
  Button,
  TimelineView,
  TimelineItem,
  TimelineBody,
  TimelineHeader,
  TimelineAvatar,
  TimelineTitle,
} from '@sketchpixy/rubix';

export default class TimelineComponent extends React.Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12} collapseLeft collapseRight>
            <br/>
            <div className='text-left' >
              <Button xs outlined bsStyle='red' style={{marginLeft:20}}>
                알림 모두 지우기
              </Button>{' '}
            </div>
              <TimelineView className='border-black50 tl-green'>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineAvatar src='/imgs/app/avatars/avatar5.png' className='border-green' />
                    <TimelineTitle>
                      Jordyn Ouellet
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
                          <div className='fg-lightgray'><small><strong>Oct 30, 2016</strong></small></div>
                          <div><small>Hi, John!</small></div>
                        </div>
                        <br/>
                        <div className='text-left'>
                          <Button xs outlined bsStyle='darkgreen45'>
                            입장
                          </Button>{' '}
                          <Button xs outlined bsStyle='red'>
                            지우기
                          </Button>
                        </div>
                      </li>
                    </ul>
                  </TimelineBody>
                </TimelineItem>
              </TimelineView>
              <TimelineView className='border-black50 tl-red'>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineAvatar src='/imgs/app/avatars/avatar15.png' className='border-red' />
                    <TimelineTitle>
                      James
                      <br/>
                      <div style={{color:'#B4E6C2'}}>
                      Development Team
                      </div>
                    </TimelineTitle>
                  </TimelineHeader>
                  <TimelineBody>
                    <ul>
                      <li>
                        <div>
                          <div className='fg-lightgray'><small><strong>Oct 31, 2016</strong></small></div>
                          <div style={{color:'#B4E6C2'}}><small>James 님께서 Developer Team 에 초대하였습니다.</small></div>
                        </div>
                        <br/>
                        <div className='text-left'>
                          <Button xs outlined bsStyle='darkgreen45'>
                            수락
                          </Button>{' '}
                          <Button xs outlined bsStyle='red'>
                            거절
                          </Button>
                        </div>
                      </li>
                    </ul>
                  </TimelineBody>
                </TimelineItem>
              </TimelineView>
              <TimelineView className='border-black50 tl-green'>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineAvatar src='/imgs/app/avatars/avatar7.png' className='border-green' />
                    <TimelineTitle>
                      Toby King
                      <div style={{color:'#B4E6C2'}}>
                      (Toby King 외 3 명)
                      </div>
                    </TimelineTitle>
                  </TimelineHeader>
                  <TimelineBody>
                    <ul>
                      <li>
                        <div className='fg-lightgray'><small><strong>Nov 1, 2016</strong></small></div>
                        <div>
                          <small>이곳 <strong className='fg-darkgreen45'>The Museum of Modern Art</strong> 에 들렸다 복귀하겠습니다.</small>
                        </div>
                        <br/>
                        <img src='/imgs/app/staticmap.png' alt='Points of Interest in Lower Manhattan' />
                        <br/>
                        <br/>
                        <div className='text-left'>
                          <Button xs outlined bsStyle='darkgreen45'>
                            입장
                          </Button>{' '}
                          <Button xs outlined bsStyle='red'>
                            지우기
                          </Button>
                        </div>
                      </li>
                    </ul>
                  </TimelineBody>
                </TimelineItem>
              </TimelineView>
              <TimelineView className='border-black50 tl-yellow'>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineAvatar src='/imgs/app/avatars/avatar10.png' className='border-yellow' />
                    <TimelineTitle>
                      Angelina Mills
                      <div style={{color:'#B4E6C2'}}>
                      (Design Team)
                      </div>
                    </TimelineTitle>
                  </TimelineHeader>
                  <TimelineBody>
                    <ul>
                      <li>
                        <div className='fg-lightgray'><small><strong>Nov 2, 2016</strong></small></div>
                        <div>
                          <small>지금 미팅장소에 도착해서 차 주차했습니다.</small>
                          <br/>
                          <img width='155' src='/imgs/app/gallery/tumblr_n7yhe1sTa41st5lhmo1_1280-thumb.jpg' alt='the taxi' />
                        </div>
                        <br/>
                        <div className='text-left'>
                          <Button xs outlined bsStyle='darkgreen45'>
                            입장
                          </Button>{' '}
                          <Button xs outlined bsStyle='red'>
                            지우기
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
