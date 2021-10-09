export class KrelBase {
  createElement(className, tag = 'div') {
    const element = document.createElement(tag)
    element.classList.add(className)
    return element
  }

  open() {
    this.bodyfreezeOnOff(true)
    this.css(this.$backgroundZone, {
      zIndex:
        +window.getComputedStyle(this.$elementOnBackground)['z-index'] - 1,
    })
    document.body.append(this.$backgroundZone)
  }
  close() {
    this.css(this.$backgroundZone, {
      opacity: 1,
    })
    this.bodyfreezeOnOff()
    this.$backgroundZone.remove()
  }
  initBackgroundZone(elem) {
    this.$elementOnBackground = elem
    this.$backgroundZone = document.createElement('div')
    this.css(this.$backgroundZone, {
      inset: 0,
      position: 'fixed',
      backgroundColor: 'rgba(1,1,1,.8)',
      cursor: 'pointer',
      opacity: 1,
    })
    this.$backgroundZone.addEventListener('click', this.close.bind(this))
  }

  onDragStart(e) {
    this.draggable.startX = this.clientX(e)
    this.draggable.elementWidth = this.$draggableElement.offsetWidth
    this.$draggableElement.style.transition = '0s'
    document.addEventListener('mousemove', this.onDragMove)
    document.addEventListener('mouseup', this.onDragEnd)
    document.addEventListener('touchmove', this.onDragMove)
    document.addEventListener('touchend', this.onDragEnd)
  }

  onDragMove(e) {
    this.draggable.delta = this.clientX(e) - this.draggable.startX
  }

  onDragEnd(e) {
    this.$draggableElement.style.transition = null
    document.removeEventListener('mousemove', this.onDragMove)
    document.removeEventListener('mouseup', this.onDragEnd)
    document.removeEventListener('touchmove', this.onDragMove)
    document.removeEventListener('touchend', this.onDragEnd)
  }

  initDraggable(elem) {
    this.$draggableElement = elem
    this.draggable = {}
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragMove = this.onDragMove.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)

    this.$draggableElement.addEventListener('mousedown', this.onDragStart)
    this.$draggableElement.addEventListener('touchstart', this.onDragStart)
  }

  bodyfreezeOnOff(on = false) {
    const style = {
      overflow: null,
      marginRight: null,
    }
    if (on) {
      if (document.body.offsetHeight > window.innerHeight) {
        const scrollDiv = document.createElement('div')
        scrollDiv.style.cssText =
          'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'
        document.body.appendChild(scrollDiv)
        const scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth
        document.body.removeChild(scrollDiv)
        style.marginRight = scrollbarSize + 'px'
      }

      style.overflow = 'hidden'
    }
    this.css(document.body, {
      marginRight: style.marginRight,
      overflow: style.overflow,
    })
  }

  createElement(className = null, tag = 'div') {
    const element = document.createElement(tag)
    element.classList.add(className)
    return element
  }
  css(elem, styles) {
    Object.keys(styles).forEach((key) => {
      elem.style[key] = styles[key]
    })
  }
  clientX(e) {
    if (e.targetTouches) {
      return e.targetTouches[0].clientX
    }
    return e.clientX
  }
}
