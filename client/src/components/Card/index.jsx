import './index.scss'
function Card(props) {
  return (
    <div className='card'>
      <div className="card-header flex justify-content-between ">
        <h6 className="title">{props.title}</h6>
        <div className="header-content">{props.extra}</div>
      </div>
      <div className="card-content">
        {props.children}
      </div>
    </div>
  )
}

export default Card