import {connect} from 'react-redux';
import React, {PureComponent} from 'react';
import _ from 'lodash';

export default (OnlineContainer, OfflineContainer) => {
    @connect(
        state => _.pick(state, 'offline')
    )
    class HandleConnectivity extends PureComponent {
        render = () => this.props.offline ? <OfflineContainer /> : <OnlineContainer />;
    };
    
    return HandleConnectivity;
};
