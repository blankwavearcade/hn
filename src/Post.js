import React, {Component} from 'react';
import Comment from './Comment.js';
import './Post.css';
import Config from './config.json';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      by: null,
      descendants: 0,
      id: props.id,
      kids: [],
      scores: 0,
      time: null,
      title: null,
      type: null,
      url: null,
      error: null,
      iconClass: 'fas fa-plus',
      postClass: 'hidden',
      hasKids: false
    }


    this.getPostClass = this.getPostClass.bind(this);
    this.getIconClass = this.getIconClass.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
    this.getData = this.getData.bind(this);
  }

  getIconClass() {
    let iconClass = 'fas fa-plus';
    if (this.state.iconClass.indexOf('minus') === -1) {
      iconClass = 'fas fa-minus';
    }
    return iconClass;
  }

  getPostClass() {
    let postClass = 'displayed';
    if (this.state.postClass.indexOf('hidden') === -1) {
      postClass = 'hidden';
    }
    return postClass;
  }

  handleIconClick(e) {
    let iconClass = this.getIconClass();
    let postClass = this.getPostClass();
    this.setState(state => ({
      isPostOpen: !state.isPostOpen,
      iconClass: iconClass,
      postClass: postClass
    }));
  }

  getData() {
    fetch(Config.baseUrl + this.state.id)
      .then(res => res.json())
      .then(
        (resJson) => {
          this.setState({
            by: resJson.by,
            descendants: resJson.descendants,
            kids: resJson.kids,
            score: resJson.score,
            time: resJson.time,
            title: resJson.title,
            type: resJson.story,
            url: resJson.url
          });
      },
      (error) => {
        this.setState({
          error
        });
      }
    )
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    let commentList = null;
    if (this.state.kids) {
      commentList = this.state.kids.map((commentId, i) => (
        <Comment key={i} commentId={commentId} />
      ));
    }
    return (
      <li>
         <i className={this.state.iconClass} onClick={this.handleIconClick} ></i>
         <a href={this.state.url}>{this.state.title}</a>
         <span className="posted-by"> Posted By: {this.state.by}</span>
         <div className={this.state.postClass}>
          {commentList !== null ? commentList : false }
         </div>
      </li>
    );
  }

}

export default Post;
