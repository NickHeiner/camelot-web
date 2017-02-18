import React, { PureComponent } from 'react';
import './App.less';
import { slide as SlideMenu } from 'react-burger-menu';
import SignIn from './pages/SignIn';
import GameList from './pages/game/List';
import GamePlay from './pages/game/Play';

class App extends PureComponent {
  

    constructor() {
        super();
        this.auth = new firebase.auth();
        this.state = {};
    }

  componentWillMount() {
    // TODO handle auth error
    this.unsubscribeFirebaseAuthWatcher = this.auth.onAuthStateChanged(currentUser => this.setState({currentUser}));
  }

  componentWillUnmount() {
    this.unsubscribeFirebaseAuthWatcher();
  }

  render() {
    const currentUser = this.state.currentUser;
    let body;
    if (currentUser) {
      body = <Router history={browserHistory}>
          <Route path="/" component={GameList} />
          <Route path="/game/:id" component={GamePlay} />
        </Router>;
    } else if (currentUser === null) {
      body = <SignIn />;
    } else {
      body = null;
    }

    return (
      <div>
        <main className="App">
          <PageHeader>Camelot</PageHeader>
          {body}
        </main>
      </div>
    );
  }

}

export default App;
