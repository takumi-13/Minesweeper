import React, { useState } from 'react'
import styled from 'styled-components'
import { DifficultySelectorProps } from '../types/difficultySelector/difficultySelector'
import { DifficultyFirstStates } from '../types/type'
import {
  FIRST_STATE_DIFFICULT,
  FIRST_STATE_EASY,
  FIRST_STATE_MIDDLE,
  FIRST_STATE_SPECIAL,
} from '../utils/firstState'
import { DifficultyButton } from './difficultyButton'
import { SpecialForm } from './specialForm'

const DifficultySelectorDiv = styled.div`
  margin-left: 0.5em;
`

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ states, funs }) => {
  const [specialFirstState, setSpecialFirstState] =
    useState<DifficultyFirstStates>(FIRST_STATE_SPECIAL)
  const refreshStateWithDifficulty = funs.refreshStateWithDifficulty
  const isActive = {
    easy: states.nowFirstState.difficulty === 'easy',
    middle: states.nowFirstState.difficulty === 'middle',
    difficult: states.nowFirstState.difficulty === 'difficult',
    special: states.nowFirstState.difficulty === 'special',
  }
  const consts = {
    easy: { displayName: '初級', firstState: FIRST_STATE_EASY, isActive: isActive.easy },
    middle: { displayName: '中級', firstState: FIRST_STATE_MIDDLE, isActive: isActive.middle },
    difficult: {
      displayName: '上級',
      firstState: FIRST_STATE_DIFFICULT,
      isActive: isActive.difficult,
    },
    special: {
      displayName: 'スペシャル',
      firstState: specialFirstState,
      isActive: isActive.special,
    },
  }

  return isActive.special ? (
    <DifficultySelectorDiv>
      <DifficultyButton funs={{ refreshStateWithDifficulty }} consts={consts.easy} />
      <DifficultyButton funs={{ refreshStateWithDifficulty }} consts={consts.middle} />
      <DifficultyButton funs={{ refreshStateWithDifficulty }} consts={consts.difficult} />
      <DifficultyButton funs={{ refreshStateWithDifficulty }} consts={consts.special} />
      <SpecialForm funs={{ refreshStateWithDifficulty, setSpecialFirstState }} />
    </DifficultySelectorDiv>
  ) : (
    <DifficultySelectorDiv>
      <DifficultyButton funs={{ refreshStateWithDifficulty }} consts={consts.easy} />
      <DifficultyButton funs={{ refreshStateWithDifficulty }} consts={consts.middle} />
      <DifficultyButton funs={{ refreshStateWithDifficulty }} consts={consts.difficult} />
      <DifficultyButton funs={{ refreshStateWithDifficulty }} consts={consts.special} />
    </DifficultySelectorDiv>
  )
}
