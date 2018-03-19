import {getUniquePostID, getTimeStamp } from '../utils/index';

export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT_TO_POST = 'ADD_COMMENT_TO_POST';
export const EDIT_POST = 'EDIT_POST';
export const EDIT_COMMENT_FROM_POST = 'EDIT_COMMENT_FROM_POST';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT_FROM_POST = 'DELETE_COMMENT_FROM_POST';

export function addPost({
  id = getUniquePostID,
  timestamp = getTimeStamp,
  title,
  body,
  author,
  category,
  voteScore = 0,
  deleted = false,
  commentCount = 0}) {
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

