import { SliderOptions } from './base/slider/SliderOptions'

class KrelSlider extends SliderOptions {
  constructor(parentNode, userOptions) {
    super(parentNode, userOptions)
    this.elementOfcontrols = []
    this.childrensRenderArr = null
    this.current = {}
    this.currentSlide = []
    this.dots = null
    this.$draggable
    this.draggable = {}
    this.$krelTrack
  }

  init() {
    this.render()
    this.initStepInsruction()
    this.setCurrentSlide()
    this.renderButtons()
    this.renderDots()
    if (this.options.autoplay) {
      this.autoSlideInit()
    }
    window.addEventListener('resize', this.resizeWindow.bind(this))

    this.initEventListeners()
  }

  render() {
    this.$parent.classList.add('krel-slider')
    this.$draggable = this.createElement('krel-draggable')
    this.$krelTrack = this.createElement('krel-track')
    const childrenCount = this.childrens.length
    const slidesToShow = this.options.slidesToShow

    const childrenPrevArr = []
    const childrenRenderArr = []
    const childrenAfterArr = []

    this.childrens.forEach((el, index) => {
      const childrenCont = this.createElement('krel-slide')
      childrenCont.style.width = `${this.slideWidth}px`
      childrenCont.append(el)
      childrenCont.dataset.id = index
      childrenRenderArr.push(childrenCont)
      if (this.options.infinity) {
        const childrenCloned = childrenCont.cloneNode(true)
        childrenCloned.classList.add('krel-cloned')
        childrenAfterArr.push(childrenCloned)
      }
    })
    this.childrensRenderArr = childrenRenderArr

    const render = [
      ...childrenPrevArr,
      ...childrenRenderArr,
      ...childrenAfterArr,
    ]
    this.allSlides = render

    render.forEach((children) => {
      this.$krelTrack.append(children)
    })

    if (this.options.infinity) {
      this.renderChildrensPrevArr()
    }

    this.setKrelTrackWidth()
    this.krelTrackTranslate(this.translateValue)
    this.$draggable.append(this.$krelTrack)
    this.$parent.append(this.$draggable)
    this.stopAutoplay(this.$draggable)
  }

  renderChildrensPrevArr() {
    let isRender = null
    let startFor
    if (!this.childrensPrevArr) {
      isRender = true
      this.childrensPrevArr = []
      startFor = 0
    } else {
      if (this.childrensPrevArr.length < this.options.slidesToShow) {
        isRender = true
        startFor = this.childrensPrevArr.length
      } else if (this.childrensPrevArr.length > this.options.slidesToShow) {
        const endFor = this.childrensPrevArr.length - this.options.slidesToShow
        for (let i = 0; i < endFor; i++) {
          this.childrensPrevArr[this.childrensPrevArr.length - 1].remove()
          this.childrensPrevArr.pop()
        }
      }
    }
    if (isRender) {
      for (let i = startFor; i < this.options.slidesToShow; i++) {
        const clone =
          this.childrensRenderArr[this.childrens.length - i - 1].cloneNode(true)
        clone.classList.add('krel-cloned')
        clone.dataset.id = -(i + 1)
        this.$krelTrack.prepend(clone)
        this.childrensPrevArr.push(clone)
      }
    }
  }

  renderButtons() {
    const prevButton = this.createElement('krel-arrows krel-prev')
    const nextButton = this.createElement('krel-arrows krel-next')
    this.stopAutoplay(prevButton)
    this.stopAutoplay(nextButton)

    prevButton.addEventListener('click', this.prevSlide.bind(this))
    nextButton.addEventListener('click', this.nextSlide.bind(this))

    this.$parent.prepend(prevButton)
    this.$parent.append(nextButton)
    this.elementOfcontrols.push(prevButton, nextButton)
  }

  renderDots() {
    let dots
    if (!this.dots) {
      dots = this.createElement('krel-dots')
      this.dots = {}
      this.dots.node = dots
    } else {
      dots = this.dots.node
      this.dots.list.forEach((el) => el.remove())
    }
    let dotsQuantity = Math.ceil(
      this.childrensRenderArr.length / this.options.slidesToScroll
    )
    dotsQuantity = Math.ceil(dotsQuantity)
    this.dots.list = []
    for (let i = 0; i < dotsQuantity; i++) {
      const dote = this.createElement('krel-dote')
      this.dots.list.push(dote)
      dote.dataset.id = i + 1
      if (i === 0) {
        dote.classList.add('krel-dots-active')
      }
      dote.onclick = (e) => {
        const id = +dote.dataset.id
        this.stepInsruction.number = id
        this.moveTo(id)
      }
      dots.append(dote)
    }
    this.current.dot = 0
    this.$parent.append(dots)
  }

  reload() {
    this.initOptions()
    if (this.options.infinity) {
      this.renderChildrensPrevArr()
      this.childrensPrevArr.forEach(
        (el) => (el.style.width = this.slideWidth + 'px')
      )
    }
    this.allSlides.forEach((el) => (el.style.width = this.slideWidth + 'px'))

    this.setKrelTrackWidth()
    this.initStepInsruction()
    this.renderDots()
    this.moveTo(this.stepInsruction.number, 0)
  }

  setKrelTrackWidth() {
    const slidesCont = this.options.infinity
      ? this.childrens.length * 2 + this.options.slidesToShow
      : this.childrens.length
    this.$krelTrack.style.width = `${this.slideWidth * slidesCont}px`
  }

  createElement(className, tag = 'div') {
    const element = document.createElement(tag)
    element.className = className
    return element
  }

  krelTrackTranslate(translate) {
    this.$krelTrack.style.transform = `translate(${translate}px)`
  }

  // ............................................. //

  initEventListeners() {
    this.onDraggebleStart = this.onDraggebleStart.bind(this)
    this.onDraggebleMove = this.onDraggebleMove.bind(this)
    this.onDraggebleEnd = this.onDraggebleEnd.bind(this)

    this.$draggable.addEventListener('mousedown', this.onDraggebleStart)
    this.$draggable.addEventListener('touchstart', this.onDraggebleStart)
  }

  stopAutoplay(element) {
    element.onmouseover = () => {
      if (this.autoSlide) {
        this.autoSlideStop()
        element.onmouseout = () => {
          this.autoSlideInit()
          element.onmouseout = null
        }
      }
    }
  }
  resizeWindow(e) {
    const newContWidth = this.$parent.offsetWidth
    if (newContWidth !== this.parentWidth) {
      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(() => {
        this.reload()
      }, 100)
    }
  }
  autoSlideInit() {
    this.autoSlide = setInterval(() => {
      this.nextSlide()
    }, this.options.autoplaySpeed)
  }
  autoSlideStop() {
    clearInterval(this.autoSlide)
    this.autoSlide = null
  }

  onDraggebleStart(e) {
    e.preventDefault()
    this.draggable.start = this.clientX(e)

    document.addEventListener('mousemove', this.onDraggebleMove)
    document.addEventListener('touchmove', this.onDraggebleMove)
    document.addEventListener('mouseup', this.onDraggebleEnd)
    document.addEventListener('touchend', this.onDraggebleEnd)
  }

  onDraggebleMove(e) {
    this.draggable.delta = +this.draggable.start - this.clientX(e)
    this.krelTrackTranslate(this.translateValue - this.draggable.delta)
    e.preventDefault()
  }

  onDraggebleEnd(e) {
    e.preventDefault()

    document.removeEventListener('mousemove', this.onDraggebleMove)
    document.removeEventListener('touchmove', this.onDraggebleMove)
    document.removeEventListener('mouseup', this.onDraggebleEnd)
    document.removeEventListener('touchend', this.onDraggebleEnd)

    if (Math.abs(this.draggable.delta) > this.slideWidth / 4) {
      if (this.draggable.delta > 0) {
        this.nextSlide()
      } else {
        this.prevSlide()
      }
      return
    }
    this.moveTo(this.stepInsruction.number)
  }

  clientX(e) {
    if (e.targetTouches) {
      return e.targetTouches[0].clientX
    }
    // mouse event
    return e.clientX
  }

  nextSlide() {
    this.moveSlide('next')
  }
  prevSlide() {
    this.moveSlide('prev')
  }

  setCurrentSlide() {
    if (this.current.slide) {
      this.allSlides[this.current.slide[0]].classList.remove('current-slide')
      this.current.slide.forEach((index) => {
        this.allSlides[index].classList.remove('active-slide')
      })
    }
    this.current.slide = this.stepInsruction.map[this.stepInsruction.number]
    this.allSlides[this.current.slide[0]].classList.add('current-slide')
    this.current.slide.forEach((index) => {
      this.allSlides[index].classList.add('active-slide')
    })
  }

  setCurrentDots(number) {
    this.dots.list[this.current.dot].classList.remove('krel-dots-active')
    this.dots.list[number - 1].classList.add('krel-dots-active')
    this.current.dot = number - 1
  }

  fantomMove(direction) {
    const translate = 40
    const time = this.options.timeToScroll / 2
    let newTranslate
    if (direction === 'next') {
      newTranslate = this.translateValue - translate
    } else if (direction === 'prev') {
      newTranslate = this.translateValue + translate
    }
    this.$krelTrack.style.transition = `transform ${time}ms ease 0s`
    this.krelTrackTranslate(newTranslate)
    setTimeout(() => {
      this.krelTrackTranslate(this.translateValue)
      setTimeout(() => {
        this.$krelTrack.style.transition = null
      }, time)
    }, time)
  }

  initStepInsruction() {
    let currentNumber
    let curentSlide = 0
    if (this.stepInsruction) {
      curentSlide = this.stepInsruction.map[this.stepInsruction.number][0]
    }
    console.log(curentSlide)
    const stepInsructionArray = []
    const prevArr = []
    const afterArr = []
    const countOfTrueStep = Math.ceil(
      this.childrensRenderArr.length / this.options.slidesToScroll
    )

    for (let i = 0; i < countOfTrueStep; i++) {
      const slidesOfStep = []
      let firstSlideOfStep = i * this.options.slidesToScroll

      if (
        firstSlideOfStep + this.options.slidesToScroll >
        this.childrensRenderArr.length
      ) {
        firstSlideOfStep =
          this.childrensRenderArr.length - this.options.slidesToScroll
      }
      for (let j = 0; j < this.options.slidesToShow; j++) {
        slidesOfStep.push(j + firstSlideOfStep)
      }
      stepInsructionArray.push(slidesOfStep)
      if (slidesOfStep.includes(curentSlide)) {
        currentNumber = i + 1
      }
    }

    const lastOfTrueStepArr =
      stepInsructionArray[stepInsructionArray.length - 1]
    for (let i = 0; i < this.options.slidesToScroll; i++) {
      prevArr.push(i - this.options.slidesToScroll)
      afterArr.push(lastOfTrueStepArr[0] + this.options.slidesToScroll + i)
    }

    stepInsructionArray.unshift(prevArr)
    stepInsructionArray.push(afterArr)

    this.stepInsruction = {
      map: stepInsructionArray,
      number: currentNumber,
    }
  }
  moveSlide(direction) {
    if (!this.options.infinity) {
      if (
        (this.translateValue === this.translateValueMin &&
          direction === 'prev') ||
        (this.translateValue <= this.translateValueMax && direction === 'next')
      ) {
        this.fantomMove(direction)
        return
      }
    }

    if (!this.isMoveSLide) {
      this.isMoveSLide = true

      if (direction === 'next') {
        this.stepInsruction.number = this.stepInsruction.number + 1
        this.moveTo(this.stepInsruction.number)
      } else if (direction === 'prev') {
        this.stepInsruction.number = this.stepInsruction.number - 1
        this.moveTo(this.stepInsruction.number)
      }
    }
  }
  moveTo(slideNumber, time = this.options.timeToScroll) {
    let borderValue = null
    this.$krelTrack.style.transition = `transform ${time}ms ease 0s`
    this.translateValue =
      this.translateValueMin -
      this.stepInsruction.map[slideNumber][0] * this.slideWidth
    this.krelTrackTranslate(this.translateValue)

    if (this.options.infinity) {
      if (slideNumber === this.stepInsruction.map.length - 1) {
        borderValue = 1
      } else if (slideNumber === 0) {
        borderValue = this.stepInsruction.map.length - 2
      }
      if (borderValue !== null) {
        this.stepInsruction.number = borderValue
        this.translateValue =
          this.translateValueMin -
          this.stepInsruction.map[borderValue][0] * this.slideWidth
      }
    }
    this.setCurrentDots(this.stepInsruction.number)

    setTimeout(() => {
      this.$krelTrack.style.transition = null

      if (this.options.infinity) {
        this.krelTrackTranslate(this.translateValue)
      }
      this.setCurrentSlide()
      this.isMoveSLide = false
    }, time)
  }
}
export function krelSlider(parentNode, userOptions = {}) {
  const slider = new KrelSlider(parentNode, userOptions)
  slider.init()
  return slider
}
