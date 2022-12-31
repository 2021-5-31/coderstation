import { Layout } from 'antd';
import NavHeader from './components/NavHeader'
import Router from './router'
import './css/App.css'

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Header>
        <NavHeader />
      </Header>
      <Content className='main'>
        <Router />
      </Content>
      <Footer></Footer>
    </div>
  );
}

export default App;
