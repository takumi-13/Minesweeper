import type { Pos } from '../types/type'
export const posArrayEquall = (ps1: Pos[], ps2: Pos[]): boolean => {
  if (ps1.length !== ps2.length) return false
  const res = ps1.find((el1) => ps2.find((el2) => posEquall(el1, el2))) !== undefined
  return res
}

export const posEquall = (p1: Pos, p2: Pos): boolean => {
  return p1.x === p2.x && p1.y === p2.y
}

export const isPosInclude = (p1: Pos, ps: Pos[]): boolean =>
  ps.find((el) => posEquall(p1, el)) !== undefined
