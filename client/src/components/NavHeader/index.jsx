import React from 'react'
import { NavLink } from 'react-router-dom'
import { Input, Select } from 'antd';
function index() {
  return (
    <div className='header-container'>
      <div className="header">
        <a href="">
          <h1 className='logo'></h1>
        </a>
        <nav className='header-nav'>
          <NavLink className="header-nav-item" to='/'>问答</NavLink>
          <NavLink className="header-nav-item" to='/books'>书籍</NavLink>
          <NavLink className="header-nav-item" to='/interviews'>面试</NavLink>
        </nav>
        <div className="search">
          <Input.Group compact>
            <Select defaultValue="issue" size="large">
              <Select.Option value="issue">问答</Select.Option>
              <Select.Option value="book">书籍</Select.Option>
            </Select>
            <Input.Search style={{ width: '80%' }} defaultValue="" placeholder='请输入要搜索的内容' allowClear enterButton='搜索' size="large" />
          </Input.Group>
        </div>
        <div className="login">
          
        </div>
      </div>
    </div>
  )
}

export default index