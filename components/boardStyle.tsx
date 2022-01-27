import styled from 'styled-components'
import type { BoardSizeProps, IconProps, PositionProps } from '../types/type'

const defaultBoardSize = {
  boardsize: {
    sizex: 9,
    sizey: 9,
  },
}

export const Board = styled.div<BoardSizeProps>`
  position: relative;
  bottom: 1px;
  left: 6px;
  width: ${(props) => 20 + props.boardsize.sizex * 50}px;
  height: ${(props) => 20 + props.boardsize.sizey * 50}px;
  margin: 10px 2px;
  background-color: #8a8a8a;
  border: inset 10px white;
  border-top-color: #c4c4c4;
  border-left-color: #c4c4c4;
`
Board.defaultProps = defaultBoardSize

export const BoardHeader = styled.div<BoardSizeProps>`
  position: relative;
  left: 6px;
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: ${(props) => 20 + props.boardsize.sizex * 50}px;
  height: 90px;
  margin: 10px 0;
  overflow: hidden;
  background-color: #c4c4c4;
  border: inset 10px white;
  border-top-color: #c4c4c4;
  border-left-color: #c4c4c4;
`
BoardHeader.defaultProps = defaultBoardSize

export const BoardFrame = styled.div<BoardSizeProps>`
  width: ${(props) => 55 + props.boardsize.sizex * 50}px;
  height: ${(props) => 160 + props.boardsize.sizey * 50}px;
  background-color: #d4d4d4;
  border: outset 10px;
  border-top-color: white;
  border-right-color: #c4c4c4;
  border-bottom-color: #c4c4c4;
  border-left-color: white;
`
BoardFrame.defaultProps = defaultBoardSize

const Block = styled.div<PositionProps>`
  float: left;
  width: 50px;
  height: 50px;
  background-color: #d4d4d4;
  background-image: url(icons.png);
  background-repeat: no-repeat;
  background-position: ${(props) => 45 - props.number * 45}px 10px;
  background-size: 650px 30px;
  border: 1px solid;
`

Block.defaultProps = {
  number: 0,
}

export const PushedBlock = styled(Block)<PositionProps>`
  background-color: #c4c4c4;
  border: inset 1px;
  border-color: #8a8a8a;
`

export const UnPushedBlock = styled(Block)<PositionProps>`
  cursor: pointer;
  :hover {
    border-bottom-color: transparent;
    transform: translateY(0.1875em);
  }

  border: outset 6px;
  border-color: white;
  border-right-color: #c4c4c4;
  border-bottom-color: #c4c4c4;
`

export const BomBlock = styled(Block)<PositionProps>`
  background-color: red;
  background-position: -462px 10px;
`
export const FlagBlock = styled(UnPushedBlock)<PositionProps>`
  background-position: -420px 5px;
`
export const HatenaBlock = styled(UnPushedBlock)<PositionProps>`
  background-position: -375px 5px;
`

const NumIcon = styled.div`
  display: flex;
  float: left;
  width: 1.5em;
  height: 1em;
  margin-top: 14px;
  font-family: monospace;
  font-size: 46px;
  color: red;
  text-align: center;
  vertical-align: baseline;
  background-color: black;
`

export const FlagNum = styled(NumIcon)`
  margin-right: 0;
  margin-left: 20px;
`
export const FaceIcon = styled(UnPushedBlock)<IconProps>`
  display: flex;
  float: left;
  margin-top: 12px;
  background-position: ${(props) => 45 - props.number * 45}px -3px;
  background-size: 650px 45px;
  border: outset 6px;
`
export const TimerNum = styled(NumIcon)`
  margin-right: 20px;
  margin-left: 0;
`
