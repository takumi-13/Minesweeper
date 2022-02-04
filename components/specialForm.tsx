import React from 'react'
import styled from 'styled-components'
import { SpecialFormProps } from '../types/difficultySelector/specialForm'
import { makeFirstBoard } from '../utils/board'
import { FIRST_STATE_SPECIAL } from '../utils/firstState'

const StyledInput = styled.input`
  width: 4em;
  margin-right: 1em;
  font-size: 24px;
  border: 2px solid #ddd;
`
const StyledButton = styled.button`
  width: 4em;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  background-color: white;
  :hover {
    background-color: rgba(212, 212, 212, 0.4);
  }
`

const StyledLabel = styled.label`
  font-size: 24px;
  font-weight: bold;
`
const StyledDiv = styled.div`
  padding-left: 0.5em;
`

export const SpecialForm: React.FC<SpecialFormProps> = ({ funs }) => {
  const [inputSizeX, setInputSizeX] = React.useState(FIRST_STATE_SPECIAL.sizeX)
  const [inputSizeY, setInputSizeY] = React.useState(FIRST_STATE_SPECIAL.sizeY)
  const [inputBomNum, setInputBomNum] = React.useState(FIRST_STATE_SPECIAL.bomNum)

  const applyChanges = () => {
    const newBoard = makeFirstBoard(inputSizeY, inputSizeX)
    const res = {
      difficulty: 'special',
      bomNum: inputBomNum,
      sizeX: inputSizeX,
      sizeY: inputSizeY,
      board: newBoard,
    }
    funs.refreshStateWithDifficulty(res)
    funs.setSpecialFirstState(res)
  }
  const changeInputSizeX: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputSizeX(() => parseInt(e.target.value))
  }
  const changeInputSizeY: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputSizeY(() => parseInt(e.target.value))
  }

  const changeInputBomNum: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const maxBomNum = (inputSizeX * inputSizeY) / 2
    const val = parseInt(e.target.value)
    const res = val <= maxBomNum ? val : maxBomNum
    setInputBomNum(() => res)
  }

  return (
    <StyledDiv>
      <StyledLabel htmlFor="sizeX">幅：</StyledLabel>
      <StyledInput
        type="number"
        defaultValue={FIRST_STATE_SPECIAL.sizeX}
        id="sizeX"
        onChange={(event) => changeInputSizeX(event)}
      />
      <StyledLabel htmlFor="sizeY">高さ：</StyledLabel>
      <StyledInput
        type="number"
        defaultValue={FIRST_STATE_SPECIAL.sizeY}
        id="sizeY"
        onChange={(event) => changeInputSizeY(event)}
      />
      <StyledLabel htmlFor="bomNum">マス：</StyledLabel>
      <StyledInput
        type="number"
        defaultValue={FIRST_STATE_SPECIAL.bomNum}
        id="bomNum"
        onChange={(event) => changeInputBomNum(event)}
      />
      <StyledButton onClick={() => applyChanges()}>更新 </StyledButton>
    </StyledDiv>
  )
}
