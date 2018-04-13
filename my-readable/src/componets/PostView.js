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
import PostMeta from "./PostMeta";
import CommentsAddSVG from "../media/commentsAdd.svg";
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
    margin: 1em 0 0.5em;
    padding-bottom: 1em;
    font-size: 1.4375em;
    border-bottom: 0.0625rem dotted ${globalStyles.color.lightPurple};
  }

  &_comments {
    margin-top: 1em;
    padding: 1em;
    background: rgba(${hexToRGB(globalStyles.color.purple)}, 0.1);
  }

  &_comments_header {
    margin-bottom: 1em;
    padding-bottom: 0.5em;
    border-bottom: 0.0625rem dotted ${globalStyles.color.purple};
  }

  &_comments_header_add {
    display: flex;
  }

  &_comments_header&_comments_header--add-active {
    flex: 2;
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: 0;
  }

  &_add-comment--btn {
    background: transparent;
  }

  &_comment-item {
    background: rgba(255, 255, 255, 0.8);
    padding: 1em;
    margin-bottom: 1em;
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
      } else if (this.props.match.path !== "/") {
        this.props.thisSetCurrentView("fourzerofour");
        this.props.history.push("/fourzerofour");
      }
    }
  }

  componentWillReceiveProps(props) {
    if (props.allPosts) {
      const post = props.allPosts.filter(
        post => post.id === props.match.params.post_id
      );
      if (post.length > 0) {
        this.setState({
          postViewContent: post[0]
        });
      } else {
        if (props.postViewFlag) {
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
    return (
      <div className="post-view">
        <article className={article}>
          <Breadcrumb
            backToTitle="List"
            backTo="/"
            viewTo="default"
            postTitle={this.state.postViewContent.title}
          />
          <ViewTitle content={this.state.postViewContent.title} />
          <PostMeta postContent={this.state.postViewContent} />
          <div className={`${article}_body`}>
            {this.state.postViewContent.body}
          </div>
          <PostTools postId={this.state.postViewContent.id} postView={true} />
          {this.state.postViewContent.comments &&
          this.state.postViewContent.comments.length > 0 ? (
            <div className={`${article}_comments`}>
              <div
                className={`${article}_comments_header ${article}_comments_header_add`}
              >
                <h2
                  className={`${article}_comments_header ${article}_comments_header--add-active`}
                >
                  Comments
                </h2>
                <button
                  className={`${article}_add-comment--btn`}
                  onClick={e => this.toggleCommentForm(e)}
                >
                  <span className="sr-only">Add A Comment</span>
                  <img
                    className={`${article}_icon`}
                    src={CommentsAddSVG}
                    alt="Add a Comment"
                    aria-hidden="true"
                  />
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
                  <li className={`${article}_comment-item`} key={comment.id}>
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
              <h2 className={`${article}_comments_header`}>
                This post needs your feedback!
              </h2>
              <CommentsAddForm
                noComments={true}
                parentID={this.state.postViewContent.id}
              />
            </div>
          )}
        </article>
      </div>
    );
  }
}

const mapStateToProps = state => {
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
