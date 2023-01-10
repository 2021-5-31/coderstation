import { useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Input, Select } from 'antd'
import LoginBtn from '../LoginBtn'
import './index.css'

function NavHeader(props) {
  const [searchType, setSearchType] = useState('issue')
  const [searchContent, setSearchContent] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const handleSearch = (value) => {
    if (value) {
      navigate('/search', { state: { searchType, searchContent: value } })
      setSearchContent(value)
    } else {
      navigate('/')
    }
  }
  useEffect(() => {
    if (searchContent && location.pathname !== '/search') {
      setSearchContent('')
    }
  }, [location])
  return (
    <div className='header-container'>
      <div className="header">
        <a href="/">
          <h1 className='logo'>coderstation</h1>
        </a>
        <nav className='header-nav'>
          <NavLink className="header-nav-item" to='/'>问答</NavLink>
          <NavLink className="header-nav-item" to='/books'>书籍</NavLink>
          <NavLink className="header-nav-item" to='/interviews'>面试题</NavLink>
        </nav>
        <div className="search">
          <Input.Group compact>
            <Select defaultValue="issue" size="large" onSelect={(value) => setSearchType(value)}>
              <Select.Option value="issue">问答</Select.Option>
              <Select.Option value="book">书籍</Select.Option>
            </Select>
            <Input.Search
              style={{ width: '80%' }}
              defaultValue=""
              placeholder='请输入要搜索的内容'
              allowClear
              enterButton='搜索'
              size="large"
              value={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
              onSearch={handleSearch}
            />
          </Input.Group>
        </div>
        <div className="login-btn">
          <LoginBtn openLoginForm={props.openLoginForm} />
        </div>
      </div>
    </div>
  )
}

export default NavHeader