//sizeX:行,sizeY:列
export const makeFirstBoard = (sizeX: number, sizeY: number): number[][] => {
  const res = [...Array(sizeX)].map(() => Array(sizeY).fill(9))
  return res
}
