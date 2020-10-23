import React from 'react';
import { Header } from '../../components';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from '../login/login.jsx';


export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Header history={this.props.history} />
        
        <Switch>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </div>
    )
  }
}