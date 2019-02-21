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
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getData();
    }
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

  handlePreviousClick() {
    this.setState({
      page: this.state.page - 1 > 0 ? this.state.page-1 : this.state.page
    });
  }

  handleNextClick(e) {
    this.setState({
      page: this.state.page + 1 < 9 ? this.state.page+1 : this.state.page
    });
  }

  render() {
    const {newPosts, page} = this.state;
    const previous = <span onClick={this.handlePreviousClick} page={page !== 0 ? page - 1 : 0}>Previous</span>;
    const next = <span onClick={this.handleNextClick} page={page+1}> Next </span>;
    return (
      <div className="post-container" >
        <ul>
          {newPosts.map((id, key) => (
            <Post key={key} id={id} />
          ))}
        </ul>
        {previous} {page + 1} {next}
      </div>
    );
  }
}

export default Posts;
