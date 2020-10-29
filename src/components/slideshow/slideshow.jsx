import React from 'react';
import './slideshow.less';
import AwesomeSwiper from 'react-awesome-swiper';

export default class SlideShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        loop : true,//循环切换
        autoplay: {
          delay: 3000,//自动播放时间
          stopOnLastSlide: false,//最后一张幻灯片停止自动播放
          disableOnInteraction: true,//禁用在交互
        },
        preloadImages: false,//提前预加载图片
        lazy: true,//图片懒加载
        speed: 500,//图片切换速度
        navigation: {//显示左右滑动箭头
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {//显示分页指示点
          el: '.swiper-pagination',
          bulletElement : 'li',
          hideOnClick :false,//隐藏点击
          clickable :true,//可以点击的
        },
        on: {
          slideChange: function () {//图片索引变化回调函数
            // console.log(this.activeIndex);
          },
        },
      },
      height: '500px',
      activeIndex: 0,//当前图片索引
      banner: [],//图片列表
    }
  }
  render() {
    return (
      <div className="slideshow cursor">
        <AwesomeSwiper config={this.state.config} className="your-classname">
          <div className="swiper-wrapper">
            {
              this.props.banner && this.props.banner.map(v => {
                return (
                  <div className="swiper-slide" style={{height: this.state.height}} key={v.id} onClick={ ()=> this.SlideBtn(v.link) }>
                    <img src={v.photoVal} alt=""/>
                  </div>
                )
              })
            }
          </div>
          {
            this.props.banner 
              && this.props.banner.length > 1 
              && <div className="swiper-pagination"></div>
          }
        </AwesomeSwiper>
      </div>
    )
  }
  static getDerivedStateFromProps(props,state) {

    // 父组件传过来的 type 和 子组件的 type 不一样，那么子组件重新赋值。
    // 也可以理解成，父组件传过来的值变了。
    if (props.loopClose) {
      // 这里执行相应的方法
      state.config.loop = false
      return {
        config: state.config,
        height: props.height || '500px'
      }
    } 
    // 父组件的值没有变化，这里不做任何操作。
    return null
  }
  // 绑定点击事件
  SlideBtn =(link)=> {
    window.open(link);
  }
}