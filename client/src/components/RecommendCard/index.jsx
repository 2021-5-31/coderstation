import './index.scss'
import Card from '../Card'

function RecommendCard() {
  return (
    <div className="recommend-card mb-20">
      <Card title='推荐内容' extra={<a href='/' className='more'>更多 &gt;</a>}>
        <ul className='recommend-content-container flex flex-wrap justify-content-between'>
          <li className='recommend-item mb-20'>
            <a href="https://ke.segmentfault.com/course/1650000018852613" target='_blank' rel="noreferrer">
              <img src="https://live-static.segmentfault.com/174/360/1743604032-58bf8d0b3f86c_render" alt="" />
              <span className='text fsz-14'>前端程序员应该懂点 V8 知识</span>
            </a>
          </li>
          <li className='recommend-item mb-20'>
            <a href="https://ke.segmentfault.com/course/1650000018852761" target='_blank' rel="noreferrer">
              <img src="https://live-static.segmentfault.com/833/854/833854278-59b11ecf5f0a7_render" alt="" />
              <span className='text fsz-14'>前端面试攻略：面试题详解</span>
            </a>
          </li>
          <li className='recommend-item'>
            <a href="https://ke.segmentfault.com/course/1650000037651959" target='_blank' rel="noreferrer">
              <img src="https://live-static.segmentfault.com/152/907/1529077290-5fbb255758393_render" alt="" />
              <span className='text fsz-14'>前端性能优化设计12问</span>
            </a>
          </li>
          <li className='recommend-item'>
            <a href="/" target='_blank' rel="noreferrer">
              <img src="https://live-static.segmentfault.com/377/473/3774732708-59634e72835a8_render" alt="" />
              <span className='text fsz-14'>前端必备技能：CSS 预处理工具 Stylus 详解</span>
            </a>
          </li>
        </ul>
      </Card>
    </div>
  )
}

export default RecommendCard