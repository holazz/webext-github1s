chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'go-to-github1s') {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    const { newTab } = await chrome.storage.sync.get()
    const url = tab.url.replace('https://github.com/', 'https://github1s.com/')
    newTab ? chrome.tabs.create({ url }) : chrome.tabs.update(tab.id, { url })
  }
})
