const defaultOptions = {
  slidesToShow: 1,
  slidesToScroll: 1,
  timeToScroll: 350,
  infinity: false,
  autoplay: false,
  autoplaySpeed: 3000,
  responsive: null,
}

export class SliderOptions {
  constructor(parentNode, userOptions) {
    this.$parent = document.querySelector(parentNode)
    this.childrens = this.getChildrens()
    this.userOptions = userOptions
    this.initOptions()
  }

  initOptions() {
    this.parentWidth = this.$parent.offsetWidth
    this.options = this.getOptions(this.userOptions)

    this.slideWidth = this.$parent.offsetWidth / this.options.slidesToShow
    this.sliderStep = this.slideWidth * this.options.slidesToScroll
    this.sliderLastStep =
      (this.childrens.length % this.options.slidesToScroll) * this.slideWidth
    this.initTranslateValues()
  }

  getOptions(userOptions) {
    if (userOptions.responsive) {
      const width = window.innerWidth
      let delta = Number.MAX_VALUE
      let result = null
      const responsive = userOptions.responsive
      Object.keys(responsive).forEach((key) => {
        if (key > width) {
          if (key - width < delta) {
            delta = key - width
            result = key
          }
        }
      })
      if (result) {
        return { ...defaultOptions, ...userOptions, ...responsive[result] }
      }
    }
    return { ...defaultOptions, ...userOptions }
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
  initTranslateValues() {
    if (this.options.infinity) {
      this.translateValue = -this.options.slidesToShow * this.slideWidth
    } else {
      this.translateValue = 0
    }
    this.translateValueMin = this.translateValue
    this.translateValueMax =
      this.translateValue -
      (this.childrens.length - this.options.slidesToShow) * this.slideWidth
  }
}
