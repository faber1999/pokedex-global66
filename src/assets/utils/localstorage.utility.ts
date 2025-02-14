export const getStorage = <T>(key: string, cbValue: T): T => {
  const value = localStorage.getItem(key)
  if (!value) return cbValue
  return JSON.parse(value)
}

export const setStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value))
}
