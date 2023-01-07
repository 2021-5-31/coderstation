import React from 'react'
import './index.scss'
import { useSelector } from 'react-redux'
import { Button, Popover, List } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { clearUserInfo, updateLoginStatus } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'

function Index(props) {
  const { isLogin, userInfo } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const listData = [
    {
      label: '个人中心',
      value: 1
    },
    {
      label: '退出登录',
      value: 2
    },
  ]
  const clickListItem = (value) => {
    if (value === 1) {

    } else {
      dispatch(clearUserInfo())
      dispatch(updateLoginStatus(false))
      localStorage.removeItem('coderstation-user-token')
      navigate('/')
    }
  }
  const content = (
    <List
      itemLayout="horizontal"
      dataSource={listData}
      renderItem={(item) => (
        <List.Item className='user-list-item' onClick={() => clickListItem(item.value)}>
          {item.label}
        </List.Item>
      )}
    />
  )
  let loginStatusContent = null
  if (isLogin) {
    loginStatusContent = (
      <>
        <div className="user-name">{userInfo.nickname}</div>
        <Popover content={content} placement='bottom'>
          <CaretRightOutlined className='arrow-right' />
        </Popover>
      </>
    )
  } else {
    loginStatusContent = (
      <Button type="primary" size='large' onClick={props.openLoginForm}>登录/注册</Button>
    )
  }
  return (
    <>
      {loginStatusContent}
    </>
  )
}

export default Index