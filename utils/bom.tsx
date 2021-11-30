import type { Pos } from '../types/type'
import { isPosInclude } from './position'

export const createBom = (bomNum: number): Pos[] => {
  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }
  const res: Pos[] = []
  for (let i = 0; i < bomNum; i++) {
    let pos: Pos = { x: getRandomInt(0, 8), y: getRandomInt(0, 8) }
    let isIncludePos = isPosInclude(pos, res)
    while (isIncludePos) {
      if (isIncludePos) {
        console.log(i, pos)
        pos = { x: getRandomInt(0, 8), y: getRandomInt(0, 8) }
      }
      isIncludePos = isPosInclude(pos, res)
    }
    res.push(pos)
  }
  console.log(res)
  return res
}
