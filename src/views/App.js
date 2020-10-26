import React from 'react';
import 'antd/dist/antd.css';
import '../assets/css/iconfont.css'
import { Switch, Route } from "react-router-dom";

import Home from './home/home.jsx';
import Login from './login/login.jsx';
import { Header } from '../components';
import Axios from '../assets/js/axios';
import Api from '../assets/js/api.js';


export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </div>
    )
  }
}
// 绑定全局axios请求
React.$axios = Axios;
// 绑定全局api域名
React.$api = Api;