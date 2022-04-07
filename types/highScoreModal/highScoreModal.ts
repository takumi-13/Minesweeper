import { Difficulty, DifficultyFirstStates } from '../type'

export type HighScoreModalProps = {
  states: {
    showModal: boolean
    activeTab: Difficulty
  }
  consts: {
    currentDifficulty: Difficulty
  }
  funs: {
    refreshStateWithDifficulty: (values: DifficultyFirstStates) => void
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    setActiveTab: React.Dispatch<React.SetStateAction<Difficulty>>
  }
}
