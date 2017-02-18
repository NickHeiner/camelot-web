import React, { PureComponent } from 'react';
import { Button } from 'react-bootstrap';
import autobind from 'autobind-decorator';
import firebase from 'firebase';

class SignIn extends PureComponent {
    constructor() {
        super();
        this.auth = new firebase.auth();
        this.provider = new firebase.auth.GoogleAuthProvider();
    }

    render() {
        return <Button bsStyle="primary" onClick={this.signIn}>Sign In</Button>;
    }

    @autobind
    signIn() {
        this.auth.signInWithRedirect(this.provider);
    }
}

export default SignIn;
