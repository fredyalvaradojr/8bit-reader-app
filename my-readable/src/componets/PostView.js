import React, { Component } from "react";
import { css } from "emotion";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import globalStyles from "../utils/globalStyles";
import PostTools from "./PostTools";
import Breadcrumb from "./Breadcrumb";
import { hexToRGB } from "../utils/index";
import ViewTitle from "./ViewTitle";
import CommentView from "./CommentView";
import CommentsAddForm from "./CommentsAddForm";
import { loadPost, setCurrentView, loadPosts } from "../actions/index";

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
    commentsFormStatus: false,
    postViewContent: {}
  };

  componentDidMount() {
    if (this.props.allPosts.length === 0) {
      this.props.thisLoadPosts();
    } else {
      const post = this.props.allPosts.filter(
        post => post.id === this.props.match.params.post_id
      );
      if (post.length > 0) {
        this.setState({
          postViewContent: post[0]
        });
      }
    }
  }

  componentWillReceiveProps(props) {
    console.debug("PostView componentWillReceiveProps: ", props);
    if (props.allPosts) {
      const post = props.allPosts.filter(
        post => post.id === props.match.params.post_id
      );
      if (post.length > 0) {
        this.setState({
          postViewContent: post[0]
        });
      } else {
        console.debug("componentWillReceiveProps: ", props.postViewFlag);
        if (props.postViewFlag) {
          console.debug("componentWillReceiveProps: ", props.postViewFlag);
          this.props.thisSetCurrentView("default");
          this.props.history.push("/");
        } else if (this.props.match.path !== "/") {
          this.props.thisSetCurrentView("fourzerofour");
          this.props.history.push("/fourzerofour");
        }
      }
    }
  }

  toggleCommentForm = e => {
    this.setState({
      commentsFormStatus: this.state.commentsFormStatus ? false : true
    });
  };

  render() {
    console.debug(
      "this.state.postViewContent: ",
      this.state.postViewContent.id
    );
    return (
      <div className="post-view">
        <article className={article}>
          <ViewTitle content={this.state.postViewContent.title} />
          <Breadcrumb
            backToTitle="List"
            backTo="/"
            viewTo="default"
            postTitle={this.state.postViewContent.title}
          />
          <div className={`${article}_meta`}>
            <div className={`${article}_author`}>
              {this.state.postViewContent.author}
            </div>
            <div className={`${article}_number-comments`}>
              {this.state.postViewContent.commentCount}
            </div>
            <div className={`${article}_number-votes`}>
              {this.state.postViewContent.voteScore}
            </div>
          </div>
          <div className={`${article}_body`}>
            {this.state.postViewContent.body}
          </div>
          <PostTools postId={this.state.postViewContent.id} postView={true} />
          {this.state.postViewContent.comments &&
          this.state.postViewContent.comments.length > 0 ? (
            <div className={`${article}_comments`}>
              <div className="commentsheader">
                <h2>Comments</h2>
                <button onClick={e => this.toggleCommentForm(e)}>
                  + Comment
                </button>
              </div>
              {this.state.commentsFormStatus ? (
                <CommentsAddForm
                  parentID={this.state.postViewContent.id}
                  openForm={e => this.toggleCommentForm(e)}
                />
              ) : (
                ""
              )}
              <ul>
                {this.state.postViewContent.comments.map(comment => (
                  <li key={comment.id}>
                    <CommentView
                      parentID={this.state.postViewContent.id}
                      commentInfo={comment}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={`${article}_comments`}>
              <h2>This post needs your feedback</h2>
              <CommentsAddForm parentID={this.state.postViewContent.id} />
            </div>
          )}
        </article>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.debug(state, state.posts);
  return {
    postViewFlag: state.postViewDeleteFlag,
    currentPost: state.currentPost,
    currentView: state.currentView,
    allPosts: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    thisLoadPosts: () => {
      dispatch(loadPosts());
    },
    thisLoadCurrentPost: postID => {
      dispatch(loadPost(postID));
    },
    thisSetCurrentView: view => {
      dispatch(setCurrentView(view));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostView)
);
