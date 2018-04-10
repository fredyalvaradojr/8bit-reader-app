import React, { Component } from "react";
import { css } from "emotion";
import { connect } from "react-redux";
import globalStyles from "../utils/globalStyles";
import PostTools from "./PostTools";
import Breadcrumb from "./Breadcrumb";
import { hexToRGB } from "../utils/index";
import ViewTitle from "./ViewTitle";
import CommentView from "./CommentView";
import CommentsAddForm from "./CommentsAddForm";
import { loadPost, setCurrentView } from "../actions/index";

const article = css`
  &_header {
    font-family: "Bungee", cursive;
    color: ${globalStyles.color.purple};
    text-shadow: 0.25em 0.25em rgba(${hexToRGB(globalStyles.color.purple)}, 0.2);
    margin: 1em 0;
    padding: 1em 0;
    border-top: 0.1875em dashed ${globalStyles.color.darkGray};
    border-bottom: 0.1875em dashed ${globalStyles.color.darkGray};
  }

  &_meta {
    margin-bottom: 0.5em;
    border-bottom: 0.0625 dashed #ccc;
    padding-bottom: 0.5em;
    display: flex;
  }

  &_body {
    margin: 0 0 3em;
  }
`;

class PostView extends Component {
  state = {
    commentsFormStatus: false
  };

  constructor(props) {
    super(props);
    if (Object.keys(this.props.currentPost).length === 0) {
      // dispatch load current post, get id from url
      this.props.thisLoadCurrentPost(this.props.match.params.post_id);
    }
    if (!this.props.currentView) {
      this.props.thisSetCurrentView("PostView");
    }
  }

  componentDidMount() {
    console.debug("PostView Mounted");
  }

  toggleCommentForm = e => {
    this.setState({
      commentsFormStatus: this.state.commentsFormStatus ? false : true
    });
  };

  render() {
    return (
      <div className="post-view">
        <article className={article}>
          <ViewTitle content={this.props.currentPost.title} />
          <Breadcrumb
            backToTitle="List"
            backTo="/"
            viewTo="default"
            postTitle={this.props.currentPost.title}
          />
          <div className={`${article}_meta`}>
            <div className={`${article}_author`}>
              {this.props.currentPost.author}
            </div>
            <div className={`${article}_number-comments`}>
              {this.props.currentPost.commentCount}
            </div>
            <div className={`${article}_number-votes`}>
              {this.props.currentPost.voteScore}
            </div>
          </div>
          <div className={`${article}_body`}>{this.props.currentPost.body}</div>
          <PostTools />
          {this.props.currentPost.comments &&
          this.props.currentPost.comments.length > 0 ? (
            <div className={`${article}_comments`}>
              <div className="commentsheader">
                <h2>Comments</h2>
                <button onClick={e => this.toggleCommentForm(e)}>
                  + Comment
                </button>
              </div>
              {this.state.commentsFormStatus ? (
                <CommentsAddForm openForm={e => this.toggleCommentForm(e)} />
              ) : (
                ""
              )}
              <ul>
                {this.props.currentPost.comments.map(comment => (
                  <li key={comment.id}>
                    <CommentView commentInfo={comment} />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={`${article}_comments`}>
              <h2>This post needs your feedback</h2>
              <CommentsAddForm />
            </div>
          )}
        </article>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPost: state.currentPost,
    currentView: state.currentView
  };
};

const mapDispatchToProps = dispatch => {
  return {
    thisLoadCurrentPost: postID => {
      dispatch(loadPost(postID));
    },
    thisSetCurrentView: view => {
      dispatch(setCurrentView(view));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
