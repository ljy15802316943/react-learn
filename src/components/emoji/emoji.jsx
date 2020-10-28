import React from 'react';
import './emoji.less';
import emoji from '../../assets/static/emoji/emoji.json';

export default class Emoji extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '../../assets/emoji/tt/',//表情包路径
    }
  }
  render() {
    return (
      <div className="emojiBox">
        {/* 关闭表情包 */}
        <div className="close cursor" onClick={this.close}>
          <span className="iconfont icon-shanchu"></span>
        </div>
        <ul className="emojiUl">
          {
            emoji.emoticons.map(v => {
              return (
                <li className="emojiLi" key={v.chs} onClick={ ()=> this.selectEmoji(v.chs) }><img src={require('../../assets/emoji/tt/' + v.png)} alt=""/></li>
              )
            })
          }
        </ul>
      </div>
    )
  }
  // 关闭表情包
  close =()=> {
    this.props.emojiClose();
  }
  // 选择表情包
  selectEmoji =(e)=> {
    this.props.selectEmoji(e);
  }
}