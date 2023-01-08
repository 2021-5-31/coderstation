import { useParams } from 'react-router-dom'
import { getIssueDetailApi } from '@/api/issue'
import { getUserInfoApi } from '@/api/user'
import './index.scss'
import { useEffect, useState } from 'react'
import RecommendCard from '../../components/RecommendCard'
import RankCard from '../../components/RankCard'
import PageHeader from '../../components/PageHeader'
import { Avatar } from 'antd'
import { parseTime } from '@/utils'
import Comment from '../../components/Comment'

function IssueDetail() {
  const { id } = useParams()
  const [detail, setDetail] = useState({})
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    window.httpApi(getIssueDetailApi(id)).then(data => {
      setDetail(data)
      window.httpApi(getUserInfoApi(data.userId)).then(userInfo => {
        setUserInfo(userInfo)
      })
    })
  }, [])
  return (
    <div className='issue-detail'>
      <PageHeader title='问答详情' />
      <div className="detail-main flex mt-10">
        <div className="left-side mr-10">
          <div className='bc-white mb-20 p-30'>
            <h3 className="issue-detail-title">{detail.issueTitle}</h3>
            <div className="user-info flex align-item-center">
              <span><Avatar src={userInfo.avatar} /></span>
              <span className="username">{userInfo.nickname}</span>
              <span>发布于</span>
              <span className="publish-date">{parseTime(detail.issueDate)} </span>
            </div>
            <div className="issue-content" dangerouslySetInnerHTML={{ __html: detail.issueContent }}></div>
          </div>
          <div className="comment bc-white p-30">
            <Comment
              detailId={id}
              typeId={detail.typeId}
              commentNumber={detail.commentNumber}
              commentType={1} // 1：问答评论，2：书籍评论
            />
          </div>
        </div>
        <div className="right-side">
          <RecommendCard />
          <RankCard />
        </div>
      </div>
    </div>
  )
}

export default IssueDetail