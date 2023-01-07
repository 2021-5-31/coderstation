import './index.scss'

function PageHeader(props) {
  return (
    <div className="page-header">
      <div className="page-header-title">{props.title}</div>
      <div className="page-header-content"></div>
    </div>
  )
}

export default PageHeader