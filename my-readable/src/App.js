import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { css } from "emotion";
import globalStyles from "./utils/globalStyles";
import * as actions from "./actions/index";
import { setComponent } from "./utils/index";
import PostList from "./componets/PostList";
import PostView from "./componets/PostView";
import AppHeader from "./componets/AppHeader";

class App extends Component {
  App = css`
    width: 100%;
    min-height: 100%;
    border: 1.5em solid ${globalStyles.color.darkGray};
    padding: 1.5em;
  `;

  componentDidMount() {
    // check that url contains second param
    const locationPathArr = window.location.pathname.split("/");
    if (locationPathArr[2]) {
      this.props.setCurrentPost(locationPathArr[2]);
      this.props.setCurrentView("PostView");
    } else {
      this.props.setCurrentView("default");
    }
    // yes, then get the id so that you can make a fetch and dispatch current post
  }

  getPathNameComponent = currentView => {
    currentView = currentView === null ? setComponent() : currentView;
    console.debug("currentView: ", currentView);
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
        <AppHeader />
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
    currentView: state.currentView,
    currentPost: state.currentPost
  };
}

const mapDispatchToProps = dispatch => ({
  setCurrentPost: id => {
    dispatch(actions.loadPost(id));
  },
  setCurrentView: view => {
    dispatch(actions.setCurrentView(view));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
