import React from 'react'
import { BoardHeadProps } from '../types/board/header'
import { BoardHeader, FaceIcon, FlagNum, TimerNum } from './boardStyle'

export const BoardHead: React.FC<BoardHeadProps> = ({ states, funs }) => {
  const sizeX = states.boardSize.sizeX
  const sizeY = states.boardSize.sizeY
  return (
    <BoardHeader blockNumX={sizeX} blockNumY={sizeY}>
      <FlagNum>{`000${states.boms.length - states.flgPosition.length}`.slice(-3)}</FlagNum>
      <FaceIcon
        number={decideNumber(states.gameState)}
        boardSize={states.boardSize}
        onClick={() => funs.refreshState()}
      >
        <a></a>
      </FaceIcon>
      <TimerNum>{`000${states.count}`.slice(-3)}</TimerNum>
    </BoardHeader>
  )
}

const decideNumber = (gameState: number): number => {
  if (gameState === 0 || gameState === -1) {
    return 11.6
  } else if (gameState === 1) {
    return 12.55
  } else {
    return 13.5
  }
}
