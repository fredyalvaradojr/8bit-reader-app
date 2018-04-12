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
  activeSort: "dateNew",
  postViewDeleteFlag: false
};

const sortedPostList = (sortState, sort) => {
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
    case actions.POSTED_COMMENT_EDIT:
      console.debug(action);
      return [...state].map(post => {
        if (post.id !== action.props.parentID) {
          return post;
        } else {
          const commentsObj = [...post.comments];
          const remainingCommmentsObj = commentsObj.map(comment => {
            if (comment.id !== action.props.editCommentID) {
              return comment;
            } else {
              comment["body"] = action.props.editCommentBody;
              comment["timestamp"] = action.props.timestamp;
              return comment;
            }
          });
          return {
            ...post,
            comments: remainingCommmentsObj
          };
        }
      });
    case actions.POSTED_COMMENT_VOTE:
      return [...state].map(post => {
        if (post.id !== action.parentID) {
          return post;
        } else {
          const commentsObj = [...post.comments];
          const remainingCommmentsObj = commentsObj.map(comment => {
            if (comment.id !== action.commentId) {
              return comment;
            } else {
              comment["voteScore"] =
                action.voteScore === "upVote"
                  ? comment.voteScore + 1
                  : comment.voteScore - 1;
              return comment;
            }
          });
          return {
            ...post,
            comments: remainingCommmentsObj
          };
        }
      });
    case actions.POSTED_COMMENT_DELETE:
      return [...state].map(post => {
        if (post.id !== action.parentID) {
          return post;
        } else {
          const commentsObj = [...post.comments];
          const remainingCommmentsObj = commentsObj.filter(
            comment => comment.id !== action.commentID
          );
          return {
            ...post,
            comments: remainingCommmentsObj
          };
        }
      });
    case actions.COMMENT_ADD:
      return [...state].map(post => {
        if (post.id !== action.props.newCommentParentID) {
          return post;
        } else {
          const commentsObj = [...post.comments];
          commentsObj.push({
            author: action.props.newCommentAuthor,
            body: action.props.newCommentBody,
            deleted: false,
            id: action.props.UUID,
            parentDeleted: false,
            parentId: action.props.newCommentParentID,
            timestamp: action.props.timestamp,
            voteScore: 0
          });
          return {
            ...post,
            comments: commentsObj
          };
        }
      });
    case actions.POST_SORT:
      return sortedPostList([...state], action.props);
    case actions.POST_DELETE:
      let deleteArray = [...state];
      deleteArray = deleteArray.filter(post => post.id !== action.props);
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
      return action.posts;
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
        voteScore: 1
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
  switch (action.type) {
    case actions.POST_ACTIVE_SORT:
      return action.props;
    default:
      return state;
  }
}

function postViewDeleteFlag(state = initialState.postViewDeleteFlag, action) {
  switch (action.type) {
    case actions.POST_DELETE_REDIRECT:
      console.debug(action);
      return action.bool;
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
  activeSort,
  postViewDeleteFlag
});
