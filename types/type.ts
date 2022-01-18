export type Pos = { x: number; y: number }
export type Values = { x: number; y: number; value: number }
export type PositionProps = { number: number }
export type BoardProps = { blockNumX: number; blockNumY: number }
export type IconProps = {
  number: number
  boardSize: BoardSize
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
