import { Difficulty, LocalStorageDataList, ManageLocalStorageData } from '../types/type'

export const saveCompletedResult = (difficulty: Difficulty, time: number) => {
  const completedResult = concatResultTop5ASC(getCompletedResult(difficulty))
  const completedResultDataNotDuplicate = completedResult.filter((element) => element !== time)
  const resultLocalStorageData: ManageLocalStorageData = {
    currentResult: time,
    previousResult: completedResultDataNotDuplicate,
  }
  localStorage.setItem(difficulty, JSON.stringify(resultLocalStorageData))
}

export const getCompletedResult = (difficulty: Difficulty): ManageLocalStorageData => {
  const localStorageText = localStorage.getItem(difficulty)
  const localStorageData: ManageLocalStorageData = localStorageText
    ? JSON.parse(localStorageText)
    : { currentResult: -1, previousResult: [null, null, null, null, null] }
  return localStorageData
}

export const concatResultTop5ASC = (result: ManageLocalStorageData): LocalStorageDataList => {
  const compareNumber = (n1: number, n2: number) => n1 - n2
  const currentResult: number | null = result.currentResult === -1 ? null : result.currentResult
  return [currentResult, ...result.previousResult]
    .map((elm) => (elm === null ? Number.MAX_SAFE_INTEGER : elm))
    .sort(compareNumber)
    .map((elm) => (elm === Number.MAX_SAFE_INTEGER ? null : elm))
    .slice(0, 5)
}
