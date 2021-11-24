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
  background-color: grey;
  margin: 10px 0px;
  border: solid 2px black;
`

const BoardHeader = styled.div`
  width: 455px;
  height: 70px;
  background-color: grey;
  overflow: hidden;
  margin: 10px 0px;
  border: solid 2px black;
`

const BoardFrame = styled.div`
  width: 480px;
  height: 570px;
  border-style: solid;
  border-width: 10px;
  background-color: #d7d2d8;
  border-color: #d7d2d8;
`
type PositionProps = {
  number: number
}

const Block = styled.div<PositionProps>`
  float: left;
  width: 50px;
  height: 50px;
  border: 1px solid;
  background-image: url(icons.png);
  background-size: 650px 55px;
  background-repeat: no-repeat;
  background-position: ${(props) => 45 - props.number * 45 + 'px'} -4px;
`
Block.defaultProps = {
  number: 0,
}

const PushedBlock = styled(Block)<PositionProps>`
  background-color: white;
  border-color: black;
`

const UnPushedBlock = styled(Block)<PositionProps>`
  border-color: white;
  background-image: None;
`

const BomBlock = styled(Block)<PositionProps>`
  background-color: red;
  background-position: -460px -4px;
`
const FlagBlock = styled(Block)<PositionProps>`
  background-position: -415px -4px;
`

const Logo = styled.span`
  height: 1em;
  margin-left: 0.5rem;
`
const BomNum = styled.div`
  float: left;
  text-align: center;
  font: mono-space;
  color: red;
  font-size: 50px;
  background-color: black;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 50px;
  margin-right: 25px;
`
const FaceIcon = styled.div`
  float: left;
  width: 40px;
  height: 50px;

  background-image: url(icons.png);
  background-size: 600px 55px;
  background-repeat: no-repeat;
  background-position: ${({ theme }) => theme.main} -4px;

  margin-top: 10px;
  margin-bottom: 0px;
  margin-left: 50px;
  margin-right: 50px;
  background-color: #6c6e6e;
`
FaceIcon.defaultProps = {
  theme: {
    main: '-475px',
  },
}

const TimerNum = styled.div`
  float: right;
  text-align: center;
  font: mono-space;
  color: red;
  font-size: 50px;
  background-color: black;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 50px;
`

type Pos = { x: number; y: number }

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
    const newBoard: typeof board = JSON.parse(JSON.stringify(board))
    const newFlgPosition: Pos = { x: posX, y: posY }
    const isFlg = board[posY][posX] === 99
    if (isFlg) {
      newBoard[posY][posX] = 9
      const res = [...flgPosition]
      const index = res.indexOf(newFlgPosition)
      res.splice(index, 1)
      setFlgPosition(res)
      console.log(flgPosition)
    } else {
      newBoard[posY][posX] = 99
      setFlgPosition([...flgPosition, newFlgPosition])
    }
    setBoard(newBoard)
    checkGameClear()
  }

  const onClick = (x: number, y: number) => {
    //console.log({ x, y })
    const calBom = () => {
      let calNum = 0
      boms.forEach(
        (elm) => Math.abs(elm.x - x) in [0, 1] && Math.abs(y - elm.y) in [0, 1] && calNum++
      )
      return calNum
    }
    const checkGameOver = () => {
      isBom && setGameState(99)
    }

    const newNum = calBom()
    let isBom = false
    const newBoard: typeof board = JSON.parse(JSON.stringify(board))
    boms.forEach((element) => (isBom = isBom || (element.x === x && element.y === y)))
    //boms.forEach((element) => console.log(element.x, element.y))
    isBom ? (newBoard[y][x] = -1) : (newBoard[y][x] = newNum)
    setBoard(newBoard)
    checkGameOver()
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
