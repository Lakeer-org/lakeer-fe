const cx = 5
const cy = 5
const r = 5

const d = `
M ${cx} ${cy}
m -${r}, 0
a ${r},${r} 0 1,0 ${r * 2},0
a ${r},${r} 0 1,0 -${r * 2},0
`

export default { d }
