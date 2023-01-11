export const getDaysUntilExpire = (date: number) => {
  return Math.floor((date - Date.now()) / 86400000)
}
