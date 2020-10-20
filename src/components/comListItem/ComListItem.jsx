import React from 'react';
import './ComListItem.less';

export default class ComListItem extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div className="itemBox">
        <h3>评论人：{this.props.list.user}</h3>
        <div className="itemBtm">
          评论内容：{this.props.list.content}
        </div>
      </div>
    )
  }
}