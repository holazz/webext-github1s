import { defaultConfig } from './config.js'

document.addEventListener('DOMContentLoaded', async () => {
  const { type, hotkey, newTab } = { ...defaultConfig, ...await chrome.storage.sync.get() }
  form.type.value = type
  form.hotkey.value = hotkey
  form.newTab.checked = newTab
})

form.addEventListener('change', async () => {
  const type = form.type.value
  const hotkey = form.hotkey.value
  const newTab = form.newTab.checked

  await chrome.storage.sync.set({ ...defaultConfig, type, hotkey, newTab })
})
