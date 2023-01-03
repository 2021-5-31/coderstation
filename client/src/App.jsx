import { Layout, message } from 'antd';
import NavHeader from './components/NavHeader'
import Router from './router'
import LoginForm from '../src/components/LoginForm'
import { useState, useEffect } from 'react'
import './css/App.css'
import { resumeLoginApi, getUserInfoApi } from './api/user'
import { initUserInfo, updateLoginStatus } from './redux/userSlice'
import { useDispatch } from 'react-redux'

const { Header, Footer, Content } = Layout;

function App() {
  const [isOpenLoginForm, setIsOpenLoginForm] = useState(false)
  const dispatch = useDispatch()
  const token = localStorage.getItem('coderstation-user-token')
  const openLoginForm = () => {
    setIsOpenLoginForm(true)
  }
  const closeLoginForm = () => {
    setIsOpenLoginForm(false)
  }
  const resumeLogin = async () => {
    const res = await resumeLoginApi()
    if (res.code === 0) {
      const resp = await getUserInfoApi(res.data._id)
      if (res.code === 0) {
        dispatch(initUserInfo(resp.data))
        dispatch(updateLoginStatus(true))
      }
    } else {
      message.error(res.msg)
      localStorage.removeItem('coderstation-user-token')
    }
  }
  useEffect(() => {
    if (token) {
      resumeLogin()
    }
  }, [])
  return (
    <div className="App">
      <Header>
        <NavHeader openLoginForm={openLoginForm} />
      </Header>
      <Content className='main'>
        <Router />
      </Content>
      <Footer></Footer>
      <LoginForm openLoginForm={isOpenLoginForm} closeLoginForm={closeLoginForm} />
    </div>
  );
}

export default App;
