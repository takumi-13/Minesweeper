const checkReached = (vs: Values): boolean => {
  let res = false
  for (const item of reachedPositions) {
    posEquall(item, vs) && (res = true)
  }
  !res && reachedPositions.push({ x: vs.x, y: vs.y })
  return res
}

const checkInBoard = (vs: Values): boolean => {
  return vs.x in [0, 1, 2, 3, 4, 5, 6, 7, 8] && vs.y in [0, 1, 2, 3, 4, 5, 6, 7, 8]
}

const checkCanPush = (vs: Values, newboard: number[][]): boolean => {
  const isInboard = checkInBoard(vs)
  let isUnPushed = true
  if (isInboard) {
    isUnPushed = newboard[vs.y][vs.x] === 9
  }
  return isInboard && isUnPushed
}

const checkDoPush = (vs: Values, newboard: number[][]): boolean => {
  const canPush = checkCanPush(vs, newboard)
  const isReached = checkReached(vs)
  return canPush && !isReached
}

const updateNewPosition = (vs: Values, newboard: number[][]) => {
  //訪れたことのないブロックの場合再帰処理

  const isNotZero = vs.value !== 0

  const doPush = checkDoPush(vs, newboard)

  if (doPush && isNotZero) {
    pushedBlockNum++
    newPositions.push(vs)
  }
  if (!doPush || isNotZero) {
    return
  }

  pushedBlockNum++
  newPositions.push(vs)

  updateNewPosition({ x: vs.x, y: vs.y + 1, value: calBom(vs.x, vs.y + 1, boms) }, newboard)
  updateNewPosition({ x: vs.x, y: vs.y - 1, value: calBom(vs.x, vs.y - 1, boms) }, newboard)
  updateNewPosition({ x: vs.x + 1, y: vs.y, value: calBom(vs.x + 1, vs.y, boms) }, newboard)
  updateNewPosition({ x: vs.x - 1, y: vs.y, value: calBom(vs.x - 1, vs.y, boms) }, newboard)
  updateNewPosition({ x: vs.x + 1, y: vs.y + 1, value: calBom(vs.x + 1, vs.y + 1, boms) }, newboard)
  updateNewPosition({ x: vs.x - 1, y: vs.y + 1, value: calBom(vs.x - 1, vs.y + 1, boms) }, newboard)
  updateNewPosition({ x: vs.x + 1, y: vs.y - 1, value: calBom(vs.x + 1, vs.y - 1, boms) }, newboard)
  updateNewPosition({ x: vs.x - 1, y: vs.y - 1, value: calBom(vs.x - 1, vs.y - 1, boms) }, newboard)
}
