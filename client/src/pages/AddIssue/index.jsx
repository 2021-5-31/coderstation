
import './index.scss'
import { Button, Form, Input, Select, message } from 'antd'
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTypeList } from '@/redux/typeSlice'
import { addIssueApi } from '@/api/issue'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { useNavigate } from 'react-router-dom'


function AddIssue() {
  const typeList = useSelector(state => state.type.typeList)
  const userInfo = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  const editorRef = useRef()
  const navigate = useNavigate()
  let issueInfo = {
    issueTitle: '',
    typeId: '',
    issueContent: ''
  }
  const typeOptions = typeList.map(item => {
    return {
      label: item.typeName,
      value: item._id
    }
  })
  useEffect(() => {
    if (!typeList.length) {
      dispatch(getTypeList())
    }
  })
  const handleSubmit = () => {
    const issueContent = editorRef.current.getInstance().getHTML()
    const params = {
      ...issueInfo,
      issueContent,
      userId: userInfo._id
    }
    window.httpApi(addIssueApi(params)).then(() => {
      message.success("你的问题已经提交，审核通过后将会进行展示")
      navigate("/")
    })
  }
  const handleValuesChange = (changedValues) => {
    issueInfo = { ...issueInfo, ...changedValues }
  }
  return (
    <div className="add-issue-container bc-white mt-20 p-30">
      <Form
        name="basic"
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={handleSubmit}
        autoComplete="off"
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          label="标题"
          name="issueTitle"
          rules={[
            {
              required: true,
              message: '请输入标题'
            }
          ]}
        >
          <Input style={{ width: 300 }} />
        </Form.Item>

        <Form.Item
          label="问题分类"
          name="typeId"
          rules={[
            {
              required: true,
              message: '请选择问题分类'
            }
          ]}
        >
          <Select
            style={{
              width: 300,
            }}
            options={typeOptions}
          />
        </Form.Item>

        <Form.Item
          label="问题描述"
          name="issueContent"
          rules={[
            {
              required: true,
              message: '请输入问题描述'
            }
          ]}
        >
          <Editor
            previewStyle="vertical"
            height="400px"
            initialEditType="wysiwyg"
            language='zh-CN'
            ref={editorRef}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 2,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddIssue