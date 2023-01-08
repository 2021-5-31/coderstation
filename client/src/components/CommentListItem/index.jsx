import './index.scss'
import { Avatar } from 'antd'
import { getUserInfoApi } from '../../api/user'
import { useState, useEffect } from 'react'
import { parseTime } from '../../utils'

function CommentListItem(props) {
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    const getUserInfo = async () => {
      const data = await window.httpApi(getUserInfoApi(props.commentInfo.userId))
      setUserInfo(data)
    }
    getUserInfo()
  }, [])
  return (
    <div className='comment-list-item pt-20 pb-20'>
      <div className="comment-user-info flex align-item-center">
        <span className="avatar mr-20">
          <Avatar src={userInfo?.avatar} />
        </span>
        <div className="username-container">
          <span className="username">{userInfo?.nickname}</span>
          <span className="comment-date">{parseTime(props.commentInfo.commentDate)}</span>
        </div>
      </div>
      <div className="comment-content" dangerouslySetInnerHTML={{ __html: props.commentInfo.commentContent }}></div>
    </div>
  )
}

export default CommentListItem