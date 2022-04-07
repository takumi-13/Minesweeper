import { Difficulty, DifficultyFirstStates } from '../type'

export type ReplayButtonProps = {
  consts: {
    difficulty: Difficulty
    isLastPlay: boolean
  }
  funs: {
    refreshStateWithDifficulty: (values: DifficultyFirstStates) => void
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  }
}
