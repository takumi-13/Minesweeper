import React from 'react'
import { BoardContentProps, BoardMainProps, PushedBlockProps } from '../../types/board/main'
import { Board, BomBlock, FlagBlock, HatenaBlock, PushedBlock, UnPushedBlock } from './boardStyle'

export const BoardContent: React.FC<BoardContentProps> = ({ states, funs }) => {
  const tmpBoardSize = {
    sizex: states.boardSize.sizeX,
    sizey: states.boardSize.sizeY,
  }
  return (
    <Board boardsize={tmpBoardSize}>
      {states.board.map((row, y) =>
        row.map((num, x) => (
          <BoardMain states={states} vars={{ x, y, num }} funs={funs} key={`${x}-${y}`} />
        ))
      )}
    </Board>
  )
}

const BoardMain: React.FC<BoardMainProps> = ({ states, vars, funs }) => {
  const gameState = states.gameState
  const flgPosition = states.flgPosition

  const [boms, num, x, y] = [states.boms, vars.num, vars.x, vars.y]

  const canPlayGame = [0, -1].includes(gameState)
  return vars.num === 9 ? (
    <UnPushedBlock
      onClick={() => canPlayGame && funs.onClick(x, y)}
      onContextMenu={() =>
        canPlayGame && flgPosition.length < boms.length && funs.onContextMenu(x, y)
      }
      number={0}
    />
  ) : (
    <PushedBlocks
      states={{ flgPosition, boms }}
      vars={{ canPlayGame, x, y, num }}
      funs={{ onContextMenu: funs.onContextMenu }}
    />
  )
}

const PushedBlocks: React.FC<PushedBlockProps> = ({ states, vars, funs }) => {
  return vars.num === -1 ? (
    <BomBlock number={0} />
  ) : vars.num === 99 ? (
    <FlagBlock
      onContextMenu={() => vars.canPlayGame && funs.onContextMenu(vars.x, vars.y)}
      number={0}
    />
  ) : vars.num === 100 ? (
    <HatenaBlock
      onContextMenu={() =>
        vars.canPlayGame &&
        states.flgPosition.length < states.boms.length &&
        funs.onContextMenu(vars.x, vars.y)
      }
      number={0}
    />
  ) : (
    <PushedBlock number={vars.num} />
  )
}
