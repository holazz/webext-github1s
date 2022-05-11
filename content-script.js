const defaultOptions = {
  title: 'GitHub1s',
  icon: '<svg  aria-hidden="true" role="img" class="octicon" viewBox="0 0 400 400" width="16" height="16" fill="currentColor"><g><path stroke="none" fill-rule="evenodd" d="M35.587 25.574 C 26.887 34.274,22.366 85.319,28.408 106.640 C 29.808 111.581,30.362 115.990,29.639 116.436 C 22.375 120.926,6.586 153.361,2.311 172.577 C -1.702 190.614,-0.380 242.019,4.623 262.483 C 23.337 339.024,75.772 372.234,183.814 375.971 C 333.315 381.142,400.042 329.514,399.989 208.709 C 399.973 171.788,393.448 148.895,375.953 124.378 L 369.021 114.663 371.179 105.378 C 378.038 75.873,372.074 26.678,361.310 23.977 C 349.211 20.940,315.376 33.668,289.736 50.901 L 277.128 59.375 269.292 57.047 C 230.073 45.401,175.046 45.086,133.396 56.269 L 122.262 59.259 109.633 50.951 C 77.787 29.999,43.062 18.098,35.587 25.574 M199.219 174.024 C 215.547 173.970,243.672 173.640,261.719 173.291 C 297.764 172.594,302.347 173.496,314.439 183.671 C 360.164 222.146,353.423 307.996,302.675 333.490 C 257.998 355.934,129.596 354.142,90.730 330.533 C 37.291 298.070,45.173 192.813,102.426 174.343 C 108.963 172.234,114.738 172.025,139.844 172.986 C 156.172 173.611,182.891 174.078,199.219 174.024 M115.787 201.123 C 100.709 208.550,93.908 238.122,102.705 258.007 C 117.257 290.906,150.790 276.028,150.686 236.719 C 150.615 210.124,133.322 192.485,115.787 201.123 M265.858 201.088 C 262.979 202.507,258.887 206.290,256.767 209.495 C 233.925 244.011,263.236 295.935,289.886 268.166 C 314.409 242.614,294.482 186.985,265.858 201.088 M176.563 301.563 C 164.758 313.367,192.597 331.661,210.156 323.639 C 224.183 317.230,229.788 307.913,223.438 301.563 C 219.132 297.257,215.495 297.640,208.594 303.125 C 205.350 305.703,201.482 307.813,200.000 307.813 C 198.518 307.813,194.650 305.703,191.406 303.125 C 184.505 297.640,180.868 297.257,176.563 301.563"></path></g></svg>',
  type: 'text',
  newTab: true,
}

class GitHub1s {
  constructor() {
    this.el = null
  }

  async init() {
    console.log('[GitHub1s] init')
    const { title } = await chrome.storage.sync.get()
    !title && await chrome.storage.sync.set(defaultOptions)

    this.observeElement()
    document.addEventListener('pjax:end', () => this.observeElement())
  }

  async createElement() {
    const refNode = document.querySelector('#repo-content-pjax-container [data-hotkey="t"]')
    const parentNode = refNode?.parentNode
    if (!parentNode || document.querySelector('.gh1s-btn'))
      return

    if (!this.el) {
      this.el = document.createElement('div')
      this.el.classList = 'd-flex flex-auto justify-end'
      const inner = document.createElement('a')
      inner.classList = 'gh1s-btn btn mr-2'
      inner.href = window.location.href.replace('https://github.com/', 'https://github1s.com/')
      this.el.appendChild(inner)
    }

    const { type, newTab, title, icon } = await chrome.storage.sync.get()
    this.el.querySelector('.gh1s-btn').innerHTML = type === 'text' ? title : icon
    this.el.querySelector('.gh1s-btn').target = newTab ? '_blank' : '_self'

    parentNode.insertBefore(this.el, refNode)
  }

  observeElement() {
    this.createElement()
    const target = document.querySelector('#repo-content-pjax-container .file-navigation')
    if (!target) return
    new MutationObserver((_, observer) => {
      this.createElement()
      observer.disconnect()
    }).observe(target, { childList: true })
  }
}

function isRepoPage() {
  return document.body.contains(document.querySelector('#repo-content-pjax-container'))
}

isRepoPage() && new GitHub1s().init()
