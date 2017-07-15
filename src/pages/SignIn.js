import React, {PureComponent} from 'react';
import {Button} from 'react-bootstrap';
import autobind from 'autobind-decorator';
import {getFirebase} from 'react-redux-firebase';

class SignIn extends PureComponent {
  render = () => <Button bsStyle="primary" onClick={this.signIn}>Sign In</Button>;

    @autobind
  signIn() {
    getFirebase().login({provider: 'Google'});
  }
}

export default SignIn;
