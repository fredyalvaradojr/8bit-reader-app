//import { getUniquePostID, getTimeStamp } from "../utils/index";
import * as api from "../utils/apiServerInterface";
export const POST_LOADED = "POST_LOADED";
export const POST_LOADED_VIA_FILTER = "POST_LOADED_VIA_FILTER";
export const CATEGORY_SELECTED = "CATEGORY_SELECTED";
export const POST_SINGLE_LOADED = "POST_SINGLE_LOADED";
export const COMMENTS_LOADED = "COMMENTS_LOADED";
export const COMMENT_ADD = "COMMENT_ADD";
export const COMMENT_ADD_FAIL = "COMMENT_ADD_FAIL";
export const CATEGORIES_LOADED = "CATEGORIES_LOADED";
export const POSTED_VOTE = "POSTED_VOTE";
export const POSTED_VOTE_FAIL = "POSTED_VOTE_FAIL";
export const POSTED_COMMENT_EDIT = "POSTED_COMMENT_EDIT";
export const POSTED_COMMENT_EDIT_FAIL = "POSTED_COMMENT_EDIT";
export const POSTED_COMMENT_VOTE = "POSTED_COMMENT_VOTE";
export const POSTED_COMMENT_VOTE_FAIL = "POSTED_COMMENT_VOTE_FAIL";
export const POSTED_COMMENT_DELETE = "POSTED_COMMENT_DELETE";
export const POSTED_COMMENT_DELETE_FAIL = "POSTED_COMMENT_DELETE_FAIL";
export const POST_ADD = "ADD_POST";
export const POST_ADD_COMMENT = "ADD_COMMENT_TO_POST";
export const POST_EDIT = "POST_EDIT";
export const POST_EDIT_FAIL = "POST_EDIT_FAIL";
export const POST_EDIT_COMMENT = "EDIT_COMMENT_FROM_POST";
export const POST_DELETE = "POST_DELETE";
export const POST_DELETE_FAIL = "POST_DELETE_FAIL";
export const POST_DELETE_COMMENT = "POST_DELETE_COMMENT";
export const POST_ADDED = "POST_ADDED";
export const POST_SORT = "POST_SORT";
export const POST_ACTIVE_SORT = "POST_ACTIVE_SORT";
export const POST_ADDED_FAIL = "POST_ADDED_FAIL";
export const CURRENT_LOCATION_SET = "CURRENT_LOCATION_SET";
export const SET_CURRENT_VIEW = "SET_CURRENT_VIEW";

export function loadPostSuccess(currentPost) {
  return { type: POST_SINGLE_LOADED, currentPost };
}

export function loadCommentsSuccess(comments) {
  return { type: COMMENTS_LOADED, comments };
}

export function loadAllCategoriesSuccess(allCategories) {
  return { type: CATEGORIES_LOADED, allCategories };
}

export function loadFilterCategorySuccess(filteredCategoryPosts) {
  console.debug("loadFilterCategorySuccess: ", filteredCategoryPosts);
  return { type: POST_LOADED_VIA_FILTER, filteredCategoryPosts };
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
        dispatch(fetchResults({ type: POST_LOADED, posts }));
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

export function loadFilterCategory(category) {
  console.debug("loadFilterCategory: ", category);
  return function(dispatch) {
    api.getFilterCategory(category).then(posts => {
      console.debug("category posts:", posts);
      dispatch(loadFilterCategorySuccess(posts));
    });
  };
}

export function loadallCategories() {
  return function(dispatch) {
    api
      .getAllCategories()
      .then(allCategories => allCategories)
      .then(allCategories => dispatch(loadAllCategoriesSuccess(allCategories)));
  };
}

export function postVote(postId, voteScore, allPosts) {
  console.debug("action vote: ", postId, voteScore, allPosts);
  return function(dispatch) {
    api.postNewVote(postId, voteScore).then(res => {
      if (res.status === 200) {
        dispatch(fetchResults({ type: POSTED_VOTE, voteScore, postId }));
      } else {
        dispatch(fetchResults({ type: POSTED_VOTE_FAIL, voteScore, postId }));
      }
    });
  };
}

export function fetchResults(response) {
  console.debug(response);
  return response;
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

export function categoryFilterSelected(category) {
  return { type: CATEGORY_SELECTED, category };
}

export function editPost(props) {
  // first step to put the new information into the edited post
  return function(dispatch) {
    api.editSelectedPost(props).then(res => {
      if (res.status === 200) {
        dispatch(fetchResults({ type: POST_EDIT, props }));
      } else {
        dispatch(fetchResults({ type: POST_EDIT_FAIL, props }));
      }
    });
  };
}

export function addNewPostInfo(props) {
  return function(dispatch) {
    console.debug(props);
    api.addNewPost(props).then(res => {
      if (res.status === 200) {
        dispatch(fetchResults({ type: POST_ADDED, props }));
      } else {
        dispatch(fetchResults({ type: POST_ADDED_FAIL, props }));
      }
    });
  };
}

export function deletePost(props) {
  return function(dispatch) {
    api.deletePost(props).then(res => {
      if (res.status === 200) {
        dispatch(fetchResults({ type: POST_DELETE, props }));
      } else {
        dispatch(fetchResults({ type: POST_DELETE_FAIL, props }));
      }
    });
  };
}

export function publishComment(props) {
  return function(dispatch) {
    api.publishComment(props).then(res => {
      if (res.status === 200) {
        dispatch(fetchResults({ type: COMMENT_ADD, props }));
      } else {
        dispatch(fetchResults({ type: COMMENT_ADD_FAIL, props }));
      }
    });
  };
}

export function postCommentVote(commentId, voteScore, currentPost) {
  return function(dispatch) {
    api.postNewCommentVote(commentId, voteScore).then(res => {
      if (res.status === 200) {
        dispatch(
          fetchResults({ type: POSTED_COMMENT_VOTE, voteScore, commentId })
        );
      } else {
        dispatch(
          fetchResults({ type: POSTED_COMMENT_VOTE_FAIL, voteScore, commentId })
        );
      }
    });
  };
}

export function editComment(props) {
  return function(dispatch) {
    api.editComment(props).then(res => {
      if (res.status === 200) {
        dispatch(fetchResults({ type: POSTED_COMMENT_EDIT, props }));
      } else {
        dispatch(fetchResults({ type: POSTED_COMMENT_EDIT_FAIL, props }));
      }
    });
  };
}

export function deleteComment(props) {
  console.debug(props);
  return function(dispatch) {
    api.deleteComment(props).then(res => {
      if (res.status === 200) {
        dispatch(fetchResults({ type: POSTED_COMMENT_DELETE, props }));
      } else {
        dispatch(fetchResults({ type: POSTED_COMMENT_DELETE_FAIL, props }));
      }
    });
  };
}

export function activeSort(props) {
  return { type: POST_ACTIVE_SORT, props };
}

export function sortPosts(props) {
  return { type: POST_SORT, props };
}
