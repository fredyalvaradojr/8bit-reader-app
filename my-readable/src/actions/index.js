//import { getUniquePostID, getTimeStamp } from "../utils/index";
import * as api from "../utils/apiServerInterface";
export const POST_LOADED = "POST_LOADED";
export const POST_SINGLE_LOADED = "POST_SINGLE_LOADED";
export const COMMENTS_LOADED = "COMMENTS_LOADED";
export const POST_ADD = "ADD_POST";
export const POST_ADD_COMMENT = "ADD_COMMENT_TO_POST";
export const POST_EDIT = "EDIT_POST";
export const POST_EDIT_COMMENT = "EDIT_COMMENT_FROM_POST";
export const POST_DELETE = "POST_DELETE";
export const POST_DELETE_COMMENT = "POST_DELETE_COMMENT";
export const CURRENT_LOCATION_SET = "CURRENT_LOCATION_SET";
export const SET_CURRENT_VIEW = "SET_CURRENT_VIEW";

export function loadPostsSuccess(posts) {
  return { type: POST_LOADED, posts };
}

export function loadPostSuccess(currentPost) {
  return { type: POST_SINGLE_LOADED, currentPost };
}

export function loadCommentsSuccess(comments) {
  return { type: COMMENTS_LOADED, comments };
}

export function loadPosts() {
  return function(dispatch) {
    api
      .getAllPosts()
      .then(posts => {
        const promises = posts.map(post => {
          return api
            .getAllPostComments(post.id)
            .then(comment => {
              return Object.assign(post, { comments: comment });
            })
            .then(post => {
              return post;
            });
        });
        return Promise.all(promises).then(result => result);
      })
      .then(posts => {
        dispatch(loadPostsSuccess(posts));
      });
  };
}

export function loadPost(id) {
  return function(dispatch) {
    api
      .getPost(id)
      .then(post => {
        return api
          .getAllPostComments(post.id)
          .then(comment => {
            return Object.assign(post, { comments: comment });
          })
          .then(post => {
            return post;
          });
      })
      .then(post => {
        dispatch(loadPostSuccess(post));
      });
  };
}

export function loadComments(postId) {
  return api.getAllPostComments(postId);
}

export function setCurrentPost(currentPost) {
  return { type: CURRENT_LOCATION_SET, currentPost };
}

export function setCurrentView(currentView) {
  return { type: SET_CURRENT_VIEW, currentView };
}
