export interface Config {
  type: 'text' | 'icon'
  hotkey: string
  newTab: boolean
}

export const CONFIG_KEY = 'config'

export const defaultConfig: Config = {
  type: 'icon',
  hotkey: ',',
  newTab: true,
}

export function useConfig(key = CONFIG_KEY, initialValue = defaultConfig) {
  const getConfig = async () =>
    (await chrome.storage.sync.get(key))[key] ?? initialValue

  const setConfig = async (value: Config) =>
    chrome.storage.sync.set({ [key]: unref(value) })

  const watchConfig = (fn: (value: Config) => void) =>
    chrome.storage.onChanged.addListener(changes => {
      if (!changes[key]) return
      fn(changes[key].newValue)
    })
  return {
    getConfig,
    setConfig,
    watchConfig,
  }
}
