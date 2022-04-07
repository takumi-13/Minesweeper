export type Pos = { x: number; y: number }
export type Values = { x: number; y: number; value: number }
export type PositionProps = { number: number }

export type BoardSizeProps = {
  boardsize: {
    sizex: number
    sizey: number
  }
}

export type DifficultyFirstStates = {
  difficulty: string
  bomNum: number
  sizeX: number
  sizeY: number
  board: number[][]
}
export type BoardSize = {
  sizeX: number
  sizeY: number
}

export type LocalStorageDataList = (number | null)[]
export type ManageLocalStorageData = {
  currentResult: number
  previousResult: LocalStorageDataList
}
