import React from 'react'
import { BoardHeadProps } from '../../types/board/header'
import { BoardHeader, FaceIcon, FlagNum, TimerNum } from './boardStyle'

export const BoardHead: React.FC<BoardHeadProps> = ({ states, funs }) => {
  const tmpBoardSize = {
    sizex: states.boardSize.sizeX,
    sizey: states.boardSize.sizeY,
  }
  return (
    <BoardHeader boardsize={tmpBoardSize}>
      <FlagNum>{`000${states.boms.length - states.flgPosition.length}`.slice(-3)}</FlagNum>
      <FaceIcon number={states.gameState} onClick={() => funs.refreshState()} />
      <TimerNum>{`000${states.count}`.slice(-3)}</TimerNum>
    </BoardHeader>
  )
}
