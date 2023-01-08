import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTypeList } from '@/redux/typeSlice'
import { Tag } from 'antd'
import { updateTypeId } from "../../redux/typeSlice"

function TypeList() {
  const typeList = useSelector(state => state.type.typeList)
  const colorList = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
  const dispatch = useDispatch()
  const handleClick = (id) => {
    dispatch(updateTypeId(id))
  }
  const list = typeList.map((item, index) => {
    return (
      <Tag
        key={item._id}
        color={colorList[index % colorList.length]}
        onClick={() => handleClick(item._id)}
        style={{ cursor: 'pointer' }}
      >
        {item.typeName}
      </Tag>
    )
  })
  list.unshift(
    (
      <Tag
        key='all'
        color='purple'
        onClick={() => handleClick('all')}
        style={{ cursor: 'pointer' }}
      >
        所有
      </Tag>
    )
  )
  useEffect(() => {
    if (!typeList.length) {
      dispatch(getTypeList())
    }
  }, [])
  return (
    <div className="type-list-container">
      {list}
    </div>
  )
}

export default TypeList