import { DifficultyFirstStates, Pos } from '../type'

export type SpecialFormProps = {
  states: {
    boms: Pos[]
    boardSize: {
      sizeX: number
      sizeY: number
    }
  }
  funs: {
    refreshStateWithDifficulty: (values: DifficultyFirstStates) => void
    setSpecialFirstState: React.Dispatch<React.SetStateAction<DifficultyFirstStates>>
  }
}
