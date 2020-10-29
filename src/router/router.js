import React from 'react';
import {Switch,Route} from "react-router-dom";
import Home from '../views/home/home.jsx';//首页
import Login from '../views/login/login.jsx';//登录
import Post from '../views/post/post.jsx';//发帖
import ForumDetail from '../views/forumDetail/forumDetail.jsx';//发帖详情

export default class RouterIndex extends React.Component {
  render(){
    return (
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/post" component={Post}></Route>
        <Route path="/forumDetail" component={ForumDetail}></Route>
      </Switch>
    );
  }
}