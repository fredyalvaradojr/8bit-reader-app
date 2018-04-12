import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import Post from "../componets/Post";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import globalStyles from "../utils/globalStyles";
import ViewTitle from "./ViewTitle";
import PostListTools from "./PostListTools";

const PostListStyles = css`
  border-top: 0.125em dotted ${globalStyles.color.darkGray};
  padding-top: 1em;
`;

class CategoryView extends Component {
  constructor(props) {
    super(props);
    this.props.loadFilterCategory(props.match.params.category);
    if (!this.props.currentView) {
      this.props.thisSetCurrentView("CategoryView");
    }
  }

  render() {
    return (
      <div>
        <ViewTitle
          content={`The ${this.props.categoryFilterSelectedValue} Category`}
        />
        <PostListTools />
        <ul className={PostListStyles} data-class="PostListStyles">
          {this.props.posts.length > 0 ? (
            this.props.posts.map(post => (
              <Post key={post.id} postContent={post} />
            ))
          ) : (
            <li>
              <p>Hmmm.. No posts..</p>
              <p>Let's add one</p>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    categoryFilterSelectedValue: state.categoryFilterSelected,
    currentView: state.currentView
  };
}

const mapDispatchToProps = dispatch => ({
  loadFilterCategory: category => {
    dispatch(actions.loadFilterCategory(category));
  },
  thisSetCurrentView: view => {
    dispatch(actions.setCurrentView(view));
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryView)
);
