import React, { useState, useRef, useEffect } from 'react'
import { Modal, Radio, Button, Checkbox, Form, Input, Row, Col } from 'antd'
import { getCaptchaApi } from '../../api/user'
import './index.scss'

function Index(props) {
  const handleOk = () => {
    // setIsModalOpen(false);
  }
  const [radioValue, setRadioValue] = useState(1)
  const [userInfo, setUserInfo] = useState({
    loginId: "",
    loginPwd: "",
    captcha: "",
    remember: false
  })
  const [registerInfo, setRegisterInfo] = useState({
    loginId: "",
    nickname: "",
    captcha: "",
  })
  const [captcha, setCaptcha] = useState('')
  const loginFormRef = useRef()
  const handleRadioChange = ({ target }) => {
    setRadioValue(target.value)
    getCaptcha()
  }
  const updateInfo = (info, setInfo, key, value) => {
    const newInfo = { ...info }
    newInfo[key] = value
    setInfo(newInfo)
  }
  const getCaptcha = async () => {
    const res = await getCaptchaApi()
    setCaptcha(res)
  }
  useEffect(() => {
    getCaptcha()
  },[props.openLoginForm])
  const onFinish = () => {

  }
  const onFinishFailed = () => {

  }
  let form = null
  if (radioValue === 1) {
    form = (
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 20,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        ref={loginFormRef}
      >
        <Form.Item
          label="登录账号"
          name='loginId'
          rules={[
            {
              required: true,
              message: '请输入登录账号',
            },
          ]}
        >
          <Input value={userInfo.loginId} onChange={(e) => updateInfo(userInfo, setUserInfo, 'loginId', e.target.value)} />
        </Form.Item>

        <Form.Item
          label="登录密码"
          name='loginPwd'
          rules={[
            {
              required: true,
              message: '请输入登录密码',
            },
          ]}
        >
          <Input.Password value={userInfo.loginPwd} onChange={(e) => updateInfo(userInfo, setUserInfo, 'loginPwd', e.target.value)} />
        </Form.Item>
        <Form.Item
          label="验证码"
          name='captcha'
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
          ]}
        >
          <Row align="middle">
            <Col span={15}>
              <Input
                value={userInfo.captcha} onChange={(e) => updateInfo(userInfo, setUserInfo, 'captcha', e.target.value)}
              />
            </Col>
            <Col span={8}>
              <div dangerouslySetInnerHTML={{ __html:captcha}} className='captcha' onClick={getCaptcha}></div>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name='remember'
          wrapperCol={{
            offset: 5,
            span: 20,
          }}
        >
          <Checkbox checked={userInfo.remember} onChange={(e) => updateInfo(userInfo, setUserInfo, 'remember', e.target.checked)}>记住我</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 20,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  } else {
    form = (
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 20,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        ref={loginFormRef}
      >
        <Form.Item
          label="登录账号"
          name='loginId'
          rules={[
            {
              required: true,
              message: '请输入登录账号',
            },
          ]}
        >
          <Input value={registerInfo.loginId} onChange={(e) => updateInfo(registerInfo, setRegisterInfo, 'loginId', e.target.value)} />
        </Form.Item>

        <Form.Item
          label="用户昵称"
          name='nickname'
        >
          <Input value={registerInfo.nickname} onChange={(e) => updateInfo(registerInfo, setRegisterInfo, 'nickname', e.target.value)} />
        </Form.Item>
        <Form.Item
          label="验证码"
          name='captcha'
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
          ]}
        >
          <Row align="middle">
            <Col span={15}>
              <Input
                value={registerInfo.captcha} onChange={(e) => updateInfo(registerInfo, setRegisterInfo, 'captcha', e.target.value)}
              />
            </Col>
            <Col span={6}>
              <div dangerouslySetInnerHTML={{ __html:captcha}} className='captcha' onClick={getCaptcha}></div>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 20,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
  return (
    <div className="login-form">
      <Modal title="" open={props.openLoginForm} onOk={handleOk} onCancel={props.closeLoginForm}>
        <Radio.Group
          onChange={handleRadioChange}
          value={radioValue}
          optionType="button"
          buttonStyle="solid"
          className='login-radio-group'
        >
          <Radio.Button value={1} className='login-radio-btn'>登录</Radio.Button>
          <Radio.Button value={2} className='login-radio-btn'>注册</Radio.Button>
        </Radio.Group>
        {form}
      </Modal>
    </div>
  )
}

export default Index