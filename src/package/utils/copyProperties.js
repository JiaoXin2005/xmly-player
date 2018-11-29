const copyProperties = (from, to) => {
  for (const key in from) {
    if (to[key]) {
      to[key] = from[key]
    }
  }
  return to
}

export default copyProperties