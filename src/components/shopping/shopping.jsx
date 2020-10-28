import React from 'react';
import './shopping.less'

export default class Shopping extends React.Component {
  render() {
    return (
      <div className="shoppingBox">
        <img src={this.props.coverVal} alt=""/>
        <div className="btmBox">
          <p>{this.props.name}</p>
          <div>
            <span className="iconfont icon-tubiaozhizuo"> {this.props.coin}</span>
          </div>
        </div>
      </div>
    )
  }
}