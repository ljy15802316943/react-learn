import React from 'react';
import 'antd/dist/antd.css';
import '../assets/css/iconfont.css'
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from './home/home.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}