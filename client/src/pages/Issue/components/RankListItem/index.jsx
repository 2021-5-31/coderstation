import './index.scss'
import classnames from "classnames";
import { useState } from 'react'
import { Avatar } from 'antd'

function RankListItem(props) {
  const [classNameCollection] = useState({
    "iconfont": true,
    "icon-jiangbei-": true
  })
  let rankOrder
  switch (props.rankOrder) {
    case 1:
      rankOrder = <span className={classnames(classNameCollection)} style={{ color: '#ffda23', fontSize: '20px' }}></span>
      break
    case 2:
      rankOrder = <span className={classnames(classNameCollection)} style={{ color: '#c5c5c5', fontSize: '20px' }}></span>
      break
    case 3:
      rankOrder = <span className={classnames(classNameCollection)} style={{ color: '#cd9a62', fontSize: '20px' }}></span>
      break
    default:
      rankOrder = props.rankOrder
  }
  return (
    <li className={classnames('rank-list-item flex', { 'mb-10': props.rankOrder !== 10 })}>
      <div className="rank-order flex justify-content-center align-item-center" >{rankOrder}</div>
      <div className="user-info flex justify-content-between align-item-center">
        <div className="user-container flex align-item-center">
          <div className="mr-10">
            <Avatar className='avatar' src={props.userInfo?.avatar} />
          </div>
          <div className="username">{props.userInfo?.nickname}</div>
        </div>
        <div className="point">{props.userInfo?.points > 10000 ? '9999+' : props.userInfo?.points}</div>
      </div>
    </li>
  )
}

export default RankListItem