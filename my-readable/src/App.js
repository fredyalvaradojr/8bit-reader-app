import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { css } from "emotion";
import globalStyles from "./utils/globalStyles";
import * as actions from "./actions/index";
import { setComponent } from "./utils/index";
import PostList from "./componets/PostList";
import PostView from "./componets/PostView";
import CategoryView from "./componets/CategoryView";
import AppHeader from "./componets/AppHeader";

class App extends Component {
  App = css`
    width: 100%;
    min-height: 100%;
    border: 1.5em solid ${globalStyles.color.darkGray};
    padding: 1.5em;
  `;

  constructor(props) {
    super(props);
    // check that url contains second param
    const locationPathArr = window.location.pathname.split("/");
    console.debug(locationPathArr);
    if (locationPathArr[1] === "category") {
      this.props.categoryFilterSelected(locationPathArr[2]);
      this.props.setCurrentView("CategoryView");
    } else if (locationPathArr[1] === "post") {
      this.props.setCurrentPost(locationPathArr[3]);
      this.props.setCurrentView("PostView");
    } else {
      this.props.setCurrentView("default");
    }
  }

  getPathNameComponent = currentView => {
    currentView = currentView === null ? setComponent() : currentView;
    console.debug("currentView: ", currentView);
    switch (currentView) {
      case "PostView": {
        return PostView;
      }
      case "CategoryView": {
        return CategoryView;
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
  },
  categoryFilterSelected: category => {
    dispatch(actions.categoryFilterSelected(category));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
