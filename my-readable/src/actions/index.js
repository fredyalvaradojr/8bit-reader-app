import { getUniquePostID, getTimeStamp } from "../utils/index";
import * as api from "../utils/apiServerInterface";
export const POST_LOADED = "POST_LOADED";
export const COMMENTS_LOADED = "COMMENTS_LOADED";
export const POST_ADD = "ADD_POST";
export const POST_ADD_COMMENT = "ADD_COMMENT_TO_POST";
export const POST_EDIT = "EDIT_POST";
export const POST_EDIT_COMMENT = "EDIT_COMMENT_FROM_POST";
export const POST_DELETE = "POST_DELETE";
export const POST_DELETE_COMMENT = "POST_DELETE_COMMENT";
export const CURRENT_LOCATION_SET = "CURRENT_LOCATION_SET";
export const SET_CURRENT_VIEW = "SET_CURRENT_VIEW";
/*
export function addPost(
  {
  id = getUniquePostID,
  timestamp = getTimeStamp,
  title,
  body,
  author,
  category,
  voteScore = 0,
  deleted = false,
  commentCount = 0
  }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted,
    commentCount
  }
}
*/

export function loadPostsSuccess(posts) {
  return { type: POST_LOADED, posts };
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

export function loadComments(postId) {
  return api.getAllPostComments(postId);
}

export function setCurrentPost(currentPost) {
  return { type: CURRENT_LOCATION_SET, currentPost };
}

export function setCurrentView(currentView) {
  return { type: SET_CURRENT_VIEW, currentView };
}
