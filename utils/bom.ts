import type { Pos } from '../types/type'
import { isPosInclude } from './position'

export const createBom = (bomNum: number): Pos[] => {
  const res: Pos[] = []
  //const nums: number[] = [...Array(bomNum)].map((v, i) => i)
  for (let i = 0; i < bomNum; i++) {
    const pos = removeDuplicate(res)
    res.push(pos)
  }
  return res
}

const removeDuplicate = (res: Pos[]) => {
  let pos: Pos = { x: getRandomInt(0, 8), y: getRandomInt(0, 8) }
  let isIncludePos = isPosInclude(pos, res)
  while (isIncludePos) {
    pos = { x: getRandomInt(0, 8), y: getRandomInt(0, 8) }
    isIncludePos = isPosInclude(pos, res)
  }
  return pos
}

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

export const calBom = (x: number, y: number, boms: Pos[]) => {
  let calNum = 0
  boms.forEach(
    (elm) =>
      [0, 1].includes(Math.abs(elm.x - x)) && [0, 1].includes(Math.abs(y - elm.y)) && calNum++
  )
  return calNum
}
