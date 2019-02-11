import React, {Component} from 'react';
import './Comment.css';
import Config from './config.json';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.commentId,
      by: null,
      text: null,
      time: null,
      error: null
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData() {
    fetch(Config.baseUrl + this.state.id + '.json')
      .then(res => res.json())
      .then(
        (resJson) => {
          if (resJson.text) {
            this.setState({
              by: resJson.by,
              text: resJson.text,
              time: resJson.time
            });
          }
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
    return (
      <div className="comment-container">
        <div className="user-head">
          <span className="user">Posted By: {this.state.by}</span>
        </div>
        <div className="comment" dangerouslySetInnerHTML={{__html: this.state.text}} />
        <br />
      </div>
    );
  }
}

export default Comment;
