import { combineReducers } from "redux";
import * as actions from "../actions/index";

const initialState = {
  posts: [],
  comments: [],
  categories: [],
  currentPost: {},
  currentView: null
};

function posts(state = initialState.posts, action) {
  switch (action.type) {
    case actions.POST_LOADED:
      return action.posts;
    default:
      return state;
  }
}

function currentPost(state = initialState.currentPost, action) {
  switch (action.type) {
    case actions.POST_SINGLE_LOADED:
      return action.currentPost;
    case actions.CURRENT_LOCATION_SET:
      return action.currentPost;
    default:
      return state;
  }
}

function currentView(state = initialState.currentView, action) {
  switch (action.type) {
    case actions.SET_CURRENT_VIEW:
      return action.currentView;
    default:
      return state;
  }
}

function categories(state = initialState.categories, action) {
  switch (action.type) {
    case actions.CATEGORIES_LOADED:
      return action.allCategories;
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  currentPost,
  currentView,
  categories
});
