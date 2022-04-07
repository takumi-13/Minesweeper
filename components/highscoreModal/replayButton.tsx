import { Button } from '@mui/material'
import React from 'react'
import { ReplayButtonProps } from '../../types/highScoreModal/replayButton'
import { DifficultyFirstStates } from '../../types/type'
import { FIRST_STATE_DIFFICULT, FIRST_STATE_EASY, FIRST_STATE_MIDDLE } from '../../utils/firstState'

const formatDifficultyName = (difficulty: string) => {
  return difficulty === 'easy' ? '初級' : difficulty === 'middle' ? '中級' : '上級'
}

const getDifficultyValues = (difficulty: string): DifficultyFirstStates => {
  return difficulty === 'easy'
    ? FIRST_STATE_EASY
    : difficulty === 'middle'
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
