import React from 'react';
import './talent.less';

export default class Talent extends React.Component {
  render() {
    return (
      <div className="talent">
        {/* 头像 */}
        <img className="photo" src={this.props.avatar?this.props.avatar:require('../../assets/img/headUser.png')} alt=""/>
        {/* 用户信息 */}
        <div className="userInfo">
          <h5 className="ellipsis">{this.props.nickname}</h5>
          <span className="ellipsis">{this.props.sign?this.props.sign:'这家伙很懒，什么都没留下'}</span>
        </div>
        {/* 关注 */}
        <div className={this.props.isFollow===1?'isFocus':'Focus'} onClick={ ()=> this.isFocus }>
          {this.props.isFollow===1?'已关注':'关注'}
        </div>
      </div>
    )
  }
  // 是否关注
  isFocus =()=> {
    console.log(123)
  }
}