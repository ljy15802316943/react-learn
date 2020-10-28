import React from 'react';
import './preview.less'

export default class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: props.preview,//图片数据
    }
  }
  render() {
    return (
      <div className="previewBox">
        {/* 蒙层 */}
        <div className="mengcheng"></div>
        {/* 弹窗内容 */}
        <div className="previewCot">
          {/* 关闭按钮 */}
          <div className="iconfont icon-shanchu close cursor" onClick={this.close}></div>
          <h3 className="previeTitle">扫码关注东风风光</h3>
          <img className="previeImg" src={this.props.preview.photoVal} alt=""/>
          <p>{this.props.preview.title}</p>
        </div>
      </div>
    )
  }
  // 关闭弹窗
  close =()=> {
    this.props.close();
  }
}