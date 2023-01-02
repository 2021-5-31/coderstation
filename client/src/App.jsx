import { Layout } from 'antd';
import NavHeader from './components/NavHeader'
import Router from './router'
import LoginForm from '../src/components/LoginForm'
import { useState } from 'react'
import './css/App.css'

const { Header, Footer, Content } = Layout;

function App() {
  const [isOpenLoginForm, setIsOpenLoginForm] = useState(false)
  const openLoginForm = () => {
    setIsOpenLoginForm(true)
  }
  const closeLoginForm = () => {
    setIsOpenLoginForm(false)
  }
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
