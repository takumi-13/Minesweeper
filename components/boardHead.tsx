import React from 'react'
import type { Pos } from '../types/type'
import { BoardHeader, FaceIcon, FlagNum, TimerNum } from './board'
type MyStates = {
  gameState: number
  board: number[][]
  flgPosition: Pos[]
  count: number
}

type MyVars = {
  boms: Pos[]
}
type ClickAction = () => void
type MyFuns = {
  refreshState: ClickAction
}

type Props = {
  states: MyStates
  vars: MyVars
  funs: MyFuns
}

export const BoardHead: React.FC<Props> = ({ states, vars, funs }) => {
  return (
    <BoardHeader>
      <FlagNum>{`000${vars.boms.length - states.flgPosition.length}`.slice(-3)}</FlagNum>
      <FaceIcon number={decideNumber(states.gameState)} onClick={() => funs.refreshState()}>
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
