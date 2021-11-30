import styled from 'styled-components'
export {
  Board,
  BoardHeader,
  BoardFrame,
  PushedBlock,
  UnPushedBlock,
  BomBlock,
  FlagBlock,
  HatenaBlock,
  FlagNum,
  FaceIcon,
  TimerNum,
}
const Board = styled.div`
  position: relative;
  top: 0;
  left: 6px;
  width: 470px;
  height: 470px;
  margin: 10px 0;
  background-color: grey;
  border: inset 10px;
`

const BoardHeader = styled.div`
  position: relative;
  top: 0;
  left: 6px;
  width: 470px;
  height: 90px;
  margin: 10px 0;
  overflow: hidden;
  background-color: grey;
  border: inset 10px;
`

const BoardFrame = styled.div`
  width: 490px;
  height: 600px;
  background-color: #d7d2d8;
  border: outset 6px;
`
type PositionProps = {
  number: number
}

const Block = styled.div<PositionProps>`
  float: left;
  width: 50px;
  height: 50px;
  background-image: url(icons.png);
  background-repeat: no-repeat;
  background-position: ${(props) => 45 - props.number * 45 + 'px'} -4px;
  background-size: 650px 55px;
  border: 1px solid;
`
Block.defaultProps = {
  number: 0,
}

const PushedBlock = styled(Block)<PositionProps>`
  background-color: white;
  border-color: black;
`

const UnPushedBlock = styled(Block)<PositionProps>`
  cursor: pointer;
  border-color: white;
  :hover {
    border-bottom-color: transparent;
    transform: translateY(0.1875em);
  }
`

const BomBlock = styled(Block)<PositionProps>`
  background-color: red;
  background-position: -460px -4px;
`
const FlagBlock = styled(UnPushedBlock)<PositionProps>`
  background-position: -415px -4px;
`
const HatenaBlock = styled(UnPushedBlock)<PositionProps>`
  background-position: -370px -4px;
`

const FlagNum = styled.div`
  float: left;
  width: 100px;
  margin-top: 3px;
  margin-right: 60px;
  margin-left: 30px;
  font-family: monospace;
  font-size: 46px;
  color: red;
  text-align: center;
  background-color: black;
`
const FaceIcon = styled(UnPushedBlock)<PositionProps>`
  float: left;
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 0;
  margin-left: 15px;
  background-position: ${(props) => props.number} -4px;
  background-size: 605px 50px;
  border: outset 4px;
`
const TimerNum = styled.div`
  float: left;
  width: 100px;
  margin-top: 3px;
  margin-left: 50px;
  font-family: monospace;
  font-size: 46px;
  color: red;
  text-align: center;
  background-color: black;
`
