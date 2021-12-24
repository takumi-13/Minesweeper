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

  const dirTemp1 = [-1, 0, 1]
  const dirTemp2 = [-1, 0, 1]
  const directions = dirTemp1
    .map((el1) => dirTemp2.map((el2) => [el1, el2]))
    .reduce((newArr, elem) => {
      const res = elem.filter((item) => JSON.stringify(item) !== '[0,0]')
      return newArr.concat(res)
    }, [])

  for (const direction of directions) {
    const xValue = vs.x + direction[0]
    const yValue = vs.y + direction[1]
    updateNewPosition(
      { x: xValue, y: yValue, value: calBom(xValue, yValue, boms) },
      newboard,
      boms,
      reachedPositions
    )
  }
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
const checkInBoard = (vs: Values): boolean => [vs.x, vs.y].every((val) => 0 <= val && val <= 8)

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
