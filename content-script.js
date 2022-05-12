async function init() {
  if (!isRepoPage()) return

  console.log('[GitHub1s] init')
  const options = await chrome.storage.sync.get()
  observeElement(options)
  document.addEventListener('pjax:end', () => observeElement(options))
}

async function createElement(options) {
  const refNode = document.querySelector('#repo-content-pjax-container [data-hotkey="t"]')
  if (!refNode || document.querySelector('.gh1s-btn'))
    return

  const { title, icon, type, newTab } = options
  const url = window.location.href.replace('https://github.com/', 'https://github1s.com/')
  const el = `
    <a class="gh1s-btn btn mr-2" href="${url}" target="${newTab ? '_blank' : '_self'}">
      ${type === 'text' ? title : icon}
    </a>
  `
  refNode.insertAdjacentHTML('beforebegin', el)
}

function observeElement(options) {
  createElement(options)
  const target = document.querySelector('#repo-content-pjax-container .file-navigation')
  if (!target) return
  new MutationObserver((_, observer) => {
    createElement(options)
    observer.disconnect()
  }).observe(target, { childList: true })
}

function isRepoPage() {
  return document.body.contains(document.querySelector('#repo-content-pjax-container'))
}

init()
