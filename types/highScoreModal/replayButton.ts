import { DifficultyFirstStates } from '../type'

export type ReplayButtonProps = {
  consts: {
    difficulty: string
    isLastPlay: boolean
  }
  funs: {
    refreshStateWithDifficulty: (values: DifficultyFirstStates) => void
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  }
}
