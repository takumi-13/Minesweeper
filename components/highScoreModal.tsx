import React from 'react'
import styled from 'styled-components'
import { HighScoreModalProps } from '../types/highScoreModal/highScoreModal'
import { getClearResultAsNumberList } from '../utils/result'

const OverlayScreen = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  left: -30%;
  top: 0;
  width: 155vw;
  height: 155vh;
  z-index: 1;
  transform-origin: top center;
`
const ModalContent = styled.div`
  background-color: white;
  box-sizing: border-box;
  border-radius: 8vmin;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vmin;
  text-align: center;
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  min-width: 80vmin;
  z-index: 2;
  > button {
    border-width: 0.5vmin;
    position: absolute;
    top: 4vmin;
    right: 4vmin;
    height: 5.5vmin;
    width: 5.5vmin;
    font-size: 4vmin;
    border-radius: 2vmin;
  }
`
const Content = styled.div`
  max-height: 80vmin;
  padding: 4vmin;
`

const Text = styled.p`
  color: #777;
  font-size: 4vmin;
  margin: 4vmin 0 0;
  white-space: pre-wrap;
`
const Title = styled.h1`
  font-size: 4vmin;
  margin: 3vmin auto 0;
`

const Table = styled.table`
  table-layout: fixed;
  font-size: 3vmin;
  margin: 2vmin auto 0;
  border-collapse: collapse;
  margin: 0 auto;
  padding: 0;
  width: 40vw;
  box-shadow: 0 0 15px -6px #00000073;
`

const PreviousTr = styled.tr`
  text-align: center;
`
const CurrentTr = styled.tr`
  background-color: #f3ecae;
  text-align: center;
`
const RightTd = styled.td`
  align-items: right;
`

const CenterTd = styled.td`
  align-items: center;
`

const TableHeadTr = styled.tr`
  background-color: #5a9fee;
  color: #fff;
`
const TableHeadTh = styled.th`
  font-size: 0.85em;
  padding: 1em;
`

const formatTime = (time: number) => {
  if (time === 9999) {
    return '-'
  } else {
    const min = Math.floor(time / 60)
    const res = min === 0 ? `${time}秒` : `${min}分${`00${time - min * 60}`.slice(-2)}秒`
    return res
  }
}

export const HighScoreModal: React.FC<HighScoreModalProps> = ({ consts, funs }) => {
  const clearResult = getClearResultAsNumberList(consts.difficulty)
  const currentResult = clearResult[0]
  const previousResultList = clearResult.slice(1)

  const insertIndex = previousResultList.findIndex((element) => element > currentResult)
  const displayResult = clearResult
    .sort()
    .map((element) => formatTime(element))
    .splice(0, 5)

  const formatDifficulty = (difficulty: string) => {
    return difficulty === 'easy' ? '初級' : difficulty === 'middle' ? '中級' : '上級'
  }

  const resultMessage = [0, 1].includes(insertIndex)
    ? `おめでとう！！！\n最速でクリアしたよ！！！`
    : 1 < insertIndex && insertIndex < 6
    ? `ランクインおめでとう！！！\n次は1位を目指そう！`
    : `残念、ランキング圏外だ。\nランキング入賞を目指してみよう！`
  const formatedTitle = `クリア時間ランキング（${formatDifficulty(consts.difficulty)}）`
  return (
    <OverlayScreen>
      <ModalContent>
        <button onClick={() => funs.refreshState()}>×</button>
        <Content>
          <Title>{formatedTitle}</Title>
          <Table>
            <TableHeadTr>
              <TableHeadTh>順位</TableHeadTh>
              <TableHeadTh>時間</TableHeadTh>
            </TableHeadTr>
            {displayResult.map((value, index) =>
              index === insertIndex ? (
                <CurrentTr key={index}>
                  <CenterTd>{index + 1}</CenterTd>
                  <RightTd>{value}</RightTd>
                </CurrentTr>
              ) : (
                <PreviousTr key={index}>
                  <CenterTd>{index + 1}</CenterTd>
                  <RightTd>{value}</RightTd>
                </PreviousTr>
              )
            )}
          </Table>
          <Text>{resultMessage}</Text>
        </Content>
      </ModalContent>
    </OverlayScreen>
  )
}
