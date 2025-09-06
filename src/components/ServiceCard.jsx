export default function ServiceCard({img, title, blurb}){
  return (
    <article className="card">
      <div className="card-media"><img src={img} alt=""/></div>
      <div className="card-body">
        <div className="card-title">{title}</div>
        <div className="card-desc">{blurb}</div>
      </div>
    </article>
  )
}
