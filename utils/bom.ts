import type { Pos } from '../types/type'

export const createBom = (bomNum: number, sizeX: number, sizeY: number): Pos[] => {
  const res: Pos[] = []
  while (res.length < bomNum) {
    const pos = { x: getRandomInt(0, sizeX), y: getRandomInt(0, sizeY) }
    !res.some((p) => p.x === pos.x && p.y === pos.y) && res.push(pos)
  }
  return res
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
