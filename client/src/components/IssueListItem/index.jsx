import './index.scss'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Tag } from 'antd'
import { getUserInfoApi } from '../../api/user'
import { parseTime } from '../../utils'

function IssueListItem(props) {
  const typeList = useSelector(state => state.type.typeList)
  const [userInfo, setUserInfo] = useState({})
  const colorList = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
  let colorIndex = 0
  const typeItem = typeList.find((item, index) => {
    if (item._id === props.issueInfo.typeId) {
      colorIndex = index
      return true
    }
    return false
  })
  const color = colorList[colorIndex % colorList.length]
  useEffect(() => {
    const getUserInfo = async () => {
      const data = await window.httpApi(getUserInfoApi(props.issueInfo.userId))
      setUserInfo(data)
    }
    getUserInfo()
  }, [])
  return (
    <div className="list-item">
      <div className="answer">
        <div className="number">{props.issueInfo.commentNumber}</div>
        <span className='text'>回答</span>
      </div>
      <div className="scan">
        <div className="number">{props.issueInfo.scanNumber}</div>
        <span className='text'>浏览</span>
      </div>
      <div className="content">
        <div className="title">{props.issueInfo.issueTitle}</div>
        <div className="footer">
          <div className="classification">
            <Tag color={color}>{typeItem.typeName}</Tag>
          </div>
          <div className="username-container">
            <div className="username">
              <Tag color='#108ee9'>{userInfo.nickname}</Tag>
            </div>
            <div className="date">{parseTime(props.issueInfo.issueDate)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IssueListItem