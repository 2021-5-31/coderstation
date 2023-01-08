import './index.scss'
import Card from '../Card'
import { useState, useEffect } from 'react'
import { getUserPointRankApi } from '@/api/user'
import RankListItem from '../RankListItem'

function RankCard() {
  const [rank, setRank] = useState([])
  useEffect(() => {
    window.httpApi(getUserPointRankApi()).then(data => {
      setRank(data)
    })
  }, [])
  const RankList = rank.map((item, index) => {
    return (<RankListItem key={item._id} userInfo={item} rankOrder={index + 1} />)
  })
  return (
    <div className="rank mb-20">
      <Card title='排行榜' extra={<a href='/' className='more'>更多 &gt;</a>}>
        <ul>
          {RankList}
        </ul>
      </Card>
    </div>
  )
}

export default RankCard