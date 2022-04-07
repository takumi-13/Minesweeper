import React, { useCallback, useRef, useState } from 'react'
import { BoardSize, DifficultyFirstStates, Pos } from '../../types/type'
import { createBom } from '../../utils/bom'
import { FIRST_STATE_COMMON, FIRST_STATE_EASY } from '../../utils/firstState'
import { saveClearResult } from '../../utils/result'
import { BoardOrigin } from '../board/boardOrigin'
import { DifficultySelector } from '../difficultySelector/difficultySelector'
import { HighScoreModal } from '../highscoreModal/highScoreModal'
import { UserProfile } from '../userProfile/userProfile'
import { Main } from './page'

export const Game: React.FC = () => {
  if (typeof document !== 'undefined') document.oncontextmenu = () => false

  const [nowFirstState, setNowFirstState] = useState<DifficultyFirstStates>(FIRST_STATE_EASY)

  const refreshStateWithDifficulty = (values: DifficultyFirstStates) => {
    refreshStateCommon()
    setNowFirstState(values)
    setBoardSize({ sizeX: values.sizeX, sizeY: values.sizeY })
    setBoard(values.board)
    setBoms(createBom(values.bomNum, values.sizeX, values.sizeY))
  }

  const refreshState = () => {
    refreshStateCommon()
    setBoardSize({ sizeX: nowFirstState.sizeX, sizeY: nowFirstState.sizeY })
    setBoard(nowFirstState.board)
    setBoms(createBom(nowFirstState.bomNum, nowFirstState.sizeX, nowFirstState.sizeY))
  }

  const refreshStateCommon = () => {
    setGameState(FIRST_STATE_COMMON.gameState)
    setFlgPosition(FIRST_STATE_COMMON.flgPosition)
    setCount(FIRST_STATE_COMMON.count)
    setPushedBlockNum(0)
    countStop()
  }
  //-1:PreStart, 0:Normal, 1:Clear, 99:Gameover
  const [gameState, setGameState] = useState(FIRST_STATE_COMMON.gameState)

  // -1:爆弾, 1-8:クリック済み, 9:未クリック, 99:フラグ, 100: ?
  const [board, setBoard] = useState(nowFirstState.board)
  const [flgPosition, setFlgPosition] = useState<Pos[]>(FIRST_STATE_COMMON.flgPosition)
  const [count, setCount] = useState(FIRST_STATE_COMMON.count)
  const [boms, setBoms] = useState(
    createBom(nowFirstState.bomNum, nowFirstState.sizeX, nowFirstState.sizeY)
  )
  const [pushedBlockNum, setPushedBlockNum] = useState(0)
  const [boardSize, setBoardSize] = useState<BoardSize>({
    sizeX: nowFirstState.sizeX,
    sizeY: nowFirstState.sizeY,
  })

  const intervalRef = useRef<number | null>(null)
  const countStart = useCallback(() => {
    if (intervalRef.current !== null) {
      return
    }
    intervalRef.current = window.setInterval(() => {
      setCount((c) => c + 1)
    }, 1000)
  }, [])
  const countStop = useCallback(() => {
    if (intervalRef.current === null) {
      return
    }
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }, [])

  const setGameClear = () => {
    saveClearResult(nowFirstState.difficulty, count)
    setGameState(1)
    countStop()
    setActiveTab(nowFirstState.difficulty)
    nowFirstState.difficulty !== 'special' && setShowModal(true)
  }
  const setGameover = () => {
    setGameState(99)
    countStop()
  }

  const checkGameStart = (): boolean => {
    if (gameState === -1) {
      setGameState(0)
      countStart()
      return true
    }
    return false
  }

  const boardStates = { gameState, board, flgPosition, count, boms, pushedBlockNum, boardSize }
  const boardFuns = {
    refreshState,
    checkGameStart,
    setGameover,
    setGameClear,
    setGameState,
    setPushedBlockNum,
    setFlgPosition,
    setBoard,
    setBoms,
  }

  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState(nowFirstState.difficulty)

  return (
    <Main>
      <UserProfile />
      <DifficultySelector
        states={{ boardSize, boms, nowFirstState }}
        funs={{
          refreshStateWithDifficulty,
        }}
      />
      <BoardOrigin parentStates={boardStates} funs={boardFuns} />
      <HighScoreModal
        states={{ showModal, activeTab }}
        consts={{ difficulty: nowFirstState.difficulty }}
        funs={{ refreshStateWithDifficulty, setShowModal, setActiveTab }}
      />
    </Main>
  )
}
