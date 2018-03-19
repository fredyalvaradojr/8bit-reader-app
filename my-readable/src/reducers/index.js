import { combineReducers } from 'redux';
import {
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT_TO_POST,
  EDIT_COMMENT_FROM_POST,
  DELETE_COMMENT_FROM_POST
} from '../actions/index';
import * as api from '../utils/apiServerInterface';

function posts (state = {}, action) {
  switch(action.type) {
    case "ADD_POST":
        return state;
    case "EDIT_POST":
        return state;
    case "DELETE_POST":
        return state;
    default:
        return state;
  }
}
/*
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

function comments (state = {}, action) {
  switch(action.type) {
    case "ADD_COMMENT_TO_POST":
        return state;
    case "EDIT_COMMENT_FROM_POST":
        return state;
    case "DELETE_COMMENT_FROM_POST":
        return state;
    default:
        return state;
  }
}

export default combineReducers( {
  posts,
  comments
} );