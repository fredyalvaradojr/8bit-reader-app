import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import Post from "../componets/Post";
import * as actions from "../actions";
import globalStyles from "../utils/globalStyles";
import ViewTitle from "./ViewTitle";
import FilterCategories from "./FilterCategories";

const PostListStyles = css`
  border-top: 0.125em dotted ${globalStyles.color.darkGray};
  padding-top: 1em;
`;

class PostList extends Component {
  constructor(props) {
    super(props);
    console.debug(this.props.categoryFilterSelectedValue);
    this.props.loadFilterCategory(this.props.categoryFilterSelectedValue);
  }

  render() {
    return (
      <div>
        <ViewTitle
          content={`The ${this.props.categoryFilterSelectedValue} Category`}
        />
        <FilterCategories />
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

function mapStateToProps(state, ownProps) {
  console.debug(state);
  return {
    posts: state.posts,
    categoryFilterSelectedValue: state.categoryFilterSelected
  };
}

const mapDispatchToProps = dispatch => ({
  loadFilterCategory: category => {
    console.debug(category);
    dispatch(actions.loadFilterCategory(category));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
