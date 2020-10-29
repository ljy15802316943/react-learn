import React from 'react';
import './forumDetail.less';
import { Menu, Dropdown, Button } from 'antd';
import { PostItem, SlideShow } from '../../components';
import { DownOutlined } from '@ant-design/icons';

export default class ForumDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {},
      dates: {
        forum: '',
        page: 1,
        limit: 10,
        type: 0,
        sort: '',
      },
      list: [],//帖子列表 
      banner: [],//轮播图数据
      filterList: [//发帖筛选
        '最新发布', '最后回复', '点赞最多', '回复最多', '浏览最多'
      ],
      cateList: [],//资讯筛选标题
      cateIndex: 0,//资讯筛选高亮索引
      dropdownText: '筛选',
      fliterIndex: '1',//筛选高亮索引
    };
  }
  render() {
    const menu = (
      <Menu onClick={this.menuSelect}>
        {
          this.state.filterList.map((v,i) =>
            <Menu.Item key={i}>{v}</Menu.Item>
          )
        }
      </Menu>
    );
    return (
      <div className="forumDetail">
        {/* 头部标题 */}
        <div className="topBox">
          <span className="iconfont icon-home cursor" onClick={this.toHome}></span>
          <span>风迷之家</span>
          <span className="iconfont icon-qianming"></span>
          <span>风光ix5风迷之家</span>
        </div>

        {/* 中间内容 */}
        <div className="pageBox">
          {/* 左边容器 */}
          <div className="left">
            {/* 轮播图 */}
            <div className="swiper">
              <SlideShow loopClose={true} height="310px" banner={this.state.banner} />
            </div>
            {/* 帖子筛选 */}
            <div className="filter">
              <ul className="information">
                {
                  this.state.cateList 
                    && this.state.cateList.map(v => 
                      <li className="cursor" style={{color: this.state.cateIndex === v.id && '#08568D'}} onClick={ ()=> this.cateItemBtn(v.id) } key={v.id}>{v.title}</li>
                    )
                }
              </ul>
              <div className="selectBtn">
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                  <Button>
                    {this.state.dropdownText} <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
            </div>
            
            {/* 发帖列表 */}
            <ul className="listBox">
              {
                this.state.list.length > 0
                  && this.state.list.map(v => 
                    <li key={v.id}><PostItem {...v} /></li>
                  )
              }
            </ul>
          </div>
          {/* 右边容器 */}
          <div className="right">
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.getHomeList();
  }
  // 监听路由参数变化
  static getDerivedStateFromProps(props,state) {
    let params = props.history.location.state;
    if (params.id !== state.params.id) {
      state.dates.forum = params.id
      return {
        params,//把父组件最新的props重新赋值到 state。
        dates: state.dates
      }
    }
    return null
  }
  // 跳转首页
  toHome =()=> {
    // 缓存点击的路由，作用是当前页面刷新保持导航索引高亮
    localStorage.setItem('menvIndex',JSON.stringify('/'));
    this.props.history.push('/');
  }
  // 获取当前页数据
  getHomeList =()=> {
    let photopcArr = []
    React.$axios.get(React.$api.HOME_HOME_LIST, this.state.dates).then((res) => {
      let arr = res.data.banner.photopcArr;
      // 传给轮播图的数据改成对象
      if (arr.length>0) {
        arr.map(v => {
          photopcArr.push({
            id: Math.random(),
            link: '',
            photoVal: v
          });
          return photopcArr;
        })
      }
      this.setState({
        banner: photopcArr,
        cateList: res.data.cate,
        list: res.data.list
      })
    })
  }
  // 发帖资讯筛选
  cateItemBtn =(index)=> {
    this.setState({
      cateIndex: index
    })
  }
  // 发帖筛选选中
  menuSelect =(e)=> {
    let text = e.item.props.children[1];
    this.setState({
      dropdownText: text
    })
  }
}