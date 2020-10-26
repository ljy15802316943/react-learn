import React from 'react';
import './forum.less';

export default class Forum extends React.Component {
  render() {
    return (
      <div className="forumBox">
        <ul className="carlist">
          { 
            this.props.carlist && this.props.carlist.map(v => {
              return (
                <li key={v.carId}>
                  <div className="carItem">
                    <img src={v.pcconVal} alt=""/>
                    <h3>{v.title}</h3>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}