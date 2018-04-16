const apiServerUrl = "http://localhost:3001";

const headers = {
  Authorization: "grant-access",
  "Content-Type": "application/json"
};

export const getAllCategories = () =>
  fetch(`${apiServerUrl}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getFilterCategory = category =>
  fetch(`${apiServerUrl}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

export const getAllPosts = () =>
  fetch(`${apiServerUrl}/posts`, { headers })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });

export const getPost = id =>
  fetch(`${apiServerUrl}/posts/${id}`, { headers })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });

export const getAllPostComments = postId =>
  fetch(`${apiServerUrl}/posts/${postId}/comments`, { headers })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });

export const postNewVote = (postId, vote) =>
  fetch(`${apiServerUrl}/posts/${postId}`, {
    headers,
    method: "POST",
    body: JSON.stringify({ option: vote })
  }).then(res => res);

export const postNewCommentVote = (commentId, vote) =>
  fetch(`${apiServerUrl}/comments/${commentId}`, {
    headers,
    method: "POST",
    body: JSON.stringify({ option: vote })
  }).then(res => res);

export const editSelectedPost = props =>
  fetch(`${apiServerUrl}/posts/${props.postInfoID}`, {
    headers,
    method: "PUT",
    body: JSON.stringify({
      title: props.postInfoTitle,
      body: props.postInfoBody
    })
  }).then(res => res);

export const addNewPost = props =>
  fetch(`${apiServerUrl}/posts`, {
    headers,
    method: "POST",
    body: JSON.stringify({
      id: props.UUID,
      timestamp: props.timestamp,
      title: props.newPostTitle,
      body: props.newPostbody,
      author: props.newPostAuthor,
      category: props.newPostCategory
    })
  }).then(res => res);

export const deletePost = props =>
  fetch(`${apiServerUrl}/posts/${props}`, {
    headers,
    method: "DELETE"
  }).then(res => res);

export const publishComment = props =>
  fetch(`${apiServerUrl}/comments`, {
    headers,
    method: "POST",
    body: JSON.stringify({
      id: props.UUID,
      timestamp: props.timestamp,
      body: props.newCommentBody,
      author: props.newCommentAuthor,
      parentId: props.newCommentParentID,
      voteScore: 0,
      deleted: false,
      parentDeleted: false
    })
  }).then(res => res);

export const editComment = props =>
  fetch(`${apiServerUrl}/comments/${props.editCommentID}`, {
    headers,
    method: "PUT",
    body: JSON.stringify({
      timestamp: props.timestamp,
      body: props.editCommentBody
    })
  }).then(res => res);

export const deleteComment = props =>
  fetch(`${apiServerUrl}/comments/${props}`, {
    headers,
    method: "DELETE"
  }).then(res => res);
