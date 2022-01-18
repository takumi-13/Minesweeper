import styled from 'styled-components'
import type { BoardProps, IconProps, PositionProps } from '../types/type'

export const Board = styled.div<BoardProps>`
  position: relative;
  top: 0;
  left: 6px;
  width: ${(props) => 20 + props.blockNumX * 50}px;
  height: ${(props) => 20 + props.blockNumY * 50}px;
  margin: 10px 0;
  background-color: grey;
  border: inset 10px;
`
Board.defaultProps = {
  blockNumX: 9,
  blockNumY: 9,
}

export const BoardHeader = styled.div<BoardProps>`
  position: relative;
  top: 0;
  left: 6px;
  width: ${(props) => 20 + props.blockNumX * 50}px;
  height: 90px;
  margin: 10px 0;
  overflow: hidden;
  background-color: grey;
  border: inset 10px;
  display: flex;
  justify-content: space-between;
`
BoardHeader.defaultProps = {
  blockNumX: 9,
  blockNumY: 9,
}

export const BoardFrame = styled.div<BoardProps>`
  width: ${(props) => 40 + props.blockNumX * 50}px;
  height: ${(props) => 130 + props.blockNumY * 50}px;
  background-color: #d7d2d8;
  border: outset 6px;
`
BoardFrame.defaultProps = {
  blockNumX: 9,
  blockNumY: 9,
}

const Block = styled.div<PositionProps>`
  float: left;
  width: 50px;
  height: 50px;
  background-image: url(icons.png);
  background-repeat: no-repeat;
  background-position: ${(props) => 45 - props.number * 45}px -4px;
  background-size: 650px 55px;
  border: 1px solid;
`

Block.defaultProps = {
  number: 0,
}

export const PushedBlock = styled(Block)<PositionProps>`
  background-color: white;
  border-color: black;
`

export const UnPushedBlock = styled(Block)<PositionProps>`
  cursor: pointer;
  border-color: white;
  :hover {
    border-bottom-color: transparent;
    transform: translateY(0.1875em);
  }
`

export const BomBlock = styled(Block)<PositionProps>`
  background-color: red;
  background-position: -460px -4px;
`
export const FlagBlock = styled(UnPushedBlock)<PositionProps>`
  background-position: -415px -4px;
`
export const HatenaBlock = styled(UnPushedBlock)<PositionProps>`
  background-position: -370px -4px;
`

const NumIcon = styled.div`
  float: left;
  width: 1.6em;
  height: 50px;
  margin-top: 12px;
  font-family: monospace;
  font-size: 46px;
  color: red;
  text-align: center;
  vertical-align: middle;
  background-color: black;
  display: flex;
  align-content: space-between;
`

export const FlagNum = styled(NumIcon)`
  margin-right: 0px;
  margin-left: 30px;
`
export const FaceIcon = styled(UnPushedBlock)<IconProps>`
  float: left;
  margin-top: 12px;
  margin-bottom: 0;
  background-position: ${(props) => props.number} -4px;
  background-size: 605px 50px;
  border: outset 4px;
  display: flex;
`
export const TimerNum = styled(NumIcon)`
  margin-right: 30px;
  margin-left: 0px;
`
