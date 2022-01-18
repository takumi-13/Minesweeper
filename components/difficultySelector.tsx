import React, { useState } from 'react'
import { DifficultySelectorProps } from '../types/difficultySelector/difficultySelector'
import { DifficultyFirstStates } from '../types/type'
import {
  FIRST_STATE_DIFFICULT,
  FIRST_STATE_EASY,
  FIRST_STATE_MIDDLE,
  FIRST_STATE_SPECIAL,
} from '../utils/firstState'
import { SpecialForm } from './specialForm'

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ states, funs }) => {
  const [specialFirstState, setSpecialFirstState] =
    useState<DifficultyFirstStates>(FIRST_STATE_SPECIAL)

  return states.nowFirstState.difficulty === 'special' ? (
    <div>
      <button onClick={() => funs.refreshStateWithDifficulty(FIRST_STATE_EASY)}>初級 </button>
      <button onClick={() => funs.refreshStateWithDifficulty(FIRST_STATE_MIDDLE)}>中級 </button>
      <button onClick={() => funs.refreshStateWithDifficulty(FIRST_STATE_DIFFICULT)}>上級</button>
      <button onClick={() => funs.refreshStateWithDifficulty(specialFirstState)}>スペシャル</button>
      <SpecialForm
        funs={{ refreshStateWithDifficulty: funs.refreshStateWithDifficulty, setSpecialFirstState }}
      />
    </div>
  ) : (
    <div>
      <button onClick={() => funs.refreshStateWithDifficulty(FIRST_STATE_EASY)}>初級 </button>
      <button onClick={() => funs.refreshStateWithDifficulty(FIRST_STATE_MIDDLE)}>中級 </button>
      <button onClick={() => funs.refreshStateWithDifficulty(FIRST_STATE_DIFFICULT)}>上級</button>
      <button onClick={() => funs.refreshStateWithDifficulty(specialFirstState)}>スペシャル</button>
    </div>
  )
}
