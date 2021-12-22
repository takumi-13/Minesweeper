import type { Pos, Values } from '../types/type'
import { calBom } from './bom'
import { posEquall } from './position'

let newMadePositions: Values[] = []
export const updatePosition = (
  pushedBlockNum: number,
  board: number[][],
  boms: Pos[],
  newNum: number,
  posX: number,
  posY: number
): Values[] => {
  newMadePositions = []
  return makeNewBoard(newNum, posX, posY, board, boms)
}

const checkReached = (vs: Values, reachedPositions: Pos[]): boolean => {
  let res = false
  for (const item of reachedPositions) {
    posEquall(item, vs) && (res = true)
  }
  !res && reachedPositions.push({ x: vs.x, y: vs.y })
  return res
}

const updateNewPosition = (
  vs: Values,
  newboard: number[][],
  boms: Pos[],
  reachedPositions: Pos[]
) => {
  //訪れたことのないブロックの場合再帰処理
  const isNotZero = checkZero(vs)

  const doPush = checkDoPush(vs, newboard, reachedPositions)

  const isNotRecursive = checkNotRecursive(isNotZero, doPush)

  if (doPush) {
    newMadePositions.push(vs)
  }
  if (isNotRecursive) {
    return
  }

  updateNewPosition(
    { x: vs.x, y: vs.y + 1, value: calBom(vs.x, vs.y + 1, boms) },
    newboard,
    boms,
    reachedPositions
  )
  updateNewPosition(
    { x: vs.x, y: vs.y - 1, value: calBom(vs.x, vs.y - 1, boms) },
    newboard,
    boms,
    reachedPositions
  )
  updateNewPosition(
    { x: vs.x + 1, y: vs.y, value: calBom(vs.x + 1, vs.y, boms) },
    newboard,
    boms,
    reachedPositions
  )
  updateNewPosition(
    { x: vs.x - 1, y: vs.y, value: calBom(vs.x - 1, vs.y, boms) },
    newboard,
    boms,
    reachedPositions
  )
  updateNewPosition(
    { x: vs.x + 1, y: vs.y + 1, value: calBom(vs.x + 1, vs.y + 1, boms) },
    newboard,
    boms,
    reachedPositions
  )
  updateNewPosition(
    { x: vs.x - 1, y: vs.y + 1, value: calBom(vs.x - 1, vs.y + 1, boms) },
    newboard,
    boms,
    reachedPositions
  )
  updateNewPosition(
    { x: vs.x + 1, y: vs.y - 1, value: calBom(vs.x + 1, vs.y - 1, boms) },
    newboard,
    boms,
    reachedPositions
  )
  updateNewPosition(
    { x: vs.x - 1, y: vs.y - 1, value: calBom(vs.x - 1, vs.y - 1, boms) },
    newboard,
    boms,
    reachedPositions
  )
}

const makeNewBoard = (
  newNum: number,
  posX: number,
  posY: number,
  board: number[][],
  boms: Pos[]
): Values[] => {
  if (0 < newNum && newNum < 9) {
    const newPositions = [{ x: posX, y: posY, value: newNum }]
    return newPositions
  } else {
    updateNewPosition({ x: posX, y: posY, value: newNum }, board, boms, [])
    return newMadePositions
  }
}

const checkDoPush = (vs: Values, newboard: number[][], reachedPositions: Pos[]): boolean => {
  const canPush = checkCanPush(vs, newboard)
  const isReached = checkReached(vs, reachedPositions)
  return canPush && !isReached
}
const checkInBoard = (vs: Values): boolean => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8].includes(vs.x) && [0, 1, 2, 3, 4, 5, 6, 7, 8].includes(vs.y)
}

const checkCanPush = (vs: Values, newboard: number[][]): boolean => {
  const isInboard = checkInBoard(vs)
  let isUnPushed = true
  if (isInboard) {
    isUnPushed = newboard[vs.y][vs.x] === 9
  }
  return isInboard && isUnPushed
}

const checkZero = (vs: Values): boolean => {
  return vs.value !== 0
}

const checkNotRecursive = (isNotZero: boolean, doPush: boolean): boolean => {
  return !doPush || isNotZero
}
