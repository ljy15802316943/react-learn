import React from 'react';
import 'antd/dist/antd.css';
import '../assets/css/index.css'
import '../assets/css/iconfont.css'
import './App.less'
import { Header, Footer } from '../components';
import Axios from '../assets/js/axios';
import Api from '../assets/js/api.js';
import Public from '../assets/js/public.js';
import {withRouter} from 'react-router-dom';
import RouterIndex from '../router/router.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rightNavList: [
        {
          id: 1,
          content: '发布',
          iconfont: 'icon-fabu',
          link: function() {
            props.history.push('/post');
          }
        },
        {
          id: 2,
          content: '客服',
          iconfont: 'icon-kefu',
          link: function() {
            window.open('https://cschat-ccs.aliyun.com/index.htm?tntInstId=_1194WK0&scene=SCE00003032');
          }
        },
        {
          id: 3,
          content: '返回顶部',
          iconfont: 'icon-fanhuidingbu',
          link: function() {
            React.$public.backTop();
          }
        }
      ]
    }
  }
  render() {
    // 绑定全局公用route
    window._ROUTER_ = this.props.history;
    return (
      <div className="app noselect">
        <Header />
        <main className="mainBox">
          {/* 右侧浮动导航 */}
          <div className="sideBox">
            {
              this.state.rightNavList.map(v => {
                return (
                  <div className={`cursor ${v.id===3 && 'backTop'}`} key={v.id} onClick={ ()=>this.navBtn(v.link) }>
                    <span className={`iconfont ${v.iconfont}`}></span>
                    <span>{v.content}</span>
                  </div>
                )
              })
            }
          </div>
          <RouterIndex />
        </main>
        <Footer />
      </div>
    )
  }
  // 右侧导航
  navBtn =(event)=> {
    event();
  }
}
export default (withRouter(App));
// 绑定全局axios请求
React.$axios = Axios;
// 绑定全局api域名
React.$api = Api;
// 绑定全局公用方法
React.$public = Public;