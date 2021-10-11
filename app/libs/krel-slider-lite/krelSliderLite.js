class LiteSlider {
  constructor(parentNode, userOptions = {}) {
    const options = {
      response: 991,
      isCont: false,
    }
    this.$parent = parentNode
    this.options = { ...options, ...userOptions }
    this.parentWidth = this.$parent.offsetWidth
    this.childrens = this.getChildrens()
    this.buttons = []
    this.draggable = {}
    this.childrensRenderArr = []
    this.slideWidth = this.childrens[0].offsetWidth
    this.init()
  }

  getChildrens() {
    const childrensObj = this.$parent.children
    const childrens = []
    Object.keys(childrensObj).forEach((key) => {
      if (key !== 'length') {
        childrens.push(childrensObj[key])
      }
    })
    return childrens
  }
  init() {
    this.initTranslateValue()
    this.render()
    this.renderButtons()

    if (window.innerWidth > this.options.response) {
      if (this.checkIsActive()) {
        this.initEventListeners()
      } else {
        document.querySelector('.krel-next').style.display = 'none'
      }
    } else {
      this.$parent.classList.add('krel-lite-mobile')
    }
    window.addEventListener('resize', this.resize.bind(this))
  }
  initTranslateValue() {
    this.translateValue = 0
    this.translateValueMin = 0
    if (this.options.isCont) {
      const fullVisibleSlide = Math.ceil(this.parentWidth / this.slideWidth)
      this.translateValueMax =
        -(this.childrens.length - fullVisibleSlide) * this.slideWidth
    } else {
      const widthOfVisibleDrag =
        (window.innerWidth - this.parentWidth) / 2 + this.parentWidth
      const fullVisibleSlide = Math.trunc(widthOfVisibleDrag / this.slideWidth)
      const delta = widthOfVisibleDrag - fullVisibleSlide * this.slideWidth
      const maxTranslate =
        -(this.childrens.length - fullVisibleSlide) * this.slideWidth

      this.translateValueMax = maxTranslate + delta + 3
    }
  }

  render() {
    this.$parent.classList.add('krel-lite-slider')
    this.$draggable = this.createElement('krel-lite-draggable')
    this.$krelTrack = this.createElement('krel-lite-track')

    if (this.options.isCont) {
      this.$draggable.classList.add('krel-lite-draggable-container')
    }

    this.childrens.forEach((el, index) => {
      const childrenCont = this.createElement('krel-slide')
      el.classList.add('krel-lite-slide')
      this.childrensRenderArr.push(el)
      this.$krelTrack.append(el)
    })

    this.$draggable.append(this.$krelTrack)
    this.$parent.append(this.$draggable)
  }
  checkIsActive() {
    return this.$draggable.offsetWidth >= this.$parent.offsetWidth
  }
  renderButtons() {
    const prevButton = this.createElement('krel-arrows krel-prev')
    prevButton.style.display = 'none'
    const nextButton = this.createElement('krel-arrows krel-next')
    this.$parent.prepend(prevButton)
    this.$parent.append(nextButton)
    this.buttons.push(prevButton, nextButton)
  }
  buttonsCheck() {
    if (this.translateValue === this.translateValueMax) {
      this.buttons[1].style.display = 'none'
    } else {
      this.buttons[1].style.display = null
    }
    if (this.translateValue === this.translateValueMin) {
      this.buttons[0].style.display = 'none'
    } else {
      this.buttons[0].style.display = null
    }
  }

  createElement(className, tag = 'div') {
    const element = document.createElement(tag)
    element.className = className
    return element
  }
  krelTrackTranslate(translate, time = null) {
    if (time) {
      this.$krelTrack.style.transition = `transform ${time}ms ease 0s`
      setTimeout(() => {
        this.$krelTrack.style.transition = null
        this.isDrag = false
      }, time)
    }
    this.$krelTrack.style.transform = `translate(${translate}px)`
  }

  initEventListeners() {
    this.onDraggebleStart = this.onDraggebleStart.bind(this)
    this.onDraggebleMove = this.onDraggebleMove.bind(this)
    this.onDraggebleEnd = this.onDraggebleEnd.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
    this.prevSlide = this.prevSlide.bind(this)

    this.buttons[1].addEventListener('click', this.nextSlide)
    this.buttons[0].addEventListener('click', this.prevSlide)
    this.$draggable.addEventListener('mousedown', this.onDraggebleStart)
    this.$draggable.addEventListener('touchstart', this.onDraggebleStart)
  }

  destroyEvent() {
    this.buttons[1].removeEventListener('click', this.nextSlide)
    this.buttons[0].removeEventListener('click', this.prevSlide)
    this.$draggable.removeEventListener('mousedown', this.onDraggebleStart)
    this.$draggable.removeEventListener('touchstart', this.onDraggebleStart)
  }
  resize(e) {
    const newSlideWidth = this.childrens[0].offsetWidth

    const isMobile = this.$parent.classList.contains('krel-lite-mobile')
    const condition =
      newSlideWidth !== this.slideWidth ||
      (isMobile && window.innerWidth > this.options.response) ||
      (!isMobile && window.innerWidth < this.options.response)
    if (condition) {
      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(() => {
        this.reload()
      }, 100)
    }
  }
  reload() {
    this.parentWidth = this.$parent.offsetWidth
    if (window.innerWidth > this.options.response) {
      this.initEventListeners()
      this.$parent.classList.remove('krel-lite-mobile')
    } else {
      this.destroyEvent()
      this.$parent.classList.add('krel-lite-mobile')
    }
    this.slideWidth = this.childrens[0].offsetWidth
    this.initTranslateValue()
    this.krelTrackTranslate(this.translateValue)
  }

  nextSlide() {
    this.move(this.translateValue - this.slideWidth)
  }
  prevSlide() {
    this.move(this.translateValue + this.slideWidth)
  }

  onDraggebleStart(e) {
    e.preventDefault()

    this.draggable.start = this.clientX(e)
    this.draggable.delta = 0

    this.$draggable.addEventListener('mousemove', this.onDraggebleMove)
    this.$draggable.addEventListener('touchmove', this.onDraggebleMove)
    document.addEventListener('mouseup', this.onDraggebleEnd)
    this.$draggable.addEventListener('touchend', this.onDraggebleEnd)
  }

  onDraggebleMove(e) {
    this.draggable.delta = +this.draggable.start - this.clientX(e)
    if (
      Math.abs(this.draggable.delta) > 10 &&
      !this.$parent.classList.contains('krel-lite-dragg')
    ) {
      this.$parent.classList.add('krel-lite-dragg')
    }
    this.krelTrackTranslate(this.translateValue - this.draggable.delta)
    e.preventDefault()
  }

  onDraggebleEnd(e) {
    e.preventDefault()

    this.$draggable.removeEventListener('mousemove', this.onDraggebleMove)
    this.$draggable.removeEventListener('touchmove', this.onDraggebleMove)
    document.removeEventListener('mouseup', this.onDraggebleEnd)
    this.$draggable.removeEventListener('touchend', this.onDraggebleEnd)

    const translate = this.translateValue - this.draggable.delta

    this.move(translate)
    this.$parent.classList.remove('krel-lite-dragg')
  }

  clientX(e) {
    if (e.targetTouches && e.targetTouches.length >= 0.8) {
      return e.targetTouches[0].clientX
    }
    // mouse event
    return e.clientX
  }
  move(newTranslate, direction = null) {
    if (!this.isDrag) {
      this.isDrag = true
      const slideNumber = Math.floor(newTranslate / this.slideWidth)
      let translate = slideNumber * this.slideWidth

      if (translate < this.translateValueMax) {
        translate = this.translateValueMax
      }
      if (translate > this.translateValueMin) {
        translate = this.translateValueMin
      }

      this.translateValue = translate
      this.buttonsCheck()
      this.krelTrackTranslate(translate, 300)
    }
  }
}

export function liteSlider(selector, options) {
  const node = document.querySelector(selector)
  if (node) {
    new LiteSlider(node, options)
  }
}
