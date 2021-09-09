export function krelPopup(node, o = {}) {
  const popup = new KrelPopup(node, o)
  popup.init()
  return popup
}

class KrelPopup {
  constructor(node, userOptions) {
    const options = {
      anim: false /* 'top', '3d' */,
      delay: 400,
    }
    this.options = { ...options, ...userOptions }
    this.$nodes = document.querySelectorAll(node)
    this.popupContents = {}
    this.CurrentContent = {}
  }

  init() {
    this.initPopupBtnAndContent()
    this.initPopupWrap()
    this.initBtnClose()
  }

  initPopupBtnAndContent() {
    this.$nodes.forEach((btn) => {
      const contentNodeName = btn.getAttribute('href')
      const $content = document.querySelector(contentNodeName)
      $content.classList.add('krel-popup-content')
      $content.style.display = 'none'
      this.popupContents[contentNodeName] = $content

      if (this.options.anim) {
        $content.style.transition = `transform  ${this.options.delay}ms`
      }

      btn.addEventListener('click', this.open.bind(this))
    })
  }
  initPopupWrap() {
    this.$wrap = this.createElement('krel-popup-wrap')
    this.$container = this.createElement('krel-popup-container')
    this.$wrap.append(this.$container)
    if (this.options.anim) {
      this.$container.classList.add(`krel-popup-anim-${this.options.anim}`)
    }
    this.$wrap.addEventListener('mousedown', this.onWrapClick.bind(this))
  }
  initBtnClose() {
    this.$btn = this.createElement('krel-popup-btn-close')
    this.$btn.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="17.3076" y="19.9998" width="24.4765" height="3.80745" rx="1.90372" transform="rotate(-135 17.3076 19.9998)" fill="black"/><rect y="17.3075" width="24.4765" height="3.80745" rx="1.90372" transform="rotate(-45 0 17.3075)" fill="black"/></svg>'

    this.$btn.addEventListener('click', this.close.bind(this))
  }

  createElement(className, tag = 'div') {
    const element = document.createElement(tag)
    element.classList.add(className)
    return element
  }

  open(e) {
    e.preventDefault()
    this.CurrentContent.node = this.popupContents[e.target.getAttribute('href')]
    this.CurrentContent.node.prepend(this.$btn)
    this.CurrentContent.node.style.display = null

    this.CurrentContent.location =
      this.CurrentContent.node.previousElementSibling
    this.$container.append(this.CurrentContent.node)
    document.body.append(this.$wrap)
    if (this.options.anim) {
      setTimeout(() => {
        this.CurrentContent.node.style.transform =
          this.options.anim === '3d' ? 'rotateY(0)' : 'translateY(0)'
      }, 0)
    }
    this.onKeydown = this.onKeydown.bind(this)
    document.body.addEventListener('keydown', this.onKeydown)
    document.body.style.overflowY = 'hidden'
  }

  close(e) {
    let delay = 0
    if (this.options.anim) {
      this.CurrentContent.node.style.transform = null
      delay = this.options.delay
    }
    setTimeout(() => {
      this.CurrentContent.node.style.display = 'none'

      this.CurrentContent.location.insertAdjacentElement(
        'afterend',
        this.CurrentContent.node
      )
      this.CurrentContent = {}
      this.$wrap.remove()
      this.$btn.remove()
      document.body.removeEventListener('keydown', this.onKeydown)
      document.body.style.overflowY = null
    }, delay)
  }
  onKeydown(e) {
    if (e.keyCode === 27) {
      this.close()
    }
  }
  onWrapClick(e) {
    if (!e.target.closest('.krel-popup-content')) {
      this.close()
    }
  }
}
