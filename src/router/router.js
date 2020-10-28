import React from 'react';
import {Switch,Route} from "react-router-dom";
import Home from '../views/home/home.jsx';
import Login from '../views/login/login.jsx';
import Post from '../views/post/post.jsx';

export default class RouterIndex extends React.Component {
  render(){
    return (
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/post" component={Post}></Route>
      </Switch>
    );
  }
}