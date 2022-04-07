import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Dialog, Tab, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import React from 'react'
import { HighScoreModalProps } from '../../types/highScoreModal/highScoreModal'
import { LocalStorageDataList, ManageLocalStorageData } from '../../types/type'
import { formatTime, getInsertIndex, getResultMessage } from '../../utils/highscoreModal'
import { concatResultTop5ASC, getClearResultAsNumberList } from '../../utils/result'
import { CloseButton } from './closeButton'
import { HighScoreModalTable } from './highScoreModalTable'
import { ReplayButton } from './replayButton'

const HighScoreModalNotDynamic: React.FC<HighScoreModalProps> = ({ states, consts, funs }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    funs.setActiveTab(newValue)
  }

  const localStorageData: ManageLocalStorageData = getClearResultAsNumberList(states.activeTab)
  const currentResult = localStorageData.currentResult
  const previousResultList: LocalStorageDataList = localStorageData.previousResult
  const activeClearResult = concatResultTop5ASC(localStorageData)

  const insertIndex: number = getInsertIndex(
    states.activeTab,
    consts.difficulty,
    previousResultList,
    currentResult
  )
  const displayResult = activeClearResult.map((element) => formatTime(element))

  const resultMessage = getResultMessage(states.activeTab, consts.difficulty, insertIndex)

  return (
    <Dialog open={states.showModal} onClose={() => funs.setShowModal(false)}>
      <Box>
        <Typography id="modal-title" variant="h6" component="h2" align="center" m={2}>
          クリア時間ランキング
        </Typography>
        <CloseButton funs={{ setShowModal: funs.setShowModal }} />
        <TabContext value={states.activeTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="Clear Result">
              <Tab label="初級" value="easy" />
              <Tab label="中級" value="middle" />
              <Tab label="上級" value="difficult" />
            </TabList>
          </Box>

          <TabPanel value="easy">
            <HighScoreModalTable
              consts={{
                insertIndex,
                displayResult,
                isActive: states.activeTab === consts.difficulty,
              }}
            />
            <Box display="flex" justifyContent="center">
              <ReplayButton
                consts={{ difficulty: 'easy', isLastPlay: consts.difficulty === 'easy' }}
                funs={{
                  refreshStateWithDifficulty: funs.refreshStateWithDifficulty,
                  setShowModal: funs.setShowModal,
                }}
              />
            </Box>
          </TabPanel>

          <TabPanel value="middle">
            <HighScoreModalTable
              consts={{
                insertIndex,
                displayResult,
                isActive: states.activeTab === consts.difficulty,
              }}
            />
            <Box display="flex" justifyContent="center">
              <ReplayButton
                consts={{ difficulty: 'middle', isLastPlay: consts.difficulty === 'middle' }}
                funs={{
                  refreshStateWithDifficulty: funs.refreshStateWithDifficulty,
                  setShowModal: funs.setShowModal,
                }}
              />
            </Box>
          </TabPanel>
          <TabPanel value="difficult">
            <HighScoreModalTable
              consts={{
                insertIndex,
                displayResult,
                isActive: states.activeTab === consts.difficulty,
              }}
            />
            <Box display="flex" justifyContent="center">
              <ReplayButton
                consts={{ difficulty: 'difficult', isLastPlay: consts.difficulty === 'difficult' }}
                funs={{
                  refreshStateWithDifficulty: funs.refreshStateWithDifficulty,
                  setShowModal: funs.setShowModal,
                }}
              />
            </Box>
          </TabPanel>
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
