import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Dialog, Tab, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import React, { useMemo } from 'react'
import { HighScoreModalProps } from '../../types/highScoreModal/highScoreModal'
import { AllManageLocalStorageData, Difficulty, LocalStorageDataList } from '../../types/type'
import { MODAL_DIFFICULTY_ALL_LIST } from '../../utils/constants/difficulty'
import { formatTime, getCurrentIndex, getResultMessage } from '../../utils/highscoreModal'
import { concatResultTop5ASC, getCompletedResult } from '../../utils/result'
import { CloseButton } from './closeButton'
import { HighScoreModalTable } from './highScoreModalTable'
import { ReplayButton } from './replayButton'

const HighScoreModalNotDynamic: React.FC<HighScoreModalProps> = ({ states, consts, funs }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: Difficulty) => {
    funs.setActiveTab(newValue)
  }
  const useAllLocalStorageData = () => {
    return useMemo(
      () =>
        MODAL_DIFFICULTY_ALL_LIST.map((elm) => elm.difficulty).reduce(
          (prev, difficulty) => {
            prev[difficulty] = getCompletedResult(difficulty)
            return prev
          },
          {
            special: { currentResult: -1, previousResult: [] as LocalStorageDataList },
          } as AllManageLocalStorageData
        ),
      [states.showModal]
    )
  }
  const allLocalStorageData: AllManageLocalStorageData = useAllLocalStorageData()
  const currentResult = allLocalStorageData[states.activeTab].currentResult
  const previousResultList = allLocalStorageData[states.activeTab].previousResult
  const activeCompletedResults = concatResultTop5ASC(allLocalStorageData[states.activeTab])

  const currentIndex = getCurrentIndex(previousResultList, currentResult)
  const formattedActiveCompletedResults = activeCompletedResults.map(formatTime)

  const resultMessage = getResultMessage(states.activeTab, consts.currentDifficulty, currentIndex)
  const difficultyInfoList = useMemo(
    () =>
      MODAL_DIFFICULTY_ALL_LIST.map((elem) => {
        return {
          difficulty: elem.difficulty,
          title: elem.difficultyJP,
          isLastPlay: elem.difficulty === consts.currentDifficulty,
        }
      }),
    []
  )
  return (
    <Dialog open={states.showModal} onClose={() => funs.setShowModal(false)}>
      <Box>
        <Typography id="modal-title" variant="h6" component="h2" align="center" m={2}>
          クリア時間ランキング
        </Typography>
        <CloseButton funs={{ setShowModal: funs.setShowModal }} />
        <TabContext value={states.activeTab as string}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="Completed Result">
              {difficultyInfoList.map((difficultyInfo) => (
                <Tab
                  key={difficultyInfo.difficulty}
                  label={difficultyInfo.title}
                  value={difficultyInfo.difficulty}
                />
              ))}
            </TabList>
          </Box>
          {difficultyInfoList.map((difficultyInfo) => (
            <TabPanel key={difficultyInfo.difficulty} value={difficultyInfo.difficulty}>
              <HighScoreModalTable
                consts={{
                  currentIndex,
                  formattedActiveCompletedResults,
                  isActive: states.activeTab === consts.currentDifficulty,
                }}
              />
              <Box display="flex" justifyContent="center">
                <ReplayButton
                  consts={{
                    difficulty: difficultyInfo.difficulty,
                    isLastPlay: difficultyInfo.isLastPlay,
                  }}
                  funs={{
                    refreshStateWithDifficulty: funs.refreshStateWithDifficulty,
                    setShowModal: funs.setShowModal,
                  }}
                />
              </Box>
            </TabPanel>
          ))}
        </TabContext>

        <Typography
          style={{ whiteSpace: 'pre-line', fontWeight: 'bold', fontSize: 20 }}
          paragraph={true}
          id="modal-comment"
          align={'center'}
        >
          {resultMessage}
        </Typography>
      </Box>
    </Dialog>
  )
}

export const HighScoreModal = dynamic(
  {
    loader: async () => HighScoreModalNotDynamic,
  },
  { ssr: false }
)
