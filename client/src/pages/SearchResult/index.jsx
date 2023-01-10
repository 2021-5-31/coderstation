import PageHeader from '../../components/PageHeader'
import { getIssueListApi } from '../../api/issue'
import { useState, useEffect } from 'react'
import IssueListItem from '../../components/IssueListItem'
import { useDispatch, useSelector } from 'react-redux'
import { getTypeList } from '../../redux/typeSlice'
import { Pagination, Button, message } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import './index.scss'
import RecommendCard from '../../components/RecommendCard'
import RankCard from '../../components/RankCard'
import Empty from '../../components/Empty'

function Issue() {
  const [issueList, setIssueList] = useState([])
  const [page, setPage] = useState({
    current: 1,
    pageSize: 10
  })
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { typeList } = useSelector(state => state.type)
  const isLogin = useSelector(state => state.user.isLogin)
  const location = useLocation()
  const { searchType, searchContent } = location.state
  useEffect(() => {
    if (!typeList.length) {
      dispatch(getTypeList())
    }
  }, [])
  useEffect(() => {
    const getList = async () => {
      const params = { ...page, issueStatus: true }
      if (searchType === 'issue') {
        params.issueTitle = searchContent
      } else if (searchType === 'book') {
        params.bookTitle = searchContent
      }
      const res = await getIssueListApi(params)
      if (res.code === 0) {
        setIssueList(res.data.data)
        setTotal(res.data.count)
      }
    }
    getList()
  }, [page.current, page.pageSize, location.state])
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
  return (
    <div className="issue-container">
      <PageHeader title='搜索结果'>
      </PageHeader>
      <div className="issue-main">
        <div className="left-side">
          {list.length ?
            list :
            (
              <div className="issue-list-empty">
                <Empty>没有搜索结果</Empty>
              </div>
            )
          }
          {list.length ?
            (
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
            )
            :
            null
          }
        </div>
        <div className="right-side">
          <div className="add-issue">
            <Button type='primary' className='add-issue-btn' size='large' onClick={handleAddIssue}>我要提问</Button>
          </div>
          <RecommendCard />
          <RankCard />
        </div>
      </div>
    </div>
  )
}

export default Issue