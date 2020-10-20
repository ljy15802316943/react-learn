import React from 'react';
import './CmtList.less';
import { ComListItem } from '../../components';
 
export default class CmtList extends React.Component {
  constructor() {
    super();
    this.state = {
      cmtList: [
        {
          id: 1,
          user: '张三',
          content: '哈哈，沙发。'
        },
        {
          id: 2,
          user: '撒大声地',
          content: '哈哈，沙发。'
        },
        {
          id: 3,
          user: '大幅度',
          content: '哈哈，沙发。'
        },
        {
          id: 4,
          user: '地方',
          content: '哈哈，沙发。'
        },
        {
          id: 5,
          user: '地方',
          content: '哈哈，沙发。'
        },
      ]
    }
  }
  render() {
    return (
      <div className="cmtBox">
        <ul>
          {this.state.cmtList.map(
            v => <li key={v.id}><ComListItem list={v} /></li>
          )}
        </ul>
      </div>
    )
  }
}