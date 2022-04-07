import { BoardSize, DifficultyFirstStates, Pos } from '../type'

export type DifficultySelectorProps = {
  states: DifficultySelectorStates
  funs: DifficultySelectorFuns
}

type DifficultySelectorStates = {
  boardSize: BoardSize
  boms: Pos[]
  currentFirstState: DifficultyFirstStates
}

type DifficultySelectorFuns = {
  refreshStateWithDifficulty: (values: DifficultyFirstStates) => void
}
