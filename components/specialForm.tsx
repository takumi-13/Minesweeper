import React from 'react'
import styled from 'styled-components'
import { SpecialFormProps } from '../types/difficultySelector/specialForm'
import { makeFirstBoard } from '../utils/board'
import { FIRST_STATE_SPECIAL } from '../utils/firstState'
const StyledInput = styled.input`
  width: 4em;
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
    <div>
      <label htmlFor="sizeX">幅:</label>
      <StyledInput
        type="number"
        defaultValue={FIRST_STATE_SPECIAL.sizeX}
        id="sizeX"
        onChange={(event) => changeInputSizeX(event)}
      />
      <label htmlFor="sizeY">高さ:</label>
      <StyledInput
        type="number"
        defaultValue={FIRST_STATE_SPECIAL.sizeY}
        id="sizeY"
        onChange={(event) => changeInputSizeY(event)}
      />
      <label htmlFor="bomNum">マス:</label>
      <StyledInput
        type="number"
        defaultValue={FIRST_STATE_SPECIAL.bomNum}
        id="bomNum"
        onChange={(event) => changeInputBomNum(event)}
      />
      <button onClick={() => applyChanges()}>更新 </button>
    </div>
  )
}
