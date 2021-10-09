export function bodyfreezeOnOff(on = false) {
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
  document.body.style.marginRight = style.marginRight
  document.body.style.overflow = style.overflow
}
