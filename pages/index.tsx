import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useCallback, useRef, useState } from 'react'
import { Board, BoardFrame } from '../components/board'
import { BoardHead } from '../components/boardHead'
import { BoardMain } from '../components/boardMain'
import { Container, Main } from '../components/page'
import type { Pos, Values } from '../types/type'
import { calBom, createBom } from '../utils/bom'
import { FIRST_STATE } from '../utils/firstState'
import { posArrayEquall, posEquall } from '../utils/position'
import { UpdatePosition } from '../utils/updatePosition'

let boms: Pos[] = createBom(10)
//console.log(boms)
let pushedBlockNum = 0

const Home: NextPage = () => {
  if (typeof document !== 'undefined') document.oncontextmenu = () => false
  //Stateの初期化
  const refreshState = () => {
    setGameState(FIRST_STATE.gameState)
    setBoard(FIRST_STATE.board)
    setFlgPosition(FIRST_STATE.flgPosition)
    setCount(FIRST_STATE.count)
    pushedBlockNum = 0
    boms = createBom(10)
    countStop()
  }
  //-1:PreStart, 0:Normal, 1:Clear, 99:Gameover
  const [gameState, setGameState] = useState(FIRST_STATE.gameState)

  // -1:爆弾, 1-8:クリック済み, 9:未クリック, 99:フラグ, 100: ?
  const [board, setBoard] = useState(FIRST_STATE.board)

  const [flgPosition, setFlgPosition] = useState<Pos[]>(FIRST_STATE.flgPosition)

  const [count, setCount] = useState(FIRST_STATE.count)

  const states = { gameState, board, flgPosition, count }

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
    setGameState(1)
    countStop()
  }
  const setGameover = () => {
    setGameState(99)
    countStop()
  }

  const checkGameStart = () => {
    if (gameState === -1) {
      setGameState(0)
      countStart()
    }
  }

  const onContextMenu = (posX: number, posY: number) => {
    checkGameStart()
    const removeFlgPosition = (flg: Pos) => {
      const res = [...flgPosition]
      let count = 0
      let index = 0
      let isFind = false
      res.forEach((element) => {
        if (posEquall(element, flg)) {
          index = count
          isFind = true
        }
        count += 1
      })
      isFind && res.splice(index, 1)
      return res
    }
    const newBoard: typeof board = JSON.parse(JSON.stringify(board))
    const newFlgPosition: Pos = { x: posX, y: posY }
    const isFlg = board[posY][posX] === 99
    const isHatena = board[posY][posX] === 100

    let newFlgPositions: Pos[] = []
    if (isFlg) {
      newBoard[posY][posX] = 9
      newFlgPositions = removeFlgPosition(newFlgPosition)
    } else if (isHatena) {
      newBoard[posY][posX] = 99
      newFlgPositions = [...flgPosition, newFlgPosition]
    } else {
      newBoard[posY][posX] = 100
      newFlgPositions = removeFlgPosition(newFlgPosition)
    }
    posArrayEquall(newFlgPositions, boms) ? setGameClear() : setGameState(0)
    setFlgPosition(newFlgPositions)
    setBoard(newBoard)
  }
  const judgePushAllBlocks = (newPositions: Values[]) => {
    if (pushedBlockNum === board.length ** 2 - boms.length) {
      setGameClear()
      const newFlgPosition: Pos[] = []
      boms.forEach((el) => {
        newPositions.push({ x: el.x, y: el.y, value: 99 })
        newFlgPosition.push({ x: el.x, y: el.y })
      })
      setFlgPosition(newFlgPosition)
    }
  }

  const applyBoard = (board: number[][], res: Values[]) => {
    res.forEach((element) => {
      board[element.y][element.x] = element.value
    })
    setBoard(board)
  }

  const onClick = (posX: number, posY: number) => {
    checkGameStart()
    let isBom = false
    boms.forEach((element) => (isBom = isBom || (element.x === posX && element.y === posY)))

    const newBoard: typeof board = JSON.parse(JSON.stringify(board))
    if (isBom) {
      const newPositions: Values[] = []
      boms.forEach((el) => {
        newPositions.push({ x: el.x, y: el.y, value: -1 })
      })
      setGameover()
      applyBoard(newBoard, newPositions)
      return
    }
    const newNum = calBom(posX, posY, boms)
    const updatePosition = new UpdatePosition(pushedBlockNum, board, boms)
    updatePosition.makeNewBoard(newNum, posX, posY)
    const newPositions = updatePosition.getNewPositions
    pushedBlockNum = updatePosition.pushedBlockNum
    judgePushAllBlocks(newPositions)
    applyBoard(newBoard, newPositions)
  }

  const makeBoard = () => {
    return board.map((row, y) =>
      row.map((num, x) => (
        <BoardMain
          states={states}
          vars={{ x, y, num, boms }}
          funs={{ onClick, onContextMenu }}
          key={`${x}-${y}`}
        />
      ))
    )
  }

  const makeHeader = () => {
    return <BoardHead states={states} vars={{ boms }} funs={{ refreshState }} />
  }

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <BoardFrame>
          {makeHeader()}
          <Board>{makeBoard()}</Board>
        </BoardFrame>
      </Main>
    </Container>
  )
}
export default Home
