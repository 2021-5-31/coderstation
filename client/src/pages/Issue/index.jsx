import PageHeader from '../../components/PageHeader'
import { getIssueListApi } from '../../api/issue'
import { getUserPointRankApi } from '../../api/user'
import { useState, useEffect } from 'react'
import IssueListItem from '../../components/IssueListItem'
import { useDispatch, useSelector } from 'react-redux'
import { getTypeList } from '../../redux/typeSlice'
import { Pagination, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card'
import RecommendContent from './components/RecommendContent'
import RankListItem from './components/RankListItem'
import './index.scss'

function Issue() {
  const [issueList, setIssueList] = useState([])
  const [page, setPage] = useState({
    current: 1,
    pageSize: 10
  })
  const [total, setTotal] = useState(0)
  const [rank, setRank] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const typeList = useSelector(state => state.type.typeList)
  const isLogin = useSelector(state => state.user.isLogin)
  useEffect(() => {
    if (!typeList.length) {
      dispatch(getTypeList())
    }
    window.httpApi(getUserPointRankApi()).then(data => {
      setRank(data)
    })
  }, [])
  useEffect(() => {
    const getList = async () => {
      const params = { ...page, issueStatus: true }
      const res = await getIssueListApi(params)
      if (res.code === 0) {
        setIssueList(res.data.data)
        setTotal(res.data.count)
      }
    }
    getList()
  }, [page.current, page.pageSize])
  const changePage = (current, pageSize) => {
    setPage({ current, pageSize })
  }
  const handleAddIssue = () => {
    if (!isLogin) {
      message.warning('请先登录')
      return
    }
    navigate('add-issue')
  }
  const list = issueList.map(item => {
    return <IssueListItem key={item._id} issueInfo={item} />
  })
  const RankList = rank.map((item, index) => {
    return (<RankListItem key={item._id} userInfo={item} rankOrder={index + 1} />)
  })
  return (
    <div className="issue-container">
      <PageHeader title='问答列表' />
      <div className="issue-main">
        <div className="left-side">
          {list}
          <div className="pagination">
            <Pagination
              current={page.current}
              total={total}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `总共 ${total} 条`}
              onChange={changePage}
            />
          </div>
        </div>
        <div className="right-side">
          <div className="add-issue">
            <Button type='primary' className='add-issue-btn' size='large' onClick={handleAddIssue}>我要提问</Button>
          </div>
          <div className="recommend mb-20">
            <Card title='推荐内容' extra={<a href='/' className='more'>更多 &gt;</a>}>
              <RecommendContent />
            </Card>
          </div>
          <div className="rank mb-20">
            <Card title='排行榜' extra={<a href='/' className='more'>更多 &gt;</a>}>
              <ul>
                {RankList}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Issue