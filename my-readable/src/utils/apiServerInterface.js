const apiServerUrl = "http://localhost:3001"

const headers = {
  'Authorization': 'grant-access'
}

export const getAllCategories = () =>
  fetch(`${apiServerUrl}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch(`${apiServerUrl}/posts`, { headers })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    })

export const getAllPostComments = (postId) =>
  fetch(`${apiServerUrl}/posts/${postId}/comments`, { headers })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    })