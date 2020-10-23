import React from 'react';
import './login.less'

export default class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <img className="loginBg" src={require('../../assets/img/login-bg.jpg')} alt=""/>
        <div className="loginBox">
          {/* 免密登录输入框 */}
          <div className="loginInput">
            <div className="topBox">
              <h3>手机号登录</h3>
              <span>经销商注册 <span className="iconfont icon-qianjin"></span></span>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}