import { Pos } from '../type'

export type BoardProps = {
  states: BoardStates
}

type BoardStates = {
  gameState: number
  board: number[][]
  flgPosition: Pos[]
  count: number
  boardSize: {
    sizeX: number
    sizeY: number
  }
  boms: Pos[]
}

export type ClickAction = () => void
export type ClickBlockAction = (a: number, b: number) => void
