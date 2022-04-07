import { LocalStorageDataList, ManageLocalStorageData } from '../types/type'

export const saveClearResult = (difficulty: string, time: number) => {
  const clearResult = concatResultTop5ASC(getClearResultAsNumberList(difficulty))
  const clearResultDataNotDuplicate = clearResult.filter((element) => element !== time)
  const resultLocalStorageData: ManageLocalStorageData = {
    currentResult: time,
    previousResult: clearResultDataNotDuplicate,
  }

  localStorage.setItem(difficulty, JSON.stringify(resultLocalStorageData))
}

export const getClearResultAsNumberList = (difficulty: string): ManageLocalStorageData => {
  const localStorageData =
    localStorage.getItem(difficulty) ??
    '{"currentResult":0,"previousResult":[null,null,null,null,null]}'
  const manageLocalStorageData: ManageLocalStorageData = {
    currentResult: JSON.parse(localStorageData).currentResult,
    previousResult: JSON.parse(localStorageData).previousResult,
  }
  return manageLocalStorageData
}

export const concatResultTop5ASC = (result: ManageLocalStorageData): LocalStorageDataList => {
  const compareNumber = (n1: number, n2: number) => n1 - n2
  return [result.currentResult, ...result.previousResult]
    .map((elm) => (elm === null ? Number.MAX_SAFE_INTEGER : elm))
    .sort(compareNumber)
    .map((elm) => (elm === Number.MAX_SAFE_INTEGER ? null : elm))
    .slice(0, 5)
}
