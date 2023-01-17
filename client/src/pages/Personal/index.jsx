import { useState, useEffect } from 'react'
import { Button, Upload, Form, Input, message, Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import './index.scss'
import { parseTime } from '../../utils'
import { updateUserInfoAsync } from '../../redux/userSlice'
import { checkPasswordApi } from '../../api/user'
import { clearUserInfo, updateLoginStatus } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom'

function Personal() {
  const [isEdit, setIsEdit] = useState(false)
  const [imageUrl, setImageUrl] = useState();
  const { userInfo } = useSelector(state => state.user)
  const [newUserInfo, setNewUserInfo] = useState({})
  const [form] = Form.useForm()
  const [changePasswordForm] = Form.useForm()
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: '',
    newPassword: '',
    checkPassword: ''
  })
  const [oldUserInfo, setOldUserInfo] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    form.setFieldsValue(userInfo)
  }, [userInfo])
  const updateUserInfo = (value, key) => {
    const newInfo = { ...newUserInfo }
    newInfo[key] = value
    setNewUserInfo(newInfo)
  }
  const handleChangeAvatar = (file, fileList, event) => {
    console.log(file)
  }
  const handleSubmit = () => {
    dispatch(updateUserInfoAsync({ userId: userInfo._id, newUserInfo })).then(() => {
      message.success('修改成功')
      setIsEdit(false)
    })
  }
  const updatePasswordInfo = (value, key) => {
    const newPasswordInfo = { ...passwordInfo }
    newPasswordInfo[key] = value
    setPasswordInfo(newPasswordInfo)
  }
  const checkOldPassword = async () => {
    if (!passwordInfo.oldPassword) return
    const params = {
      userId: userInfo._id,
      loginPwd: passwordInfo.oldPassword
    }
    const data = await window.httpApi(checkPasswordApi(params))
    if (!data) {
      return Promise.reject('密码不正确')
    }
  }
  const checkPassword = () => {
    if (!passwordInfo.checkPassword) return Promise.resolve()
    if (passwordInfo.newPassword !== passwordInfo.checkPassword) {
      return Promise.reject('两次密码不一致')
    } else {
      return Promise.resolve()
    }
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
    changePasswordForm.resetFields()
  }
  const handleChangePassword = () => {
    const params = {
      userId: userInfo._id,
      newUserInfo: { loginPwd: passwordInfo.checkPassword }
    }
    dispatch(updateUserInfoAsync(params)).then(() => {
      message.success('修改密码成功,请重新登录')
      changePasswordForm.resetFields()
      setIsModalOpen(false)
      dispatch(clearUserInfo())
      dispatch(updateLoginStatus(false))
      localStorage.removeItem('coderstation-user-token')
      navigate('/personal')
    })
  }
  const handleChange = () => {
    setIsEdit(true)
    setOldUserInfo(newUserInfo)
  }
  const handleCancel = () => {
    setNewUserInfo(oldUserInfo)
    setIsEdit(false)
  }
  // let changePasswordBtn = null
  // let nicknameFormItem = null
  // let footerBtn = null
  // if (isEdit) {
  //   changePasswordBtn = (<Button type="link" onClick={() => setIsModalOpen(true)}>修改</Button>)
  //   nicknameFormItem =
  //     <Form.Item
  //       label="昵称"
  //       name="nickname"
  //       rules={[
  //         {
  //           required: true,
  //           message: '请输入昵称',
  //         },
  //       ]}
  //     >
  //       <Input value={newUserInfo.nickname} onChange={(e) => updateUserInfo(e.target.value, 'nickname')} />
  //     </Form.Item>
  //   footerBtn =
  //     <>
  //       <Button type="primary" htmlType='submit' style={{ marginRight: 10 }}>保存</Button>
  //       <Button type="primary" onClick={handleCancel}>取消</Button>
  //     </>
  // } else {
  //   nicknameFormItem =
  //     <Form.Item
  //       label="昵称"
  //     >
  //       {userInfo.nickname}
  //     </Form.Item>
  //   footerBtn = <Button type="primary" onClick={handleChange}>修改</Button>
  // }
  const personal = (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 8,
        }}
        onFinish={handleSubmit}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="账号"
        >
          {userInfo.loginId}
        </Form.Item>
        <Form.Item
          label="密码"
        >
          ******
          <Button type="link" onClick={() => setIsModalOpen(true)}>修改</Button>
          {/* {changePasswordBtn} */}
        </Form.Item>

        <Form.Item
          label="昵称"
          name="nickname"
          rules={[
            {
              required: true,
              message: '请输入昵称',
            },
          ]}
        >
          <Input value={newUserInfo.nickname} onChange={(e) => updateUserInfo(e.target.value, 'nickname')} />
        </Form.Item>
        {/* {nicknameFormItem} */}

        <Form.Item
          label="头像"
        >
          {/* <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            action="http://localhost:3000/api/upload"
            onChange={handleChangeAvatar}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%',
                }}
              />
            ) : (
              'uploadButton'
            )}
          </Upload> */}
          <img src={userInfo.avatar} alt="" />
        </Form.Item>

        <Form.Item
          label="上一次登录时间"
        >
          {parseTime(userInfo.lastLoginDate)}
        </Form.Item>

        <Form.Item
          label="注册时间"
        >
          {parseTime(userInfo.registerDate)}
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 3,
          }}
        >
          <Button type="primary" htmlType='submit' style={{ marginRight: 10 }}>保存</Button>
        </Form.Item>
      </Form>
      <Modal title="修改密码" open={isModalOpen} onCancel={handleCloseModal} footer={false}>
        <Form
          name="changePasswordForm"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          onFinish={handleChangePassword}
          autoComplete="off"
          form={changePasswordForm}
        >
          <Form.Item
            label="旧密码"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: '请输入旧密码',
              },
              {
                validator: checkOldPassword
              }
            ]}
            validateTrigger='onBlur'
          >
            <Input.Password value={passwordInfo.nickname} onChange={(e) => updatePasswordInfo(e.target.value, 'oldPassword')} />
          </Form.Item>

          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[
              {
                required: true,
                message: '请输入新密码',
              }
            ]}
          >
            <Input.Password value={passwordInfo.nickname} onChange={(e) => updatePasswordInfo(e.target.value, 'newPassword')} />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="checkPassword"
            rules={[
              {
                required: true,
                message: '请输入确认密码',
              },
              {
                validator: checkPassword
              }
            ]}
            validateTrigger='onBlur'
          >
            <Input.Password value={passwordInfo.nickname} onChange={(e) => updatePasswordInfo(e.target.value, 'checkPassword')} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 5,
            }}
          >
            <Button type="primary" htmlType="submit">
              修改密码
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
  return (
    <div className='personal bc-white mt-20 p-30'>
      {personal}
    </div>
  )
}

export default Personal