import React from 'react';
import './explord.less';

export default class Explord extends React.Component {
  render() {
    return (
      <div className="topicBox">
        <img className="topicBg" src={this.props.coverVal} alt=""/>
        <div className="mengcheng"></div>
        <div className="btmBox">
          <h3>{this.props.title}</h3>
          <img src={this.props.avatar?this.props.avatar:require('../../assets/img/headUser.png')} alt=""/>
          <div>
            <span className="iconfont icon-xiaoxi"></span>
            <span>{this.props.replies}</span>
            <span className="iconfont icon-icon_chakan"></span>
            <span>{this.props.views}</span>
            <span className="iconfont icon-dianzan"></span>
            <span>{this.props.likes}</span>
          </div>
        </div>
      </div>
    )
  }
}