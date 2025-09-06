
export function parseProperties(text){
  const out = {}
  const lines = text.replace(/\r\n?/g, '\n').split('\n')
  let pendingKey = null, pendingVal = ''

  const flush = () => {
    if (pendingKey !== null) {
      out[pendingKey.trim()] = pendingVal.trim()
      pendingKey = null
      pendingVal = ''
    }
  }

  for (let raw of lines){
    let line = raw.trim()
    if (!line || line.startsWith('#') || line.startsWith(';')) { continue }
    const cont = /\$/.test(line)
    if (pendingKey === null){
      const idxEq = line.indexOf('=')
      const idxCol = line.indexOf(':')
      let idx = -1
      if (idxEq >= 0 && idxCol >= 0) idx = Math.min(idxEq, idxCol)
      else idx = Math.max(idxEq, idxCol)
      if (idx === -1){
        pendingKey = line
        pendingVal = ''
      } else {
        pendingKey = line.slice(0, idx).trim()
        pendingVal = line.slice(idx+1)
      }
    } else {
      pendingVal += line
    }
    if (!cont){
      flush()
    } else {
      pendingVal = pendingVal.slice(0, -1) + '\n'
    }
  }
  flush()
  return out
}

export function interpolate(template, vars){
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_,k) => String(vars[k] ?? ''))
}
