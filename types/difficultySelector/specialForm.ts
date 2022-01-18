import { DifficultyFirstStates } from '../type'

export type SpecialFormProps = {
  funs: {
    refreshStateWithDifficulty: (values: DifficultyFirstStates) => void
    setSpecialFirstState: React.Dispatch<React.SetStateAction<DifficultyFirstStates>>
  }
}
