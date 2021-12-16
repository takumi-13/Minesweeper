import type { Pos, Values } from '../types/type'
import { calBom } from './bom'
import { posEquall } from './position'

export const UpdatePosition = class {
  reachedPositions: Pos[]
  newPositions: Values[]
  pushedBlockNum: number
  boms: Pos[]
  board: number[][]

  constructor(pushedBlockNum: number, board: number[][], boms: Pos[]) {
    this.reachedPositions = []
    this.newPositions = []
    this.pushedBlockNum = pushedBlockNum
    this.boms = boms
    this.board = board
  }
  get getNewPositions() {
    return this.newPositions
  }

  checkReached(vs: Values): boolean {
    let res = false
    for (const item of this.reachedPositions) {
      posEquall(item, vs) && (res = true)
    }
    !res && this.reachedPositions.push({ x: vs.x, y: vs.y })
    return res
  }

  updateNewPosition = (vs: Values, newboard: number[][]) => {
    //訪れたことのないブロックの場合再帰処理
    const isNotZero = checkZero(vs)

    const doPush = this.checkDoPush(vs, newboard)

    const isOneToEight = checkOneToEight(isNotZero, doPush)
    const isNotRecursive = checkNotRecursive(isNotZero, doPush)

    if (isOneToEight) {
      this.pushedBlockNum++
      this.newPositions.push(vs)
    }
    if (isNotRecursive) {
      return
    }

    this.newPositions.push(vs)

    this.updateNewPosition(
      { x: vs.x, y: vs.y + 1, value: calBom(vs.x, vs.y + 1, this.boms) },
      newboard
    )
    this.updateNewPosition(
      { x: vs.x, y: vs.y - 1, value: calBom(vs.x, vs.y - 1, this.boms) },
      newboard
    )
    this.updateNewPosition(
      { x: vs.x + 1, y: vs.y, value: calBom(vs.x + 1, vs.y, this.boms) },
      newboard
    )
    this.updateNewPosition(
      { x: vs.x - 1, y: vs.y, value: calBom(vs.x - 1, vs.y, this.boms) },
      newboard
    )
    this.updateNewPosition(
      { x: vs.x + 1, y: vs.y + 1, value: calBom(vs.x + 1, vs.y + 1, this.boms) },
      newboard
    )
    this.updateNewPosition(
      { x: vs.x - 1, y: vs.y + 1, value: calBom(vs.x - 1, vs.y + 1, this.boms) },
      newboard
    )
    this.updateNewPosition(
      { x: vs.x + 1, y: vs.y - 1, value: calBom(vs.x + 1, vs.y - 1, this.boms) },
      newboard
    )
    this.updateNewPosition(
      { x: vs.x - 1, y: vs.y - 1, value: calBom(vs.x - 1, vs.y - 1, this.boms) },
      newboard
    )
  }

  makeNewBoard = (newNum: number, posX: number, posY: number) => {
    if (0 < newNum && newNum < 9) {
      this.newPositions = [{ x: posX, y: posY, value: newNum }]
      this.pushedBlockNum++
    } else {
      this.newPositions = []
      this.reachedPositions = []
      this.updateNewPosition({ x: posX, y: posY, value: newNum }, this.board)
    }
  }

  checkDoPush = (vs: Values, newboard: number[][]): boolean => {
    const canPush = checkCanPush(vs, newboard)
    const isReached = this.checkReached(vs)
    return canPush && !isReached
  }
}

const checkInBoard = (vs: Values): boolean => {
  return vs.x in [0, 1, 2, 3, 4, 5, 6, 7, 8] && vs.y in [0, 1, 2, 3, 4, 5, 6, 7, 8]
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

const checkOneToEight = (isNotZero: boolean, doPush: boolean): boolean => {
  return isNotZero && doPush
}

const checkNotRecursive = (isNotZero: boolean, doPush: boolean): boolean => {
  return !doPush || isNotZero
}
