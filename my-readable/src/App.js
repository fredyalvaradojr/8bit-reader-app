import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as api from './utils/apiServerInterface';
import * as actions from './actions';
import './App.css';

class App extends Component {
  state = { comments: [] }

  render() {
    return (
      <div className="App">
        <ul>
        {this.props.posts.map( post => {
          return (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              { post.comments.length > 0 ?
                  <div className="comments">
                    <h2>comments:</h2>
                    <ul>
                      {post.comments.map( comment => <li key={comment.id}>{comment.body}</li>)}
                    </ul>
                  </div>
                :
                  <div className="comments">
                    <h2>This post needs your feedback</h2>
                  </div>
              }
            </li>
          );
        })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    posts: state.posts,
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadpost: dispatch(actions.loadPosts()),
  getComments: postID => {
    dispatch(actions.loadComments(postID))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(App);

