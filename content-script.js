function isRepoPage() {
  return document.body.contains(document.querySelector('#repo-content-pjax-container'))
}

async function createElement(options) {
  const refNode = document.querySelector('#repo-content-pjax-container a.btn.d-none.d-md-block[data-hotkey="t"]')
  if (!refNode) return

  const { title, icon, type, newTab } = options
  const classList = refNode.classList.contains('ml-2') ? 'btn ml-2' : 'btn mr-2'
  const url = window.location.href.replace('https://github.com/', 'https://github1s.com/')
  const el = `
    <a id="gh1s-btn" class="${classList}" href="${url}" target="${newTab ? '_blank' : '_self'}">
      ${type === 'text' ? title : icon}
    </a>
  `
  refNode.insertAdjacentHTML('beforebegin', el)
}

async function init() {
  console.log('[GitHub1s] init')

  const config = await chrome.storage.sync.get()
  const observer = new MutationObserver(
    () => (!document.querySelector('#gh1s-btn')) && createElement(config)
  )
  observer.observe(
    document.querySelector('#repo-content-pjax-container'),
    {
      childList: true,
      subtree: true,
    }
  )
}

isRepoPage() && init()
