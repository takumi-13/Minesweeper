export const saveClearResult = (difficulty: string, time: number) => {
  //以前のクリアデータはソートされていないため、ソートして上位5つを取得する
  const localStorageData = getClearResultAsNumberList(difficulty).sort().slice(0, 5)
  //一番最初に最新の値が入る（表示時に既存の値と最新の値を区別するため）
  const localStorageDataWoDuplicate = localStorageData.filter((element) => element !== time)
  const resultLocalStorageData = [time, ...localStorageDataWoDuplicate]
  localStorage.setItem(difficulty, `${resultLocalStorageData}`)
}

export const getClearResultAsNumberList = (difficulty: string): number[] => {
  return getClearResultAsStringList(difficulty).map((value) => parseInt(value))
}

const getClearResultAsStringList = (difficulty: string): string[] => {
  return localStorage.getItem(difficulty)?.split(',') ?? ['9999', '9999', '9999', '9999', '9999']
}
