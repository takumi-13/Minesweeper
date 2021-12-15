const onClick = (posX: number, posY: number) => {
  checkGameStart()
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
    newPositions = []
    boms.forEach((el) => {
      newPositions.push({ x: el.x, y: el.y, value: -1 })
    })
    setGameover()
    applyBoard(newBoard, newPositions)
    return
  }
  const newNum = calBom(posX, posY, boms)
  updateNewNum(newNum, posX, posY)
  judgePushAllBlocks()
  //元のボードに新しいボードの値を適用
  applyBoard(newBoard, newPositions)
}
