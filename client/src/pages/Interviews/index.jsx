import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getInterviewTitleApi, getInterviewContentApi } from '../../api/interviews'
import './index.scss'
import { getTypeList } from '../../redux/typeSlice'
import { Tree } from 'antd'

function Interviews() {
  const [interviewsCatalogue, setInterviewsCatalogue] = useState([])
  const [interviewsContentData, setInterviewsContentData] = useState(null)
  const { typeList } = useSelector(state => state.type)
  const dispatch = useDispatch()
  const interviewsList = typeList.map(item => {
    return {
      title: <h4 className='catalogue-title'>{item.typeName}</h4>,
      key: item._id,
      children: []
    }
  })
  interviewsCatalogue.forEach((i, index) => {
    const children = i.map(j => {
      return {
        title: <span onClick={() => handleClick(j._id)}>{j.interviewTitle}</span>,
        key: j._id
      }
    })
    interviewsList[index].children = children
  })
  const handleClick = (interviewsId) => {
    window.httpApi(getInterviewContentApi(interviewsId)).then(data => {
      setInterviewsContentData(data.interviewContent)
    })
  }
  let interviewsContent = null
  if (interviewsContentData) {
    interviewsContent = <div dangerouslySetInnerHTML={{ __html: interviewsContentData }}></div>
  } else {
    interviewsContent = <div>请选择左侧目录</div>
  }
  useEffect(() => {
    if (!typeList.length) {
      dispatch(getTypeList())
    }
    window.httpApi(getInterviewTitleApi()).then(data => {
      setInterviewsCatalogue(data)
    })
  }, [])
  return (
    <div className='interviews flex mt-20 bc-white'>
      <div className="catalogue p-10">
        <Tree
          treeData={interviewsList}
        />
      </div>
      <div className="interviews-content flex align-item-center justify-content-center p-30">
        {interviewsContent}
      </div>
    </div>
  )
}

export default Interviews