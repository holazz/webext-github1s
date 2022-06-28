import Button from './views/Button.vue'

function isRepoPage() {
  return document.body.contains(
    document.querySelector('#js-repo-pjax-container'),
  )
}

async function init() {
  // eslint-disable-next-line no-console
  import.meta.env.DEV && console.log('[GitHub1s] init')

  const observer = new MutationObserver(() => {
    if (document.querySelector('#gh1s-btn')) return
    createElement()
  })
  observer.observe(document, {
    childList: true,
    subtree: true,
  })
}

async function createElement() {
  // [.d-none .d-md-block] didn't exist when not login
  const refNode = document.querySelector(
    '#js-repo-pjax-container a.btn[data-hotkey="t"]',
  )
  if (!refNode) return

  const url = window.location.href.replace(
    'https://github.com/',
    'https://github1s.com/',
  )
  const classList = refNode.classList.contains('ml-2') ? 'btn ml-2' : 'btn mr-2'
  const wrapper = document.createElement('div')
  const instance = createApp(Button, {
    url,
    classList,
  }).mount(wrapper)
  refNode.insertAdjacentElement('beforebegin', instance.$el)
}

isRepoPage() && init()
