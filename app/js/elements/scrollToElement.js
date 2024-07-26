export function scrollToElement(selector) {
  const element = document.querySelector(selector)

  if (element) {
    const headerHeight = document.querySelector('.header').offsetHeight + 30
    jQuery('html, body').animate(
      { scrollTop: element.offsetTop - headerHeight },
      1000
    )
  }
}
