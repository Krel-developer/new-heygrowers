export function krelLazyLoad() {
  var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'))
  var lazyBackgrounds = [].slice.call(
    document.querySelectorAll('.lazy-background')
  )

  if ('IntersectionObserver' in window) {
    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target
          lazyImage.src = lazyImage.dataset.src
          lazyImage.srcset = lazyImage.dataset.srcset
          lazyImage.classList.remove('lazy')
          lazyImage.parentNode.classList.add('img-loaded')
          lazyImageObserver.unobserve(lazyImage)
        }
      })
    })
    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage)
    })

    let lazyBackgroundObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          lazyBackgroundObserver.unobserve(entry.target)
        }
      })
    })
    lazyBackgrounds.forEach(function (lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground)
    })
  } else {
    // Fallback

    lazyImages.forEach(function (lazyImage) {
      lazyImage.src = lazyImage.dataset.src
      lazyImage.srcset = lazyImage.dataset.srcset
    })
    lazyBackgrounds.forEach(function (lazyBackground) {
      lazyBackground.classList.add('visible')
    })
  }
}
