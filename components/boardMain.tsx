import React from 'react'
import type { Pos } from '../types/type'
import { BomBlock, FlagBlock, HatenaBlock, PushedBlock, UnPushedBlock } from './board'

type MyStates = {
  gameState: number
  board: number[][]
  flgPosition: Pos[]
  count: number
}

type MyVars = {
  x: number
  y: number
  boms: Pos[]
  num: number
}
type ClickAction = (a: number, b: number) => void
type MyFuns = {
  onClick: ClickAction
  onContextMenu: ClickAction
}

type Props = {
  states: MyStates
  vars: MyVars
  funs: MyFuns
}

export const BoardMain: React.FC<Props> = ({ states, vars, funs }) => {
  const gameState = states.gameState
  const flgPosition = states.flgPosition

  const [boms, num, x, y] = [vars.boms, vars.num, vars.x, vars.y]
  const [onClick,onContextMenu = [funs.onClick,funs.onContextMenu]

  const decidePushStyle = () => {
    return num === -1 ? (
      <BomBlock number={0} />
    ) : num === 99 ? (
      <FlagBlock onContextMenu={() => onContextMenu(x, y)} number={0} />
    ) : num === 100 ? (
      <HatenaBlock
        key={`${x}-${y}`}
        onContextMenu={() => flgPosition.length < boms.length && onContextMenu(x, y)}
        number={0}
      />
    ) : (
      <PushedBlock number={num} />
    )
  }
  return vars.num === 9 ? (
    <UnPushedBlock
      onClick={() => (gameState === 0 || gameState === -1) && onClick(x, y)}
      onContextMenu={() => flgPosition.length < boms.length && onContextMenu(x, y)}
      number={0}
    />
  ) : (
    decidePushStyle()
  )
}
