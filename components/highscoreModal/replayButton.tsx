import { Button } from '@mui/material'
import React from 'react'
import { ReplayButtonProps } from '../../types/highScoreModal/replayButton'
import { Difficulty, DifficultyFirstStates } from '../../types/type'
import {
  DIFFICULTY_DIFFICULT,
  DIFFICULTY_EASY,
  DIFFICULTY_MIDDLE,
} from '../../utils/constants/difficulty'
import {
  FIRST_STATE_DIFFICULT,
  FIRST_STATE_EASY,
  FIRST_STATE_MIDDLE,
} from '../../utils/constants/firstState'

const formatDifficultyName = (difficulty: Difficulty) => {
  return difficulty === DIFFICULTY_EASY.difficulty
    ? DIFFICULTY_EASY.difficultyJP
    : difficulty === DIFFICULTY_MIDDLE.difficulty
    ? DIFFICULTY_MIDDLE.difficultyJP
    : DIFFICULTY_DIFFICULT.difficultyJP
}

const getDifficultyValues = (difficulty: Difficulty): DifficultyFirstStates => {
  return difficulty === DIFFICULTY_EASY.difficulty
    ? FIRST_STATE_EASY
    : difficulty === DIFFICULTY_MIDDLE.difficulty
    ? FIRST_STATE_MIDDLE
    : FIRST_STATE_DIFFICULT
}

export const ReplayButton: React.FC<ReplayButtonProps> = ({ consts, funs }) => {
  const buttonClickActions = () => {
    const difficultyValues: DifficultyFirstStates = getDifficultyValues(consts.difficulty)
    funs.refreshStateWithDifficulty(difficultyValues)
    funs.setShowModal(false)
  }
  const buttonContext = consts.isLastPlay
    ? '再プレイ'
    : `${formatDifficultyName(consts.difficulty)}をプレイ`

  return (
    <Button
      variant="contained"
      disableElevation
      onClick={() => buttonClickActions()}
      style={{ marginTop: 15 }}
    >
      {buttonContext}
    </Button>
  )
}
