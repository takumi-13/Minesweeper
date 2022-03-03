export const formatTime = (time: number | null) => {
  if (time === null) {
    return '-'
  } else {
    const min = Math.floor(time / 60)
    const res = min === 0 ? `${time}秒` : `${min}分${`00${time - min * 60}`.slice(-2)}秒`
    return res
  }
}

export const getInsertIndex = (
  activeTab: string,
  difficulty: string,
  previousResultList: (number | null)[],
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
  difficulty: string,
  insertIndex: number | null
): string => {
  return activeTab === difficulty ? getActiveResultMessage(insertIndex) : ''
}

export const getActiveResultMessage = (insertIndex: number | null): string => {
  return insertIndex === null
    ? `残念、ランキング圏外だ。\nランキング入賞を目指してみよう！`
    : insertIndex === 0
    ? `1位おめでとう！！！\n記録を更新したよ！！！`
    : `ランクインおめでとう！！！\n次は1位を目指そう！`
}
