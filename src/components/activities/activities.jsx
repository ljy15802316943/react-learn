import React from 'react';
import './activities.less';

export default class Activities extends React.Component {
  render() {
    return (
    <div className="activities">
      {/* 活动图片和拖动类型 */}
      <div className="imgBox">
        <img src={this.props.coverVal} alt=""/>
        <div className="activitieType" style={{backgroundColor: this.props.status==='将开始'&&'#08568B'}}>{this.props.status}</div>
      </div>
      {/* 底部详请 */}
      <div className="btmBox">
        <h3 className="title">{this.props.title}</h3>
        {/* 活动时间 */}
        <div className="time">
          <span className="iconfont icon-gouwuche"></span>
          <span className="timeBox">活动时间: {`${React.$public.formatDate(this.props.timelineStart,'yyyy-MM-dd hh:mm')}~${React.$public.formatDate(this.props.timelineEnd,'yyyy-MM-dd hh:mm')}`}</span>
        </div>
        {/* 活动地址 */}
        <div className="address">
          <span className="iconfont icon-dizhi"></span>
          <span>{this.props.deaName}</span>
        </div>
        {/* 报名人数 */}
        <div className="numBox">{this.props.applynumber || 0} 人已报名</div>
      </div>
    </div>
    )
  }
}