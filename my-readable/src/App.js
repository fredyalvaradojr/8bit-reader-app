import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { css } from "emotion";
import PostList from "./componets/PostList";
import PostView from "./componets/PostView";

class App extends Component {
  App = css`
    width: 100%;
    min-height: 100%;
    border: 1.5em solid #ccc;
    padding: 1.5em;
  `;
  getPathNameComponent = currentView => {
    switch (currentView) {
      case "PostView": {
        return PostView;
      }
      default: {
        return PostList;
      }
    }
  };

  render() {
    const pathName = window.location.pathname;
    const pathComponent = this.getPathNameComponent(this.props.currentView);
    console.debug(this.props);

    return (
      <div className={this.App} data-class="App">
        <Switch>
          <Route key={pathName} path={pathName} component={pathComponent} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.debug(state);
  return {
    currentView: state.currentView
  };
}

export default connect(mapStateToProps)(App);
