import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 100vh;
  padding: 0 0.5rem;
`

const Main = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
`
const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;

  a {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
  }
`
const Board = styled.div`
  width: 455px;
  height: 455px;
  margin: 10px 0;
  background-color: grey;
  border: solid 2px black;
`

const BoardHeader = styled.div`
  width: 455px;
  height: 70px;
  margin: 10px 0;
  overflow: hidden;
  background-color: grey;
  border: solid 2px black;
`

const BoardFrame = styled.div`
  width: 480px;
  height: 570px;
  background-color: #d7d2d8;
  border-color: #d7d2d8;
  border-style: solid;
  border-width: 10px;
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
  background-image: none;
  border-color: white;
  cursor: pointer;
  :hover {
    border-bottom-color: transparent;
    transform: translateY(0.1875em);
  }
`

const BomBlock = styled(Block)<PositionProps>`
  background-color: red;
  background-position: -460px -4px;
`
const FlagBlock = styled(Block)<PositionProps>`
  background-position: -415px -4px;
  cursor: pointer;
  :hover {
    border-bottom-color: transparent;
    transform: translateY(0.1875em);
  }
`
const HatenaBlock = styled(Block)<PositionProps>`
  background-position: -370px -4px;
  cursor: pointer;
  :hover {
    border-bottom-color: transparent;
    transform: translateY(0.1875em);
  }
`

const Logo = styled.span`
  height: 1em;
  margin-left: 0.5rem;
`
const BomNum = styled.div`
  float: left;
  margin-top: 5px;
  margin-right: 25px;
  margin-bottom: 5px;
  margin-left: 50px;

  /* font: mono-space; */
  font-size: 50px;
  color: red;
  text-align: center;
  background-color: black;
`
const FaceIcon = styled.div`
  float: left;
  width: 40px;
  height: 50px;
  margin-top: 10px;
  margin-right: 50px;
  margin-bottom: 0;
  margin-left: 50px;
  background-color: #6c6e6e;
  background-image: url(icons.png);
  background-repeat: no-repeat;
  background-position: ${({ theme }) => theme.main} -4px;
  background-size: 600px 55px;
`
FaceIcon.defaultProps = {
  theme: {
    main: '-475px',
  },
}

const TimerNum = styled.div`
  float: right;
  margin-top: 5px;
  margin-right: 50px;
  margin-bottom: 5px;

  /* font: mono-space; */
  font-size: 50px;
  color: red;
  text-align: center;
  background-color: black;
`

type Pos = { x: number; y: number }
type Values = { x: number; y: number; value: number }

const createBom = (bomNum: number): Pos[] => {
  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }
  const res: Pos[] = []
  for (let i = 0; i < bomNum; i++) {
    let pos: Pos = { x: getRandomInt(0, 8), y: getRandomInt(0, 8) }
    while (res.includes(pos)) {
      pos = { x: getRandomInt(0, 8), y: getRandomInt(0, 8) }
    }
    res.push(pos)
  }
  console.log(res)
  return res
}
let newPositions: Values[] = []
let reachedPositions: Pos[] = []
const boms: Pos[] = createBom(10)
//const boms: Pos[] = [{ x: 0, y: 0 }]

const Home: NextPage = () => {
  // prettier-ignore

  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((t) => t + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  //0:Normal, 1:Clear, 99:Gameover
  const [gameState, setGameState] = useState(0)

  // -1:爆弾, 1-8:クリック済み, 9:未クリック, 99:フラグ, 100: ?
  const [board, setBoard] = useState([
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
  ])
  const [flgPosition, setFlgPosition] = useState<Pos[]>([])

  const onContextMenu = (posX: number, posY: number) => {
    const array_equall = (a: Pos[], b: Pos[]) => {
      if (!Array.isArray(a)) return false
      if (!Array.isArray(b)) return false
      if (a.length != b.length) return false
      for (let i = 0, n = a.length; i < n; ++i) {
        if (a[i] !== b[i]) return false
      }
      return true
    }
    const checkGameClear = () => {
      console.log(flgPosition)
      array_equall(flgPosition, [
        { x: 1, y: 1 },
        { x: 0, y: 0 },
      ])
        ? setGameState(99)
        : console.log('Not clear')
    }
    const removeFlgPosition = (flg: Pos) => {
      const res = [...flgPosition]
      const index = res.indexOf(flg)
      res.splice(index, 1)
      setFlgPosition(res)
    }
    const newBoard: typeof board = JSON.parse(JSON.stringify(board))
    const newFlgPosition: Pos = { x: posX, y: posY }
    const isFlg = board[posY][posX] === 99
    const isHatena = board[posY][posX] === 100

    if (isFlg) {
      newBoard[posY][posX] = 100
      removeFlgPosition(newFlgPosition)
    } else if (isHatena) {
      newBoard[posY][posX] = 9
      removeFlgPosition(newFlgPosition)
    } else {
      newBoard[posY][posX] = 99
      setFlgPosition([...flgPosition, newFlgPosition])
    }
    setBoard(newBoard)
    checkGameClear()
  }

  const equall_position = (d1: Pos, d2: Pos) => {
    return d1.x === d2.x && d1.y === d2.y
  }

  const checkReached = (vs: Values) => {
    let res = false
    reachedPositions.forEach((element) => {
      res = res || equall_position({ x: vs.x, y: vs.y }, element)
    })
    return res
  }

  const updateNewPosition = (vs: Values, board: number[][]) => {
    newPositions.push(vs)
    const isReached: boolean = checkReached(vs)
    reachedPositions.push({ x: vs.x, y: vs.y })
    if (!isReached) {
      if (vs.value === 0) {
        vs.y < 8 &&
          board[vs.x][vs.y + 1] === 9 &&
          updateNewPosition({ x: vs.x, y: vs.y + 1, value: calBom(vs.x, vs.y + 1) }, board)
        0 < vs.y &&
          board[vs.x][vs.y - 1] === 9 &&
          updateNewPosition({ x: vs.x, y: vs.y - 1, value: calBom(vs.x, vs.y - 1) }, board)
        vs.x < 8 &&
          board[vs.x + 1][vs.y] === 9 &&
          updateNewPosition({ x: vs.x + 1, y: vs.y, value: calBom(vs.x + 1, vs.y) }, board)
        0 < vs.x &&
          board[vs.x - 1][vs.y] === 9 &&
          updateNewPosition({ x: vs.x - 1, y: vs.y, value: calBom(vs.x - 1, vs.y) }, board)
      }
    }
  }

  const applyBoard = (board: number[][], res: Values[]) => {
    res.forEach((element) => {
      board[element.y][element.x] = element.value
    })
    setBoard(board)
  }

  const calBom = (x: number, y: number) => {
    let calNum = 0
    boms.forEach(
      (elm) => Math.abs(elm.x - x) in [0, 1] && Math.abs(y - elm.y) in [0, 1] && calNum++
    )
    return calNum
  }

  const onClick = (posX: number, posY: number) => {
    //現在地にボムがあるか判定
    let isBom = false
    boms.forEach((element) => (isBom = isBom || (element.x === posX && element.y === posY)))

    //現在地にボムがあった場合，gameStateを99に,ボードの値を-1に設定
    //ボムがなかった場合，周囲のボム数を数える
    //周囲のボム数が1-8の場合，現在地を1-8に設定し終了
    //周囲のボム数が0の場合，さらに周囲のブロックについても判定
    const newBoard: typeof board = JSON.parse(JSON.stringify(board))
    if (isBom) {
      newPositions = [{ x: posX, y: posY, value: -1 }]
      setGameState(99)
    } else {
      const newNum = calBom(posX, posY)
      if (0 < newNum && newNum < 9) {
        newPositions = [{ x: posX, y: posY, value: newNum }]
      } else {
        newPositions = []
        reachedPositions = []
        updateNewPosition({ x: posX, y: posY, value: newNum }, newBoard)
        console.log(newPositions)
      }
    }
    //新しいボードの値を元のボードに適用
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
            <BomNum>{('000' + boms.length).slice(-3)}</BomNum>
            {gameState === 0 ? (
              <FaceIcon theme={{ main: '-475px' }}>
                <a></a>
              </FaceIcon>
            ) : gameState === 1 ? (
              <FaceIcon theme={{ main: '-515px' }}>
                <a></a>
              </FaceIcon>
            ) : (
              <FaceIcon theme={{ main: '-560px' }}>
                <a></a>
              </FaceIcon>
            )}
            <TimerNum>{('000' + count).slice(-3)}</TimerNum>
          </BoardHeader>

          <Board>
            {board.map((row, y) =>
              row.map((num, x) =>
                num === 9 ? (
                  <UnPushedBlock
                    key={`${x}-${y}`}
                    onClick={() => onClick(x, y)}
                    onContextMenu={() => onContextMenu(x, y)}
                    number={0}
                  />
                ) : num === -1 ? (
                  <BomBlock key={`${x}-${y}`} number={0} />
                ) : num === 99 ? (
                  <FlagBlock
                    key={`${x}-${y}`}
                    onClick={() => onClick(x, y)}
                    onContextMenu={() => onContextMenu(x, y)}
                    number={0}
                  />
                ) : num === 100 ? (
                  <HatenaBlock
                    key={`${x}-${y}`}
                    onClick={() => onClick(x, y)}
                    onContextMenu={() => onContextMenu(x, y)}
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
