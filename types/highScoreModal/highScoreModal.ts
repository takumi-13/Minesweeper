import { DifficultyFirstStates } from '../type'

export type HighScoreModalProps = {
  states: {
    showModal: boolean
    activeTab: string
  }
  consts: {
    difficulty: string
  }
  funs: {
    refreshStateWithDifficulty: (values: DifficultyFirstStates) => void
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    setActiveTab: React.Dispatch<React.SetStateAction<string>>
  }
}
