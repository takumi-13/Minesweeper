import React, { useState } from 'react'
import styled from 'styled-components'
import { DifficultySelectorProps } from '../../types/difficultySelector/difficultySelector'
import { DifficultyFirstStates } from '../../types/type'
import {
  DIFFICULTY_DIFFICULT,
  DIFFICULTY_EASY,
  DIFFICULTY_MIDDLE,
  DIFFICULTY_SPECIAL,
} from '../../utils/constants/difficulty'
import {
  FIRST_STATE_DIFFICULT,
  FIRST_STATE_EASY,
  FIRST_STATE_MIDDLE,
  FIRST_STATE_SPECIAL,
} from '../../utils/constants/firstState'
import { DifficultyButton } from './difficultyButton'
import { SpecialForm } from './specialForm'

const DifficultySelectorDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1em;
`
const DifficultyButtonDiv = styled.div`
  padding-bottom: 0.25em;
`

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ states, funs }) => {
  const [specialFirstState, setSpecialFirstState] =
    useState<DifficultyFirstStates>(FIRST_STATE_SPECIAL)
  const refreshStateWithDifficulty = funs.refreshStateWithDifficulty
  const isActive = {
    easy: states.currentFirstState.difficulty === DIFFICULTY_EASY.difficulty,
    middle: states.currentFirstState.difficulty === DIFFICULTY_MIDDLE.difficulty,
    difficult: states.currentFirstState.difficulty === DIFFICULTY_DIFFICULT.difficulty,
    special: states.currentFirstState.difficulty === DIFFICULTY_SPECIAL.difficulty,
  }
  const consts = {
    easy: {
      displayName: DIFFICULTY_EASY.difficultyJP,
      firstState: FIRST_STATE_EASY,
      isActive: isActive.easy,
    },
    middle: {
      displayName: DIFFICULTY_MIDDLE.difficultyJP,
      firstState: FIRST_STATE_MIDDLE,
      isActive: isActive.middle,
    },
    difficult: {
      displayName: DIFFICULTY_DIFFICULT.difficultyJP,
      firstState: FIRST_STATE_DIFFICULT,
      isActive: isActive.difficult,
    },
    special: {
      displayName: DIFFICULTY_SPECIAL.difficultyJP,
      firstState: specialFirstState,
      isActive: isActive.special,
    },
  }

  return isActive.special ? (
    <DifficultySelectorDiv>
      <DifficultyButtonDiv>
        <DifficultyButton funs={{ refreshStateWithDifficulty }} consts={consts.easy} />
        <DifficultyButton funs={{ refreshStateWithDifficulty }} consts={consts.middle} />
        <DifficultyButton funs={{ refreshStateWithDifficulty }} consts={consts.difficult} />
        <DifficultyButton funs={{ refreshStateWithDifficulty }} consts={consts.special} />
      </DifficultyButtonDiv>
      <SpecialForm funs={{ refreshStateWithDifficulty, setSpecialFirstState }} />
    </DifficultySelectorDiv>
  ) : (
    <DifficultySelectorDiv>
      <DifficultyButtonDiv>
        <DifficultyButton funs={{ refreshStateWithDifficulty }} consts={consts.easy} />
        <DifficultyButton funs={{ refreshStateWithDifficulty }} consts={consts.middle} />
        <DifficultyButton funs={{ refreshStateWithDifficulty }} consts={consts.difficult} />
        <DifficultyButton funs={{ refreshStateWithDifficulty }} consts={consts.special} />
      </DifficultyButtonDiv>
    </DifficultySelectorDiv>
  )
}
