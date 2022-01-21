import { DifficultyFirstStates } from '../type'

export type DifficultyButtonProps = {
  consts: DifficultyButtonConsts
  funs: DifficultyButtonFuns
}

type DifficultyButtonConsts = {
  displayName: string
  firstState: DifficultyFirstStates
  isActive: boolean
}

type DifficultyButtonFuns = {
  refreshStateWithDifficulty: (values: DifficultyFirstStates) => void
}
