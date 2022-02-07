import React from 'react'
import { BoardOriginProps } from '../types/board/origin'
import type { ClickBlockAction } from '../types/board/util'
import type { Pos, Values } from '../types/type'
import { calBom, resetBoms } from '../utils/bom'
import { posArrayEquall, posEquall } from '../utils/position'
import { updatePosition } from '../utils/updatePosition'
import { BoardHead } from './boardHead'
import { BoardContent } from './boardMain'
import { BoardFrame } from './boardStyle'

export const BoardOrigin: React.FC<BoardOriginProps> = ({ parentStates, funs }) => {
  const {
    setGameState,
    setPushedBlockNum,
    setFlgPosition,
    setBoard,
    refreshState,
    checkGameStart,
    setGameover,
    setGameClear,
    setBoms,
  } = { ...funs }
  const { board, flgPosition, boms, pushedBlockNum, boardSize } = {
    ...parentStates,
  }
  const onContextMenu: ClickBlockAction = (posX: number, posY: number) => {
    checkGameStart()
    const removeFlgPosition = (flg: Pos) => [...flgPosition].filter((el) => !posEquall(el, flg))
    const newBoard: typeof board = JSON.parse(JSON.stringify(board))
    const newFlgPosition: Pos = { x: posX, y: posY }
    const isFlg = board[posY][posX] === 99
    const isHatena = board[posY][posX] === 100

    let newFlgPositions: Pos[] = []
    if (isFlg) {
      newBoard[posY][posX] = 9
      newFlgPositions = removeFlgPosition(newFlgPosition)
    } else if (isHatena) {
      newBoard[posY][posX] = 99
      newFlgPositions = [...flgPosition, newFlgPosition]
    } else {
      newBoard[posY][posX] = 100
      newFlgPositions = removeFlgPosition(newFlgPosition)
    }
    posArrayEquall(newFlgPositions, boms) ? setGameClear() : setGameState(0)
    setFlgPosition(newFlgPositions)
    setBoard(newBoard)
  }
  const judgePushAllBlocks = (newPositions: Values[], nowPushedBlockNum: number) => {
    if (nowPushedBlockNum !== boardSize.sizeX * boardSize.sizeY - boms.length) {
      return newPositions
    }
    setGameClear()
    const newPosition: Values[] = boms.map((el) => ({ x: el.x, y: el.y, value: 99 }))
    const newFlgPosition: Pos[] = boms.map((el) => ({ x: el.x, y: el.y }))
    setFlgPosition(newFlgPosition)
    const res: Values[] = [...newPosition, ...newPositions]
    return res
  }

  const applyBoard = (newBoard: number[][], res: Values[]) => {
    res.forEach((element) => {
      newBoard[element.y][element.x] = element.value
    })
    setBoard(newBoard)
  }

  const onClick = (posX: number, posY: number) => {
    const isBom = boms.some((el) => posEquall({ x: posX, y: posY }, el))
    const isFirstMove = checkGameStart()

    const newBoard: typeof board = JSON.parse(JSON.stringify(board))
    const newPositions = isBom
      ? isFirstMove
        ? getNewPositionsInFirstMove(posX, posY)
        : getNewPositionsInEndGame()
      : getNewPosition(posX, posY)
    applyBoard(newBoard, newPositions)
  }

  const getNewPositionsInEndGame = () => {
    const newPositions: Values[] = boms.map((el) => ({ x: el.x, y: el.y, value: -1 }))
    setGameover()
    return newPositions
  }

  const getNewPosition = (posX: number, posY: number) => {
    const newNum: number = calBom(posX, posY, boms)
    const newPositions = updatePosition(pushedBlockNum, board, boms, newNum, posX, posY, boardSize)

    const nowPushedBlockNum = pushedBlockNum + newPositions.length
    setPushedBlockNum(nowPushedBlockNum)
    return judgePushAllBlocks(newPositions, nowPushedBlockNum)
  }

  const getNewPositionsInFirstMove = (posX: number, posY: number) => {
    const bomNum: number = boms.length
    setBoms(resetBoms(posX, posY, bomNum, boardSize))
    return getNewPosition(posX, posY)
  }

  const tmpBoardSize = {
    sizex: boardSize.sizeX,
    sizey: boardSize.sizeY,
  }

  return (
    <BoardFrame boardsize={tmpBoardSize}>
      <BoardHead states={parentStates} funs={{ refreshState }} />
      <BoardContent states={parentStates} funs={{ onClick, onContextMenu }} />
    </BoardFrame>
  )
}
