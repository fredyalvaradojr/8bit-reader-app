import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { css } from "emotion";
import { withRouter } from "react-router-dom";
import globalStyles from "./utils/globalStyles";
import * as actions from "./actions/index";
import PostList from "./componets/PostList";
import PostView from "./componets/PostView";
import FourZeroFour from "./componets/FourZeroFour";
import CategoryView from "./componets/CategoryView";
import AppHeader from "./componets/AppHeader";

class App extends Component {
  App = css`
    width: 100%;
    min-height: 100%;
    border: 1.5em solid ${globalStyles.color.darkGray};
    padding: 1.5em;
  `;

  render() {
    return (
      <div className={this.App} data-class="App">
        <AppHeader />
        <Switch>
          <Route exact path="/fourzerofour" component={FourZeroFour} />
          <Route exact path="/" component={PostList} />
          <Route exact path="/:category/:post_id" component={PostView} />
          <Route exact path="/:category" component={CategoryView} />
          <Route component={FourZeroFour} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
