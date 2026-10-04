import { Link } from 'react-router-dom'

export default function Breadcrumb({ trail }){
  // trail: [{ label, to }] — last item has no `to` (current page)
  return (
    <div className="breadcrumb">
      {trail.map((item, i) => (
        <span key={i}>
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
          {i < trail.length - 1 && <span> / </span>}
        </span>
      ))}
    </div>
  )
}
