import { liteSlider } from '../libs/krel-slider-lite/krelSliderLite'
import { initBtnAddToCartAnim } from './elements/animAddToCart'
function initRadioButtonForSelected() {
  const variations = document.querySelector('.variations select')
  if (variations) {
    const variationsForm = document.querySelector('.variations_form')
    const radioContainer = document.createElement('div')
    radioContainer.classList.add('radio__cont')
    variations.after(radioContainer)
    for (let options = 1; options < variations.children.length; options++) {
      const radio = document.createElement('input')
      radio.setAttribute('type', 'radio')
      radio.setAttribute('name', 'objem')
      radio.dataset.value = variations.children[options].value
      radio.onclick = () => {
        variations.value = radio.dataset.value
        variations.dispatchEvent(new Event('change'))
        variationsForm.dispatchEvent(new Event('check_variations'))
      }
      const label = document.createElement('label')
      label.append(radio)
      label.insertAdjacentHTML(
        'beforeend',
        `<span>${variations.children[options].textContent}</span>`
      )
      label.classList.add('custom-checkbox')
      radioContainer.append(label)
      if (options === 1) {
        variations.value = radio.dataset.value
        variations.dispatchEvent(new Event('change'))
        variationsForm.dispatchEvent(new Event('check_variations'))
        radio.setAttribute('checked', true)
      }
    }
  }
}

function centeringProductImage() {
  const images = document.querySelectorAll('.wp-post-image')
  if (images.length) {
    images.forEach((img) => {
      const imgWidth = img.offsetWidth
      const parentWidth = img.parentNode.offsetWidth
      if (imgWidth > parentWidth) {
        img.parentNode.style.position = 'relative'
        img.style.position = 'absolute'
        img.style.left = `-${(imgWidth - parentWidth) / 2}px`
      }
    })
  }
}
function createArticul() {
  const art = document.querySelector('.product_meta .sku_wrapper')
  if (!art) {
    const id = document
      .querySelector('.single__product__cont')
      .getAttribute('id')
      .split('-')[1]
    const artHhtml = `<span class="sku_wrapper">Артикул: <span class="sku" data-o_content="gfresytgers">hey${id.trim()}-ph</span></span>`
    document
      .querySelector('.product_meta')
      .insertAdjacentHTML('afterbegin', artHhtml)
  }
}
function initThumbArrow() {
  setTimeout(() => {
    const thums = document.querySelector('.flex-control-nav')
    if (thums) {
      const cont = document.createElement('div')
      const contNav = document.createElement('div')

      contNav.classList.add('flex-control-nav__cont')
      cont.classList.add('flex-control-nav')
      thums.classList.remove('flex-control-nav')
      thums.before(cont)
      cont.append(contNav)
      contNav.append(thums)
      const prev = document.createElement('div')
      const next = document.createElement('div')
      prev.classList.add('flex-control-nav__prev')
      prev.style.display = 'none'
      next.classList.add('flex-control-nav__next')
      cont.prepend(prev)
      cont.append(next)
      thums.dataset.translate = 0
      next.onclick = () => {
        moveThumb()
      }
      prev.onclick = () => {
        moveThumb('prev')
      }

      const maxTranslate =
        +contNav.offsetHeight * (Math.ceil(thums.children.length / 3) - 1)
      function moveThumb(dir = 'next') {
        let newTranslate
        const translate = +thums.dataset.translate
        if (dir === 'next') {
          newTranslate = translate + contNav.offsetHeight
        } else {
          newTranslate = translate - contNav.offsetHeight
        }
        thums.dataset.translate = newTranslate
        if (newTranslate === 0) {
          prev.style.display = 'none'
        }
        if (translate === 0) {
          prev.style.display = null
        }
        if (newTranslate === maxTranslate) {
          next.style.display = 'none'
        }
        if (translate === maxTranslate) {
          next.style.display = null
        }
        thums.style.transform = `translateY(-${newTranslate}px)`
      }
    }
  }, 0)
}

document.addEventListener('DOMContentLoaded', () => {
  initBtnAddToCartAnim()
  initRadioButtonForSelected()
  initThumbArrow()

  centeringProductImage()
  createArticul()

  const relatedCont = document.querySelector(
    '.single__product__bottom .related'
  )

  if (relatedCont) {
    const section = document.createElement('section')
    const cont = document.createElement('div')
    section.classList.add('related')
    relatedCont.classList.remove('related')
    cont.classList.add('custom__products')
    cont.append(relatedCont)
    section.append(cont)
    const h2 = relatedCont.querySelector('h2')
    h2.classList.add('main__title__h2')
    const h2Cont = document.createElement('div')
    h2Cont.classList.add('main__title')
    h2Cont.append(h2)
    cont.before(h2Cont)

    relatedCont.classList.add('products')
    document.querySelector('.single__product__cont').after(section)

    // Слайдер хиты продаж
    liteSlider('.related__cont .products', {
      response: 767,
    })
  }
})
