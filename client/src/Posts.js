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
    this.getData();
  }

  getData() {
    fetch(Config.topStoriesUrl + this.state.page)
      .then((res)  => res.json())
      .then(
        (resJson) => {
          this.setState({
            newPosts: resJson
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
/*    const previous = <span>previous</span>;
    const next = <span>next</span>;*/
    return (
      <div className="post-container" >
        <ul>
          {newPosts.map((id, key) => (
            <Post key={key} id={id} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Posts;
