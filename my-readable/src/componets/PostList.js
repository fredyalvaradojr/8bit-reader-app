import React from "react";
import { connect } from "react-redux";
import Post from "../componets/Post";
import * as api from "../utils/apiServerInterface";
import * as actions from "../actions";

const PostList = props => {
  return (
    <ul>
      {props.posts.map(post => <Post key={post.id} postContent={post} />)}
    </ul>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts
  };
}

const mapDispatchToProps = dispatch => ({
  loadpost: dispatch(actions.loadPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
