import type { Pos } from '../types/type'
export const posArrayEquall = (ps1: Pos[], ps2: Pos[]): boolean => {
  let res = true
  if (ps1.length !== ps2.length) return false
  ps1.forEach((p1) => {
    let b1 = false
    ps2.forEach((p2) => {
      b1 = b1 || posEquall(p1, p2)
    })
    res = b1 && res
  })
  return res
}

export const posEquall = (p1: Pos, p2: Pos): boolean => {
  return p1.x === p2.x && p1.y === p2.y
}

export const isPosInclude = (p1: Pos, ps: Pos[]): boolean => {
  let res = false
  ps.forEach((el) => {
    res = res || posEquall(el, p1)
  })
  return res
}
