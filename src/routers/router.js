import React from 'react';
import { Switch, Route, Redirect } from 'react-dom';
import { Login } from '../views/index.js';

export default class RouterIndex extends React.Component {
  render(){
      return (
        <Switch>
          <Route path="/login" component={Login}/>
        </Switch>
      );
  }
}