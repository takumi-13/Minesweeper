import { Difficulty, LocalStorageDataList } from '../types/type'

export const formatTime = (time: number | null) => {
  if (time === null) {
    return '-'
  } else {
    const min = Math.floor(time / 60)
    const res = min === 0 ? `${time}秒` : `${min}分${`00${time - min * 60}`.slice(-2)}秒`
    return res
  }
}

export const getCurrentIndex = (
  previousResultList: LocalStorageDataList,
  currentResult: number
): number => {
  const previousResultListNotNull: number[] = previousResultList.map((elem) =>
    elem === null ? Number.MAX_SAFE_INTEGER : elem
  )
  const index = previousResultListNotNull.findIndex((element) => element >= currentResult)
  return index
}

export const getResultMessage = (
  activeTab: string,
  difficulty: Difficulty,
  currentIndex: number
): string => {
  return activeTab === difficulty ? getActiveResultMessage(currentIndex) : ''
}

export const getActiveResultMessage = (currentIndex: number): string => {
  return currentIndex === -1
    ? `残念、ランキング圏外だ。\nランキング入賞を目指してみよう！`
    : currentIndex === 0
    ? `1位おめでとう！！！\n記録を更新したよ！！！`
    : `ランクインおめでとう！！！\n次は1位を目指そう！`
}
