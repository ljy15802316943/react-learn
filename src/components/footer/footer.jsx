import React from 'react';
import {withRouter} from 'react-router-dom';
import './footer.less';
import Preview from '../preview/preview.jsx';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRelated: false,//显示相关列表弹窗
      pcFooter: {},//底部请求数据
      preview: {},//传给预览组件的数据
      openPreview: false,//打开图片弹窗
    }
  }
  render() {
    return (
      <div className="footerBox">
        <div className="pageBox">
          <div className="topBox">
            {/* 左侧功能 */}
            <div className="letf">
              <img className="logo" src={require('../../assets/img/foot-logo.png')} alt=""/>
              <p>24小时关怀热线</p>
              <div className="related cursor" onClick={ ()=> this.relatedBtn() }>
                <span>相关链接</span>
                <span className={`iconfont ${this.state.showRelated ? 'icon-Group-2 color-09568e' : 'icon-Group-1'}`}></span>
                {/* 相关链接弹窗 */}
                <div onClick={ (e)=> this.relatedBtn(e, true) } className="relatedPopup" style={{display: this.state.showRelated && 'block'}}>东风官方商城</div>
              </div>
            </div>
            {/* 右侧功能 */}
            <div className="right">
              {
                this.state.pcFooter.forum 
                && <ul className="navBox">
                  <li className="navLi">
                    <h3>风迷之家</h3>
                    {
                      this.state.pcFooter.forum.map(v =>
                        <div key={v.id}>{v.title}</div>  
                      )
                    }
                  </li>
                  <li className="navLi">
                    <h3>帮助中心</h3>
                    <div>常见问题</div>
                    <div>意见反馈</div>
                  </li>
                  <li className="navLi">
                    <h3>服务协议</h3>
                    {
                      this.state.pcFooter.agreement.map(v =>
                        <div key={v.id}>{v.title}</div>  
                      )
                    }
                  </li>
                  <li className="navLi">
                    <h3>关于我们</h3>
                    {
                      this.state.pcFooter.about.map(v =>
                        <div key={v.id}>{v.title}</div>  
                      )
                    }
                  </li>
                </ul>
              }
            </div>
          </div>
          {/* 分割线 */}
          <div className="line"></div>
          {/* 底部介绍 */}
          <div className="btmIntroduce">
            <div className="btmLeft">
              <span>©2019东风风光 ALL RIGHT. 渝ICP备16003854号-1</span>
              <img src="https://www.dffengguang.com.cn/static/web/img/j_1.png?v=v1" alt=""/>
              <span>渝公网安备：50010602500350号</span>
              <span>技术支持：</span>
              <span>博彩网络</span>
            </div>
            <div className="btmRight">
              <span className="btmTitle">关注我们</span>
              <img className="cursor" onClick={()=>this.focusBtn(1)} src={require('../../assets/img/weixin.png')} alt=""/>
              <img className="cursor" onClick={()=>this.focusBtn(2)} src={require('../../assets/img/weibo.png')} alt=""/>
              <img className="cursor" onClick={()=>this.focusBtn(3)} src={require('../../assets/img/taobao.png')} alt=""/>
              <img className="cursor" onClick={()=>this.focusBtn(4)} src={require('../../assets/img/guanwang.png')} alt=""/>
            </div>
          </div>
          <div className="btmImg">
            <img src="http://wljg.scjgj.cq.gov.cn/ztgsgl/WebMonitor/ClientControl/images/logo.png" alt=""/>
          </div>
        </div>
        {/* 图片预览 */}
        {
          this.state.openPreview && <Preview close={this.close} preview={this.state.preview} />
        }
      </div>
    )
  }
  componentDidMount() {
    this.getFooter();
  }
  // 点击关注图标
  focusBtn =(index)=> {
    let preview = this.state.pcFooter.focus[index];
    this.setState({
      openPreview: true,//打开图片弹窗
      preview
    });
  }
  // 获取footer数据
  getFooter =()=> {
    React.$axios.get(React.$api.PC_FOOTER, {}).then((res) => {
      this.setState({
        pcFooter: res.data
      });
    })
  }
  // 关闭图片弹窗
  close =()=> {
    this.setState({
      openPreview: false
    })
  }
  // 点击左侧相关链接
  relatedBtn =(e,state)=> {
    if (state) {
      e.stopPropagation();//阻止冒泡
    } else {
      let { showRelated } = this.state;
      this.setState({
        showRelated: !showRelated
      })
    }
  }
} 
export default (withRouter(Footer));