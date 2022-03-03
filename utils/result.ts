import { extractResultTop5ASC } from './highscoreModal'

export const saveClearResult = (difficulty: string, time: number) => {
  //以前のクリアデータはソートされていないため、ソートして上位5つを取得する
  const localStorageDataNotNull = extractResultTop5ASC(getClearResultAsNumberList(difficulty)).map(
    (elem) => (elem === null ? NaN : elem)
  )
  //一番最初に最新の値が入る（表示時に既存の値と最新の値を区別するため）
  const localStorageDataNoDuplicate: (number | null)[] = localStorageDataNotNull
    .filter((element) => element !== time)
    .map((elem) => (isNaN(elem) ? null : elem))
  const resultLocalStorageData = [time, ...localStorageDataNoDuplicate]
  localStorage.setItem(difficulty, `${resultLocalStorageData}`)
}

export const getClearResultAsNumberList = (difficulty: string): (number | null)[] => {
  return (
    localStorage
      .getItem(difficulty)
      ?.split(',')
      .map((value) => (value === '' ? null : parseInt(value))) ?? [null, null, null, null, null]
  )
}
