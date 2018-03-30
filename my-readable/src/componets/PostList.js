import React from "react";
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

const PostList = props => {
  console.debug(props.posts);
  return (
    <div>
      <ViewTitle content="The List" />
      <FilterCategories />
      <ul className={PostListStyles} data-class="PostListStyles">
        {props.posts.map(post => <Post key={post.id} postContent={post} />)}
      </ul>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  console.debug(state);
  return {
    posts: state.posts
  };
}

const mapDispatchToProps = dispatch => ({
  loadpost: dispatch(actions.loadPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
