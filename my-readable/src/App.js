import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import Post from './componets/Post';
import * as api from './utils/apiServerInterface';
import * as actions from './actions';
import './App.css';

class App extends Component {

  App = css`
    width: 100%;
    min-height: 100%;
    border: 1.5em solid #ccc;
    padding: 1.5em;
  `;

  render() {
    return (
      <div className={this.App} data-class="App">
        <ul>
          {this.props.posts.map( post => <Post key={post.id} postContent={post} /> )}
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
  loadpost: dispatch(actions.loadPosts())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);