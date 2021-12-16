import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useCallback, useRef, useState } from 'react'
import {
  Board,
  BoardFrame,
  BoardHeader,
  BomBlock,
  FaceIcon,
  FlagBlock,
  FlagNum,
  HatenaBlock,
  PushedBlock,
  TimerNum,
  UnPushedBlock,
} from '../components/board'
import { Container, Footer, Logo, Main } from '../components/page'
import type { Pos, Values } from '../types/type'
import { createBom } from '../utils/bom'
import { posArrayEquall, posEquall } from '../utils/position'

let boms: Pos[] = createBom(10)
let pushedBlockNum = 0

//let boms: Pos[] = [{ x: 0, y: 0 },{ x: 1, y: 1 },{ x: 2, y: 2 },]

const Home: NextPage = () => {
  if (typeof document !== 'undefined') document.oncontextmenu = () => false
  // prettier-ignore
  let newPositions: Values[] = []
  let reachedPositions: Pos[] = []

  const firstState = {
    count: 0,
    gameState: -1,
    flgPosition: [],
    board: [
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
    ],
  }
  //Stateの初期化
  const refreshState = () => {
    setGameState(firstState.gameState)
    setBoard(firstState.board)
    setFlgPosition(firstState.flgPosition)
    setCount(firstState.count)
    pushedBlockNum = 0
    boms = createBom(10)
    countStop()
  }

  //-1:PreStart, 0:Normal, 1:Clear, 99:Gameover
  const [gameState, setGameState] = useState(firstState.gameState)

  // -1:爆弾, 1-8:クリック済み, 9:未クリック, 99:フラグ, 100: ?
  const [board, setBoard] = useState(firstState.board)

  const [flgPosition, setFlgPosition] = useState<Pos[]>(firstState.flgPosition)

  const [count, setCount] = useState(firstState.count)

  const intervalRef = useRef<number | null>(null)
  const countStart = useCallback(() => {
    if (intervalRef.current !== null) {
      return
    }
    intervalRef.current = window.setInterval(() => {
      setCount((c) => c + 1)
    }, 1000)
    console.log('Start:', intervalRef.current)
  }, [])
  const countStop = useCallback(() => {
    if (intervalRef.current === null) {
      return
    }
    clearInterval(intervalRef.current)
    console.log('Stop:', intervalRef.current)
    intervalRef.current = null
    console.log('Stop:', intervalRef.current)
  }, [])

  const setGameClear = () => {
    setGameState(1)
    countStop()
  }
  const setGameover = () => {
    setGameState(99)
    countStop()
  }

  const onContextMenu = (posX: number, posY: number) => {
    gameState === -1 && setGameState(0)
    gameState === -1 && countStart()
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

  const checkReached = (vs: Values): boolean => {
    let res = false
    for (const item of reachedPositions) {
      const b1 = posEquall(item, vs)
      if (b1) {
        res = true
        break
      }
    }
    !res && reachedPositions.push({ x: vs.x, y: vs.y })
    return res
  }

  const updateNewPosition = (vs: Values, newboard: number[][]) => {
    newPositions.push(vs)

    //訪れたことのないブロックの場合再帰処理
    const isReached: boolean = checkReached(vs)
    if (!isReached) {
      pushedBlockNum++
      if (vs.value === 0) {
        vs.y < 8 &&
          newboard[vs.y + 1][vs.x] === 9 &&
          updateNewPosition({ x: vs.x, y: vs.y + 1, value: calBom(vs.x, vs.y + 1) }, newboard)
        0 < vs.y &&
          newboard[vs.y - 1][vs.x] === 9 &&
          updateNewPosition({ x: vs.x, y: vs.y - 1, value: calBom(vs.x, vs.y - 1) }, newboard)
        vs.x < 8 &&
          newboard[vs.y][vs.x + 1] === 9 &&
          updateNewPosition({ x: vs.x + 1, y: vs.y, value: calBom(vs.x + 1, vs.y) }, newboard)
        0 < vs.x &&
          newboard[vs.y][vs.x - 1] === 9 &&
          updateNewPosition({ x: vs.x - 1, y: vs.y, value: calBom(vs.x - 1, vs.y) }, newboard)
        8 > vs.x &&
          8 > vs.y &&
          newboard[vs.y + 1][vs.x + 1] === 9 &&
          updateNewPosition(
            { x: vs.x + 1, y: vs.y + 1, value: calBom(vs.x + 1, vs.y + 1) },
            newboard
          )
        0 < vs.x &&
          8 > vs.y &&
          newboard[vs.y + 1][vs.x - 1] === 9 &&
          updateNewPosition(
            { x: vs.x - 1, y: vs.y + 1, value: calBom(vs.x - 1, vs.y + 1) },
            newboard
          )
        8 > vs.x &&
          0 < vs.y &&
          newboard[vs.y - 1][vs.x + 1] === 9 &&
          updateNewPosition(
            { x: vs.x + 1, y: vs.y - 1, value: calBom(vs.x + 1, vs.y - 1) },
            newboard
          )
        0 < vs.x &&
          0 < vs.y &&
          newboard[vs.y - 1][vs.x - 1] === 9 &&
          updateNewPosition(
            { x: vs.x - 1, y: vs.y - 1, value: calBom(vs.x - 1, vs.y - 1) },
            newboard
          )
      }
    }
  }

  const calBom = (x: number, y: number) => {
    let calNum = 0
    boms.forEach(
      (elm) => Math.abs(elm.x - x) in [0, 1] && Math.abs(y - elm.y) in [0, 1] && calNum++
    )
    return calNum
  }

  const onClick = (posX: number, posY: number) => {
    gameState === -1 && setGameState(0)
    gameState === -1 && countStart()
    //元のボードに変更を加える関数
    const applyBoard = (board: number[][], res: Values[]) => {
      res.forEach((element) => {
        board[element.y][element.x] = element.value
      })
      setBoard(board)
    }
    //現在地にボムがあるか判定
    let isBom = false
    boms.forEach((element) => (isBom = isBom || (element.x === posX && element.y === posY)))

    //現在地にボムがあった場合，gameStateを99に,ボードの値を-1に設定
    //ボムがなかった場合，周囲のボム数を数える
    //周囲のボム数が1-8の場合，現在地を1-8に設定し終了
    //周囲のボム数が0の場合，さらに周囲のブロックについても判定
    const newBoard: typeof board = JSON.parse(JSON.stringify(board))
    if (isBom) {
      //newPositions = [{ x: posX, y: posY, value: -1 }]
      newPositions = []
      boms.forEach((el) => {
        newPositions.push({ x: el.x, y: el.y, value: -1 })
      })
      setGameover()
    } else {
      const newNum = calBom(posX, posY)
      if (0 < newNum && newNum < 9) {
        newPositions = [{ x: posX, y: posY, value: newNum }]
        pushedBlockNum++
      } else {
        newPositions = []
        reachedPositions = []
        updateNewPosition({ x: posX, y: posY, value: newNum }, board)
      }
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
    //元のボードに新しいボードの値を適用
    applyBoard(newBoard, newPositions)
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
          <BoardHeader>
            <FlagNum>{`000${boms.length - flgPosition.length}`.slice(-3)}</FlagNum>
            {gameState === 0 || gameState === -1 ? (
              <FaceIcon number={11.6} onClick={() => refreshState()}>
                <a></a>
              </FaceIcon>
            ) : gameState === 1 ? (
              <FaceIcon number={12.55} onClick={() => refreshState()}>
                <a></a>
              </FaceIcon>
            ) : (
              <FaceIcon number={13.5} onClick={() => refreshState()}>
                <a></a>
              </FaceIcon>
            )}
            <TimerNum>{`000${count}`.slice(-3)}</TimerNum>
          </BoardHeader>

          <Board>
            {board.map((row, y) =>
              row.map((num, x) =>
                num === 9 ? (
                  <UnPushedBlock
                    key={`${x}-${y}`}
                    onClick={() => (gameState === 0 || gameState === -1) && onClick(x, y)}
                    onContextMenu={() => flgPosition.length < boms.length && onContextMenu(x, y)}
                    number={0}
                  />
                ) : num === -1 ? (
                  <BomBlock key={`${x}-${y}`} number={0} />
                ) : num === 99 ? (
                  <FlagBlock
                    key={`${x}-${y}`}
                    onContextMenu={() => onContextMenu(x, y)}
                    number={0}
                  />
                ) : num === 100 ? (
                  <HatenaBlock
                    key={`${x}-${y}`}
                    onContextMenu={() => flgPosition.length < boms.length && onContextMenu(x, y)}
                    number={0}
                  />
                ) : (
                  <PushedBlock key={`${x}-${y}`} number={num} />
                )
              )
            )}
          </Board>
        </BoardFrame>
      </Main>

      <Footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Logo>
            <img src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </Logo>
        </a>
      </Footer>
    </Container>
  )
}

export default Home
