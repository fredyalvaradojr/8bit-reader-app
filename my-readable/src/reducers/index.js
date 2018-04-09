import { combineReducers } from "redux";
import * as actions from "../actions/index";

const initialState = {
  posts: [],
  comments: [],
  categories: [],
  currentPost: {},
  currentView: null,
  categoryFilterSelected: "all",
  modalEditStatus: false,
  activeSort: "dateNew"
};

const sortedPostList = (sortState, sort) => {
  console.debug(sortState, sort);
  switch (sort) {
    case "dateNew": {
      return sortState.sort((a, b) => b.timestamp - a.timestamp);
    }
    case "dateOld": {
      return sortState.sort((a, b) => a.timestamp - b.timestamp);
    }
    case "scoreHighest": {
      return sortState.sort((a, b) => b.voteScore - a.voteScore);
    }
    case "scoreLowest": {
      return sortState.sort((a, b) => a.voteScore - b.voteScore);
    }
    case "alpha": {
      return sortState.sort((a, b) => {
        var nameA = a.title.toUpperCase();
        var nameB = b.title.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
    default: {
      return sortState;
    }
  }
};

function posts(
  state = initialState.posts,
  action,
  activeSort = initialState.activeSort
) {
  switch (action.type) {
    case actions.POST_SORT:
      return sortedPostList([...state], action.props);
    case actions.POST_DELETE:
      let deleteArray = [...state];
      console.debug("post_del: ", deleteArray, action.props);
      deleteArray = deleteArray.filter(post => post.id !== action.props);
      console.debug("post_del: ", deleteArray, action.props);
      return deleteArray;
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
      return sortedPostList(array, activeSort);
    case actions.POST_LOADED:
      return sortedPostList(action.posts, "dateNew");
    default:
      return state;
  }
}

function currentPost(state = initialState.currentPost, action) {
  switch (action.type) {
    case actions.POSTED_COMMENT_EDIT:
      const postedCommentEditObj = { ...state };
      postedCommentEditObj["comments"].map(comment => {
        if (action.props.editCommentID !== comment.id) {
          return comment;
        } else {
          comment["body"] = action.props.editCommentBody;
          comment["timestamp"] = action.props.timestamp;
          return comment;
        }
      });
      return postedCommentEditObj;
    case actions.COMMENT_ADD:
      const obj = { ...state };
      obj["comments"].push({
        author: action.props.newCommentAuthor,
        body: action.props.newCommentBody,
        deleted: false,
        id: action.props.UUID,
        parentDeleted: false,
        parentId: action.props.newCommentParentID,
        timestamp: action.props.timestamp,
        voteScore: 0
      });
      return obj;
    case actions.POSTED_COMMENT_VOTE:
      const postedCommentVoteObj = { ...state };
      postedCommentVoteObj["comments"].map(comment => {
        if (action.commentId !== comment.id) {
          return comment;
        } else {
          comment["voteScore"] =
            action.voteScore === "upVote"
              ? comment.voteScore + 1
              : comment.voteScore - 1;
          return comment;
        }
      });
      return postedCommentVoteObj;
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

function activeSort(state = initialState.activeSort, action) {
  console.debug(action);
  switch (action.type) {
    case actions.POST_ACTIVE_SORT:
      return action.props;
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  currentPost,
  currentView,
  categories,
  categoryFilterSelected,
  activeSort
});
