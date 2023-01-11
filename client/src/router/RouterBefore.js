import Router from './router'
import { useLocation } from 'react-router-dom'
import { Alert } from 'antd'
import authRoute from './authRoute'

function RouterBefore() {
  const location = useLocation()
  const route = authRoute.filter(item => item.path === location.pathname)[0]
  if (route) {
    if (route.auth && !localStorage.getItem('coderstation-user-token')) {
      return <Alert
        message="提示"
        description="请先登录"
        type="warning"
        showIcon
      />
    }
  }
  return (
    <Router />
  )
}

export default RouterBefore