import React from 'react';

const Post = props => {
  return (
    <li key={ props.postContent.id }>
      <h1>{ props.postContent.title }</h1>
      <p>{ props.postContent.body }</p>
      { props.postContent.comments.length > 0 ?
          <div className="comments">
            <h2>comments:</h2>
            <ul>
              {props.postContent.comments.map( comment => <li key={comment.id}>{comment.body}</li>)}
            </ul>
          </div>
        :
          <div className="comments">
            <h2>This post needs your feedback</h2>
          </div>
      }
    </li>
  );
}

export default Post;