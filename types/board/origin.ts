import { Pos } from '../type'
import { ClickAction } from './util'

export type BoardOriginProps = {
  parentStates: {
    gameState: number
    boms: Pos[]
    count: number
    flgPosition: Pos[]
    board: number[][]
    pushedBlockNum: number
    boardSize: {
      sizeX: number
      sizeY: number
    }
  }
  funs: {
    refreshState: ClickAction
    checkGameStart: ClickAction
    setGameover: ClickAction
    setGameClear: ClickAction
    setGameState: React.Dispatch<React.SetStateAction<number>>
    setFlgPosition: React.Dispatch<React.SetStateAction<Pos[]>>
    setPushedBlockNum: React.Dispatch<React.SetStateAction<number>>
    setBoard: React.Dispatch<React.SetStateAction<number[][]>>
  }
}
