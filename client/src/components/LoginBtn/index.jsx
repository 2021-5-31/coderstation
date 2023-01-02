import React from 'react'
import './index.scss'
import { useSelector } from 'react-redux'
import { Button, Popover, List } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

function Index(props) {
  const { isLogin } = useSelector(state => state.user)
  const listData = ['个人中心', '退出登录']
  const content = (
    <List
      itemLayout="horizontal"
      dataSource={listData}
      renderItem={(item) => (
        <List.Item>
          {item}
        </List.Item>
      )}
    />
  )
  let loginStatusContent = null
  if (isLogin) {
    loginStatusContent = (
      <>
        <div className="user-name">2323</div>
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