import './index.scss'
import { Button, Avatar, Pagination, message } from 'antd'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UserOutlined } from '@ant-design/icons'
import CommentListItem from '../CommentListItem'
import { getIssueCommentApi, addCommentApi } from '../../api/comment'
import Empty from '../Empty'
import { updateIssueApi } from '../../api/issue'
import { updateUserInfoAsync } from '../../redux/userSlice'

function Comment(props) {
  const editorRef = useRef()
  const { isLogin, userInfo } = useSelector(state => state.user)
  const [commentData, setCommentData] = useState([])
  const [page, setPage] = useState({
    current: 1,
    pageSize: 10
  })
  const [total, setTotal] = useState(0)
  const [refreshComment, setRefreshComment] = useState(false)
  const dispatch = useDispatch()
  const changePage = (current, pageSize) => {
    setPage({ current, pageSize })
  }
  const getIssueComment = () => {
    window.httpApi(getIssueCommentApi(props.detailId, page)).then(data => {
      setCommentData(data.data)
      setTotal(data.count)
    })
  }
  const handleSubmit = () => {
    const commentContent = editorRef.current.getInstance().getHTML()
    if (commentContent === '<p><br></p>') {
      message.warning('请输入评论')
      return
    }
    const params = {
      userId: userInfo._id,
      typeId: props.typeId,
      commentContent,
      commentType: props.commentType,
      bookId: props.commentType === 2 ? props.detailId : null,
      issueId: props.commentType === 1 ? props.detailId : null
    }
    window.httpApi(addCommentApi(params)).then(() => {
      message.success('评论成功，积分+4')
      editorRef.current.getInstance().setHTML('')
      setRefreshComment(!refreshComment)
      updateIssueApi(props.detailId, { commentNumber: props.commentNumber + 1 })
      dispatch(updateUserInfoAsync(
        {
          userId: userInfo._id,
          newUserInfo: { points: userInfo.points + 4 }
        })
      )
    })
  }
  useEffect(() => {
    // 1：问答评论，2：书籍评论
    if (props.commentType === 1) {
      getIssueComment()
    } else if (props.commentType === 2) {
    }
  }, [page.current, page.pageSize, refreshComment])

  const commentList = commentData.map((item) => {
    return <CommentListItem key={item._id} commentInfo={item} />
  })
  return (
    <>
      <div className="comment-edit">
        <div className='flex'>
          <span className="avatar mr-10">
            {isLogin ? <Avatar src={userInfo.avatar} /> : <Avatar icon={<UserOutlined />} />}
          </span>
          <div className="editor">
            <Editor
              previewStyle="vertical"
              height="300px"
              initialEditType="wysiwyg"
              language='zh-CN'
              ref={editorRef}
            />
          </div>
        </div>
        <div className="comment-btn">
          <Button type="primary" disabled={!isLogin} onClick={handleSubmit}>发表评论</Button>
        </div>
      </div>
      <div className="comment-list mt-20">
        <div className="mb-20">当前评论</div>
        {commentList?.length ? commentList : <Empty><span className='comment-empty'>暂无评论</span></Empty>}
      </div>
      <div className="comment-pagination mt-20 flex justify-content-center">
        {commentList?.length ?
          <Pagination
            current={page.current}
            total={total}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `总共 ${total} 条`}
            onChange={changePage}
          />
          :
          null
        }
      </div>
    </>
  )
}

export default Comment