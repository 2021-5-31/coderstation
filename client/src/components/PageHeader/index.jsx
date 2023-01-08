import './index.scss'

function PageHeader(props) {
  return (
    <div className="page-header">
      <h2 className="page-header-title">{props.title}</h2>
      <div className="page-header-content">{props.children}</div>
    </div>
  )
}

export default PageHeader