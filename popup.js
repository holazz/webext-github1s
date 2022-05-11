async function setOptions() {
  const type = form.type.value
  const newTab = form.newTab.checked

  await chrome.storage.sync.set({ type, newTab })
}

async function init() {
  const { type, newTab } = await chrome.storage.sync.get()
  form.type.value = type
  form.newTab.checked = newTab
}

document.addEventListener('DOMContentLoaded', init)
form.addEventListener('change', setOptions)
