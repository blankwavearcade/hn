import React, {Component} from 'react';
import Post from './Post.js';
import Config from './config.json';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPosts: [],
      page: 0
    }
  }

  // Basically copy pasta from reactjs.org
  componentDidMount() {
    fetch(Config.topStoriesUrl)
      .then(res => res.json())
      .then(
        (resJson) => {
          this.setState({
            newPosts: resJson.sort((a,b) => b - a)
          });
      },
      (error) => {
        this.setState({
          error
        });
      }
    )
  }

  render() {
    const {newPosts} = this.state;
    var posts = [];
    // Pagination should be considered...
    for (let i = 0; i < 10; i++) {
      if (typeof newPosts[i] !== 'undefined') {
        posts.push(newPosts[i]);
      }
    }
    return (
      <div className="post-container" >
        <ul>
          {posts.map((id, key) => (
            <Post key={key} id={id} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Posts;
