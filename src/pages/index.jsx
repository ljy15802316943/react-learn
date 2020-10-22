import React from 'react';
import './index.less'
import 'antd/dist/antd.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DatePicker } from 'antd';
import { Home, My, Aboot } from '../components';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      router: ''
    }
  }
  render() {
    return (
      <Router>
        <div>
          <h3>这是Index组件。</h3>
          <div className="routerBox">
            <Link to="/Home">首页</Link>
            <Link to="/my/213123">我的</Link>
            <Link to="/about">关于</Link>
          </div>
          <DatePicker/>
          <hr />
          <Route path="/Home" component={Home} />
          <Route path="/my" component={My} />
          <Route path="/about" component={Aboot} />
        </div>
      </Router>
    )
  }
  componentDidMount() { 
    fetch('https://movie.douban.com/j/search_tags?type=tv&source=index')
      .then( res=> {
        console.log(res,'res');
      })
  }
}