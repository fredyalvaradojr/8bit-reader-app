import { combineReducers } from 'redux';
import {
  POST_LOADED,
  COMMENTS_LOADED,
  POST_ADD,
  POST_EDIT,
  POST_DELETE,
  POST_ADD_COMMENT,
  POST_EDIT_COMMENT,
  POST_DELETE_COMMENT
} from '../actions/index';
import * as api from '../utils/apiServerInterface';

const initialState = {
  posts: []
}

function posts (state = initialState.posts, action) {
  switch(action.type) {
    case POST_LOADED:
      return action.posts;
    default:
      return state;
  }
}

function comments (state = initialState.comments, action) {
  switch(action.type) {
    case COMMENTS_LOADED:
      // get all the comments for each of the posts
      return action.comments;
    default:
      return state;
  }
}
/*
function posts (state = {}, action) {
  const {
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted,
    commentCount
  } = action;
  switch(action.type) {
    case ADD_POST:
        return {
          ...state,
          [id] : {
            ...[id],
            [title]: title,
            [body]: body,
            [author]: author,
            [category]: category
          }
        };
    case EDIT_POST:
        return state;
    case DELETE_POST:
        return state;
    default:
        return state;
  }
}

function categories (state = {}, action) {
  switch(action.type) {
    case "ADD_CATEGORY":
        return state;
    case "EDIT_CATEGORY":
        return state;
    case "DELETE_CATEGORY":
        return state;
    default:
        return state;
  }
}
*/

/*
function comments (state = {}, action) {
  switch(action.type) {
    case ADD_COMMENT_TO_POST:
        return state;
    case EDIT_COMMENT_FROM_POST:
        return state;
    case DELETE_COMMENT_FROM_POST:
        return state;
    default:
        return state;
  }
}
*/

export default combineReducers( {
  posts
} );