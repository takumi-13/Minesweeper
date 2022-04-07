import type { Pos } from '../types/type'
export const posArrayEqual = (ps1: Pos[], ps2: Pos[]): boolean => {
  if (ps1.length !== ps2.length) return false
  const res = ps1.some((el1) => ps2.some((el2) => posEqual(el1, el2)))
  return res
}

export const posEqual = (p1: Pos, p2: Pos): boolean => {
  return p1.x === p2.x && p1.y === p2.y
}

export const isPosInclude = (p1: Pos, ps: Pos[]): boolean => ps.some((el) => posEqual(p1, el))
