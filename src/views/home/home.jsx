import React from 'react';
import './home.less';
import { message } from 'antd';
import { SlideShow, Talent, Forum, Activities } from '../../components';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pcMain: {},//首页数据
    }
  }
  render() {
    return (
      <div className="home">
        <div className="pageBox">
          <div className="topBox">
            <div className="left">
              <SlideShow banner={this.state.pcMain.banner} />
            </div>
            <div className="right">
              <h3 className="title">风迷达人</h3>
              {
                this.state.pcMain.famousMan && this.state.pcMain.famousMan.map(v => {
                  return (
                    <div key={v.accountId} onClick={ ()=> this.talentBtn(v.accountId) }>
                      <Talent {...v} />
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="forum">
            <h3 className="title">风迷之家</h3>
            <Forum carlist={this.state.pcMain.forum} />
          </div>
          <div className="Activities">
            <h3 className="title">活动招募</h3>
            <Activities activity={this.state.pcMain.activity} />
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.getPcMain();
  }
  // 获取首页数据
  getPcMain =()=> {
    React.$axios.get(React.$api.HOME_PC_MAIN, {}).then((res) => {
      this.setState({
        pcMain: res.data
      });
      localStorage.setItem('pcMain', JSON.stringify(res.data));
    })
  }
  // 点击关注
  talentBtn =(id)=> {
    let { pcMain } = this.state;
    let index = pcMain.famousMan.findIndex(v => v.accountId === id);
    React.$axios.post(React.$api.MEMBER_FOLLOW, {accountId: id}).then((res) => {
      message.success(res.msg);
      pcMain.famousMan[index].isFollow = res.data.status;
      this.setState({
        pcMain
      })
    })
  }
}