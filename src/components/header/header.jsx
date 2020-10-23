import React from 'react';
import 'antd/dist/antd.css';
import './header.less'
import { Menu,Popover } from 'antd';

const { SubMenu } = Menu;
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '1',//导航索引
      isLogin: false,//是否登录
      rhghtNavList: [
        '个人中心','资料与账号','我的发布','我的评论','我的活动','风迷礼品','风迷电子券','退出登录'
      ]
    }
  }
  render() {
    return (
      <div className="header">
        <div className="headerBox">
          {/* 官方logo */}
          <div className="headerLogo">
            <img src={require('../../assets/img/logo.jpg')} alt=""/>
          </div>
          {/* 导航菜单 */}
          <div className="menuBox">
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
              <Menu.Item key="1">
                首页
              </Menu.Item>
              <SubMenu key="2" title="风迷之家">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </SubMenu>
              <Menu.Item key="3" >
                风迷圈
              </Menu.Item>
              <Menu.Item key="4" >
                风迷话题
              </Menu.Item>
              <Menu.Item key="5" >
                活动招募
              </Menu.Item>
              <Menu.Item key="6" >
                风迷商城
              </Menu.Item>
            </Menu>
          </div>
          {/* 右侧导航 */}
          <div className="rightBox">
            <div className="logins cursor" onClick={this.toLoginLink}>
              <i className="iconfont icon-icon_huabanfuben"></i>
              <span>登录</span>
            </div>
            <span className="cursor" onClick={ ()=>this.goLink('https://mall.dffengguang.com.cn') }>风光官网</span>
            <span className="cursor" onClick={ ()=>this.goLink('https://www.dffengguang.com.cn') }>官方商城</span>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.setState({// 渲染右侧导航数据
      PopoverContent: this.state.rhghtNavList.map(
        v=><p className="rightNavBg cursor" onClick={ ()=>this.rhghtNavBtn(v) } key={v}>{v}</p>
      )
    })
  }
  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  }
  // 跳转官网
  goLink = (url) => {
    window.open(url);
  }
  // 跳转右侧导航栏
  rhghtNavBtn = (nav) => {
    console.log(nav)
  }
  // 去登陆
  toLoginLink = () => {
    this.props.history.push('/login');
  }
}