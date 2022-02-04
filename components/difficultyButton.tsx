import React from 'react'
import styled from 'styled-components'
import { DifficultyButtonProps } from '../types/difficultySelector/difficultyButton'

const MyButton = styled.button`
  margin-right: 1em;
  font-size: 26px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  background-color: white;
  border: 0;

  &[data-label='false'] {
    :hover {
      color: #00f;
      text-decoration: underline;
    }

    color: #2462ff;
  }
`

export const DifficultyButton: React.FC<DifficultyButtonProps> = ({ funs, consts }) => {
  return (
    <MyButton
      data-label={consts.isActive}
      onClick={() => funs.refreshStateWithDifficulty(consts.firstState)}
    >
      {consts.displayName}
    </MyButton>
  )
}
