import React from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import * as actions from "../actions";
import ViewTitle from "./ViewTitle";
import FourSVG from "../media/404.svg";

const FourZeroFourStyles = css`
  &_image {
    max-width: 100%;
    height: auto;
  }
`;

const PostList = props => {
  return (
    <div className={FourZeroFourStyles}>
      <ViewTitle content="404" />
      <img src={FourSVG} className={`${FourZeroFourStyles}_image`} alt="404" />
    </div>
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
