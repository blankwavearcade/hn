import React, {Component} from 'react';
import Comment from './Comment.js';


class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: props.comments
    }
  }

  render() {
    let comments = this.state.comments;
    return comments.map((commentId, i) =>
      <Comment key={i} commentId={commentId} />
    );
  }
}

export default Comments;
