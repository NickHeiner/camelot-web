import {connect} from 'react-redux';
import React, {PureComponent} from 'react';
import _ from 'lodash';

export default (offlineProps, onlineProps) => 
    (Component) => {
        @connect(
            state => _.pick(state, 'offline')
        )
        class Wrapped extends PureComponent {
            render() {
                const propsToPass = this.props.offline ? offlineProps : onlineProps;
                return <Component {...propsToPass} />;
            }
        };
        Wrapped.displayName = `HandleConnectivity(${Component.displayName})`;
        return Wrapped;
    };
