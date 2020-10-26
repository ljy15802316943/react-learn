import React from 'react';
import './login.less'
import { message } from 'antd';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        phone: "",//用户账号
        password: "",//用户密码
        session_id: "",
        sig: "",
        token: "",
      }
    }
  }
  render() {
    return (
      <div className="login">
        <img className="loginBg" src={require('../../assets/img/login-bg.jpg')} alt=""/>
        <div className="loginBox">
          {/* 免密登录输入框 */}
          <div className="loginInput">
            <div className="topBox cursor">
              <h3>手机号登录</h3>
              <span>经销商注册 <span className="iconfont icon-qianjin"></span></span>
            </div>
            {/* 输入账号密码 */}
            <div className="inputBox">
              <input className='user' value={this.state.form.phone} onChange={ (e)=>this.userInputChange(e, 'phone') } type="text" placeholder='请输入手机号'/>
              <input className='password' value={this.state.form.password} onChange={ (e)=>this.userInputChange(e, 'password') }  type="text" placeholder='请输入密码'/>
            </div>
            <div className='loginBtn cursor' onClick={this.loginBtn}>登录</div>
            <div className='btmBox'>
              <span>免密登录</span>
              <span>找回密码</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  loginBtn =()=> {
    const { phone, password } = this.state.form;
    if (!phone) {
      message.warning('请输入手机号');
      return
    } 
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(phone)) {
      message.warning('请输入正确的手机号');
      return
    } 
    if (!password) {
      message.warning('请输入密码');
      return
    } 
    React.$axios.post(React.$api.MEMBER_SIGNIN,this.state.form).then((res) => {
      if (res.returnCode === '200') {
        message.success(res.msg);
        // 保存用户登录信息
        localStorage.setItem('userInfo',JSON.stringify(res.data));
        setTimeout(()=> {
          this.props.history.replace('/');
        },1000);
      }
    })
  }
  // 获取用户输入信息
  userInputChange =(e,type)=> {
    const { form } = this.state;
    form[type] = e.target.value;
    this.setState({form});
  }
}