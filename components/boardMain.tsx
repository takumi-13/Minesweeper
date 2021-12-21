import React from 'react'
import type { Pos } from '../types/type'
import { BomBlock, FlagBlock, HatenaBlock, PushedBlock, UnPushedBlock } from './board'
import { Board } from './boardStyle'

type MyStates = {
  gameState: number
  board: number[][]
  flgPosition: Pos[]
  count: number
}

type MainVars = {
  x: number
  y: number
  boms: Pos[]
  num: number
}

type ContentVars = {
  boms: Pos[]
}

type ClickAction = (a: number, b: number) => void
type MyFuns = {
  onClick: ClickAction
  onContextMenu: ClickAction
}

type BoardContentProps = {
  states: MyStates
  vars: ContentVars
  funs: MyFuns
}

type BoardMainProps = {
  states: MyStates
  vars: MainVars
  funs: MyFuns
}

export const BoardContent: React.FC<BoardContentProps> = ({ states, vars, funs }) => {
  return (
    <Board>
      {states.board.map((row, y) =>
        row.map((num, x) => (
          <BoardMain
            states={states}
            vars={{ x, y, boms: vars.boms, num }}
            funs={funs}
            key={`${x}-${y}`}
          />
        ))
      )}
    </Board>
  )
}

const BoardMain: React.FC<BoardMainProps> = ({ states, vars, funs }) => {
  const gameState = states.gameState
  const flgPosition = states.flgPosition

  const [boms, num, x, y] = [vars.boms, vars.num, vars.x, vars.y]
  const [onClick, onContextMenu] = [funs.onClick, funs.onContextMenu]

  const canPlayGame = [0, -1].includes(gameState)
  const PushedBlocks = () => {
    return num === -1 ? (
      <BomBlock number={0} />
    ) : num === 99 ? (
      <FlagBlock onContextMenu={() => canPlayGame && onContextMenu(x, y)} number={0} />
    ) : num === 100 ? (
      <HatenaBlock
        onContextMenu={() => canPlayGame && flgPosition.length < boms.length && onContextMenu(x, y)}
        number={0}
      />
    ) : (
      <PushedBlock number={num} />
    )
  }
  return vars.num === 9 ? (
    <UnPushedBlock
      onClick={() => canPlayGame && onClick(x, y)}
      onContextMenu={() => canPlayGame && flgPosition.length < boms.length && onContextMenu(x, y)}
      number={0}
    />
  ) : (
    <PushedBlocks />
  )
}
