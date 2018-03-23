import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { css } from 'emotion';
import PostList from './componets/PostList';

class App extends Component {

  App = css`
    width: 100%;
    min-height: 100%;
    border: 1.5em solid #ccc;
    padding: 1.5em;
  `;
  getPathNameComponent = (pathName) => {
    switch (pathName) {
      default: {
        return PostList;
      }
    }
  }

  render() {
    const pathName = window.location.pathname;
    const pathComponent = this.getPathNameComponent(pathName);

    return (
      <div className={this.App} data-class="App">
        <Switch>
          <Route key={pathName} path={pathName} component={pathComponent} />
        </Switch>
      </div>
    );
  }
}

export default App;