export default function HoursList({hours}){
  return (
    <div className="hours">
      <ul>
        {hours.map(([d,t]) => (<li key={d}><span>{d}</span><span>{t}</span></li>))}
      </ul>
    </div>
  )
}
