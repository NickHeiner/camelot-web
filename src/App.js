import React, { Component } from 'react';
import { PageHeader, Button } from 'react-bootstrap';
import './App.less';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PageHeader>Camelot</PageHeader>
        <Button bsStyle="primary">Sign In</Button>
      </div>
    );
  }
}

export default App;
