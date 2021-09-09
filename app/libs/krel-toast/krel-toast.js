class KrelToast {
  constructor() {
    this.init()
  }
  init() {
    this.dragToast = {}
    this.onDragStart = this.onDragStart.bind(this)

    this.onDragMove = this.onDragMove.bind(this)

    this.onDragEnd = this.onDragEnd.bind(this)

    this.$wrapper = document.createElement('div')
    this.$wrapper.classList.add('krel-toast-wrapper')

    this.$wrapper.addEventListener('mousedown', this.onDragStart)
    this.$wrapper.addEventListener('touchstart', this.onDragStart)
  }
  toast(text, type = '') {
    if (!this.$wrapper.children.length) {
      document.body.append(this.$wrapper)
    }
    const toast = document.createElement('div')

    toast.classList.add('krel-toast')
    if (type) {
      toast.classList.add(`krel-toast-${type}`)
    }
    toast.innerHTML = text
    toast.style.marginTop = '30px'
    this.$wrapper.append(toast)

    setTimeout(() => {
      toast.style.marginTop = '0'
    }, 0)
    toast.dataset.id = this.closeTimeOut(toast)
  }
  error(text) {
    this.toast(text, 'error')
  }
  success(text) {
    this.toast(text, 'success')
  }

  onDragStart(e) {
    e.preventDefault()
    if (e.target && e.target.closest('.krel-toast')) {
      clearTimeout(e.target.dataset.id)
      this.dragToast.node = e.target
      this.dragToast.startX = this.clientX(e)
      this.dragToast.width = e.target.offsetWidth
      this.dragToast.xPos = this.clientX(e)

      this.dragToast.time = Date.now()
      this.dragToast.node.style.transition = '0s'
      document.addEventListener('mousemove', this.onDragMove)
      document.addEventListener('mouseup', this.onDragEnd)
      document.addEventListener('touchmove', this.onDragMove)
      document.addEventListener('touchend', this.onDragEnd)
    }
  }

  onDragMove(e) {
    this.dragToast.delta = this.clientX(e) - this.dragToast.startX
    this.dragToast.xPos = this.dragToast.velocityX =
      Math.abs(this.dragToast.xPos - this.clientX(e)) /
      (Date.now() - this.dragToast.time)
    this.dragToast.time = Date.now()
    this.dragToast.xPos = this.clientX(e)

    this.dragToast.node.style.transform = `translate(${this.dragToast.delta}px)`
    this.dragToast.node.style.opacity =
      1 - Math.abs(this.dragToast.delta / (this.dragToast.width * 0.6))
  }

  onDragEnd(e) {
    e.preventDefault()
    console.log()
    if (
      Math.abs(this.dragToast.delta) > this.dragToast.width * 0.6 ||
      this.dragToast.velocityX > 1
    ) {
      const toast = this.dragToast.node
      toast.style.transition = 'height 0.2s,  padding 0.2s, margin 0.2s'
      toast.style.opacity = 0
      toast.style.height = 0
      toast.style.margin = 0
      toast.style.padding = 0

      setTimeout(() => {
        toast.remove()
      }, 300)
    } else {
      this.dragToast.node.style.transform = null
      this.dragToast.node.style.opacity = null
      this.dragToast.node.style.transition = null

      this.dragToast.node.dataset.id = this.closeTimeOut(this.dragToast.node)
    }

    this.dragToast = {}
    document.removeEventListener('mousemove', this.onDragMove)
    document.removeEventListener('mouseup', this.onDragEnd)
    document.removeEventListener('touchmove', this.onDragMove)
    document.removeEventListener('touchend', this.onDragEnd)
  }

  closeTimeOut(toast) {
    return setTimeout(() => {
      toast.style.marginTop = '-20px'
      toast.style.opacity = '0'
      setTimeout(() => {
        toast.remove()
        if (!this.$wrapper.children.length) {
          this.$wrapper.remove()
        }
      }, 500)
    }, 5000)
  }
  clientX(e) {
    if (e.targetTouches && e.targetTouches.length >= 0.8) {
      return e.targetTouches[0].clientX
    }
    // mouse event
    return e.clientX
  }
}
export const krelToast = new KrelToast()
