import './index.scss'

function Empty(props) {
  return (
    <div className='empty flex align-item-center justify-content-center'>
      {props.children}
    </div>
  )
}

export default Empty