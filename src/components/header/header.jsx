import React from 'react';
import 'antd/dist/antd.css';
import './header.less'
import { Menu,Popover } from 'antd';
import {withRouter} from 'react-router-dom';

const { SubMenu } = Menu;
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '1',//导航索引
      userInfo:{},//用户登录信息
      userAllInfo: {},//用户全部信息
      carClass: [],//车型分类数据
      rhghtNavList: [//个人信息列表
        {
          id: 1,
          link: '',
          content: '个人中心',
        },
        {
          id: 2,
          link: '',
          content: '资料与账号',
        },
        {
          id: 3,
          link: '',
          content: '我的发布',
        },
        {
          id: 4,
          link: '',
          content: '我的评论',
        },
        {
          id: 5,
          link: '',
          content: '我的活动',
        },
        {
          id: 6,
          link: '',
          content: '风迷礼品',
        },
        {
          id: 7,
          link: '',
          content: '风迷电子券',
        },
        {
          id: 8,
          link: '',
          content: '退出登录',
        }
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
              <Menu.Item key="1">首页</Menu.Item>
              <SubMenu key="2" title="风迷之家">
                {
                  this.state.carClass.map(
                    v => <Menu.Item onClick={ ()=>this.carClassBtn(v.id) } key={`setting:${v.id}`}>{v.title}</Menu.Item>
                  )
                }
              </SubMenu>
              <Menu.Item key="3" >风迷圈</Menu.Item>
              <Menu.Item key="4" >风迷话题</Menu.Item>
              <Menu.Item key="5" >活动招募</Menu.Item>
              <Menu.Item key="6" >风迷商城</Menu.Item>
            </Menu>
          </div>
          {/* 右侧导航 */}
          <div className="rightBox">
            {
              // 判断是否登录
              this.state.userInfo.id
                ? <Popover content={this.state.rightNavList}>
                    <span style={{color: '#09568e'}}>{this.state.userAllInfo.nickname}</span>
                  </Popover>
                : <div className="logins cursor" onClick={this.toLoginLink}>
                    <i className="iconfont icon-icon_huabanfuben"></i>
                    <span>登录</span>
                  </div>
            }
            <span className="cursor" onClick={ ()=>this.goLink('https://mall.dffengguang.com.cn') }>风光官网</span>
            <span className="cursor" onClick={ ()=>this.goLink('https://www.dffengguang.com.cn') }>官方商城</span>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.getUserInfo();// 获取用户登录信息
    this.getCarClass();// 获取车型分类
  }
  // 监听路由变化，如果是首页则读取本地缓存
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname === '/') {
      this.getUserInfo();// 获取用户登录信息
    }
  }
  // 获取车型分类
  getCarClass =()=> {
    React.$axios.get(React.$api.HOME_FORUMTYPE, {}).then((res) => {
      this.setState({
        carClass: res.data
      })
    })
  }
  // 获取用户全部信息
  getMemberInfo =()=> {
    React.$axios.get(React.$api.MEMBER_INFO, {}).then((res) => {
      let userAllInfo = res.data;
      this.setState({
        userAllInfo
      });
      localStorage.setItem('userAllInfo', JSON.stringify(userAllInfo));
    })
  }
  // 获取用户登录信息
  getUserInfo =()=> {
    let { userInfo, rightNavList } = this.state;
    
    if (localStorage.getItem('userInfo')) {
      this.getMemberInfo();
      userInfo = JSON.parse(localStorage.getItem('userInfo'));
    } else {
      userInfo = {};
    }
    // 渲染右侧导航数据
    rightNavList = this.state.rhghtNavList.map(
      v=><p className="rightNavBg cursor" onClick={ ()=>this.rhghtNavBtn(v.content) } key={v.id}>{v.content}</p>
    );
    this.setState({
      userInfo,
      rightNavList
    });
  }
  // 点击车型分类
  carClassBtn =(id)=> {
    console.log(id)
  }
  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  }
  // 跳转官网
  goLink = (url) => {
    window.open(url);
  }
  // 点击右侧导航栏
  rhghtNavBtn = (nav) => {
    if (nav === '退出登录') {
      localStorage.clear();
      this.setState({
        userInfo: {}
      })
    }
  }
  // 去登陆
  toLoginLink = () => {
    this.props.history.replace('/login');
  }
}
export default (withRouter(Header));