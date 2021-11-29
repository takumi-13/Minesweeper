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
  background-image: none;
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
const FlagBlock = styled(Block)<PositionProps>`
  cursor: pointer;
  background-position: -415px -4px;
  :hover {
    border-bottom-color: transparent;
    transform: translateY(0.1875em);
  }
`
const HatenaBlock = styled(Block)<PositionProps>`
  cursor: pointer;
  background-position: -370px -4px;
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
const FaceIcon = styled.div`
  float: left;
  width: 50px;
  height: 50px;
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 0;
  margin-left: 15px;
  background-color: #6c6e6e;
  background-image: url(icons.png);
  background-repeat: no-repeat;
  background-position: ${({ theme }) => theme.main} -4px;
  background-size: 605px 50px;
  border: outset 4px;
`
FaceIcon.defaultProps = {
  theme: {
    main: '-475px',
  },
}

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

type Pos = { x: number; y: number }
type Values = { x: number; y: number; value: number }

const posArrayEquall = (ps1: Pos[], ps2: Pos[]): boolean => {
  let res = true
  if (ps1.length === ps2.length) {
    for (const p1 of ps1) {
      let b1 = false
      for (const p2 of ps2) {
        b1 = b1 || posEquall(p1, p2)
      }
      res = b1 && res
    }
  } else res = false

  return res
}

const posEquall = (p1: Pos, p2: Pos): boolean => {
  return p1.x === p2.x && p1.y === p2.y
}

const isPosInclude = (p1: Pos, ps: Pos[]): boolean => {
  let res = false
  ps.forEach((el) => {
    res = res || posEquall(el, p1)
  })
  return res
}

const createBom = (bomNum: number): Pos[] => {
  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }
  const res: Pos[] = []
  for (let i = 0; i < bomNum; i++) {
    let pos: Pos = { x: getRandomInt(0, 8), y: getRandomInt(0, 8) }
    let isIncludePos = isPosInclude(pos, res)
    while (isIncludePos) {
      if (isIncludePos) {
        console.log(i, pos)
        pos = { x: getRandomInt(0, 8), y: getRandomInt(0, 8) }
      }
      isIncludePos = isPosInclude(pos, res)
    }
    res.push(pos)
  }
  console.log(res)
  return res
}

const boms: Pos[] = createBom(10)
//const boms: Pos[] = [{ x: 0, y: 0 }]

const Home: NextPage = () => {
  if (typeof document !== 'undefined') document.oncontextmenu = () => false
  // prettier-ignore
  let newPositions: Values[] = []
  let reachedPositions: Pos[] = []

  const [count, setCount] = useState(0)
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
    posArrayEquall(newFlgPositions, boms) ? setGameState(1) : setGameState(0)
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
  //TODO: 算出方法の修正
  const calBom = (x: number, y: number) => {
    let calNum = 0
    boms.forEach(
      (elm) => Math.abs(elm.x - x) in [0, 1] && Math.abs(y - elm.y) in [0, 1] && calNum++
    )
    return calNum
  }

  const onClick = (posX: number, posY: number) => {
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
      newPositions = [{ x: posX, y: posY, value: -1 }]
      setGameState(99)
    } else {
      const newNum = calBom(posX, posY)
      if (0 < newNum && newNum < 9) {
        newPositions = [{ x: posX, y: posY, value: newNum }]
      } else {
        newPositions = []
        reachedPositions = []
        updateNewPosition({ x: posX, y: posY, value: newNum }, board)
        console.log('Block are Pushed:')
      }
    }
    //元のボードに新しいボードの値を適用
    applyBoard(newBoard, newPositions)
  }

  const countCorrect = (): number => {
    let count = 0
    flgPosition.forEach
    flgPosition.forEach((e1) => {
      boms.forEach((e2) => {
        posEquall(e1, e2) && count++
      })
    })
    return count
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
            <BomNum>{('000' + (boms.length - flgPosition.length)).slice(-3)}</BomNum>
            {gameState === 0 ? (
              <FaceIcon theme={{ main: '-475px' }}>
                <a></a>
              </FaceIcon>
            ) : gameState === 1 ? (
              <FaceIcon theme={{ main: '-520px' }}>
                <a></a>
              </FaceIcon>
            ) : (
              <FaceIcon theme={{ main: '-563px' }}>
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
