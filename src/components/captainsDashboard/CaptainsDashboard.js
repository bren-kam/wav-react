import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import BaseComponent from '../../components/shared/BaseComponent';
import appDataTypes from '../../constants/AppDataTypes';
import routes from '../../constants/Routes';
import NavImage from '../layout/NavImage';

class CaptainsDashboard extends BaseComponent {

    render() {
        const { profile: { data, isSuccess } } = this.props;
        const votersCount = 27,
              invitesCount = 20,
              notificationCount = 5;

        return (
            <div>
                <NavImage />
                <div className='container btw-captains-dashboard'>
                    { isSuccess &&
                    <Row>
                        <Col md={8}>
                            <Row>
                                <Col md={6} xs={6} className='block-padding'>
                                    <div className='icon-div tasks' onClick={() => this.onLink(routes.tasksList)}>
                                        <FontAwesome name='tasks' size='3x'/>
                                        <span className='button-text'>Your Tasks</span>
                                    </div>
                                </Col>
                                <Col md={6} xs={6} className='block-padding'>
                                    <div className='icon-div voters' onClick={() => this.onLink(routes.voterList)}>
                                        <FontAwesome name='thumbs-up' size='3x'/>
                                        <span className='button-text'>
                                            Voters {/*<span>
                                                (<b>{votersCount}</b>)
                                            </span>*/}
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                {/*<Col md={6} xs={6} className='block-padding'>
                                    <div className='icon-div invites' onClick={() => this.onLink(routes.invites)}>
                                        <FontAwesome name='envelope-open'  size='3x' />
                                        <span className='button-text'>
                                            Invites <span>
                                                (<b>{invitesCount}</b>)
                                            </span>
                                        </span>
                                    </div>
                                </Col>
                                <Col md={6} xs={6} className='block-padding'>
                                    <div className='icon-div forum' onClick={() => this.onLink(routes.forum)}>
                                        <FontAwesome name='comments' size='3x'/>
                                        <span className='button-text'>Forum</span>
                                    </div>
                                </Col>*/}
                            </Row>
                        </Col>
                        {/*<Col md={4} className='block-padding'>
                            <div className='right-column'>
                                <div className='notification'>
                                    <FontAwesome name='bell'  size='2x'/>
                                    <span className='label'>Notifications</span>
                                    <span className='count'>
                                      {notificationCount}
                                    </span>
                                </div>
                                <div className='community' onClick={() => this.onLink(routes.community)}>
                                    <FontAwesome name='users' size='2x' />
                                    <span className='label'>Community</span>
                                </div>
                            </div>
                        </Col>*/}
                    </Row>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const profile = state.app[appDataTypes.profile];
    return { profile };
};


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ }, dispatch)
    };
};

export default connect(mapStateToProps)(withRouter(CaptainsDashboard));