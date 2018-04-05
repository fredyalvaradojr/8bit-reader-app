import { combineReducers } from "redux";
import * as actions from "../actions/index";

const initialState = {
  posts: [],
  comments: [],
  categories: [],
  currentPost: {},
  currentView: null,
  categoryFilterSelected: "all",
  modalEditStatus: false
};

function posts(state = initialState.posts, action) {
  switch (action.type) {
    case actions.POST_EDIT:
      return [...state].map(post => {
        if (action.props.postInfoID !== post.id) {
          return post;
        } else {
          return {
            ...post,
            title: action.props.postInfoTitle,
            body: action.props.postInfoBody
          };
        }
      });
    case actions.POST_LOADED_VIA_FILTER:
      return action.filteredCategoryPosts;
    case actions.POSTED_VOTE:
      return [...state].map(post => {
        if (action.postId !== post.id) {
          return post;
        } else {
          action.voteScore =
            action.voteScore === "upVote"
              ? post.voteScore + 1
              : post.voteScore - 1;
          return { ...post, voteScore: action.voteScore };
        }
      });
    case actions.POST_ADDED:
      let array = [...state];
      array.push({
        id: action.props.UUID,
        timestamp: action.props.timestamp,
        title: action.props.newPostTitle,
        body: action.props.newPostBody,
        author: action.props.newPostAuthor,
        category: action.props.newPostCategory,
        commentCount: 0,
        comments: [],
        deleted: false,
        voteScore: 0
      });
      return array;
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

function categoryFilterSelected(
  state = initialState.categoryFilterSelected,
  action
) {
  switch (action.type) {
    case actions.CATEGORY_SELECTED:
      return action.category;
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  currentPost,
  currentView,
  categories,
  categoryFilterSelected
});
