import { initBtnAddToCartAnim } from './elements/animAddToCart'
function initRadioButtonForSelected() {
  const variations = document.querySelector('.variations select')
  if (variations) {
    const variationsForm = document.querySelector('.variations_form')
    const radioContainer = document.createElement('div')
    radioContainer.classList.add('radio__cont')
    variations.after(radioContainer)
    console.log(variations.children)
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
      console.log(imgWidth, parentWidth)
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
  console.log(art)
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
document.addEventListener('DOMContentLoaded', () => {
  initBtnAddToCartAnim()
  initRadioButtonForSelected()
  const width = window.screen.availWidth

  const related = document.querySelector('.related')
  if (related) {
    if (width < 992) {
      related.classList.add('custom__products')
    }
    window.addEventListener('resize', () => {
      const width = window.screen.availWidth
      const related = document.querySelector('.related')
      if (width < 992) {
        related.classList.add('custom__products')
      } else {
        related.classList.remove('custom__products')
      }
    })
  }

  centeringProductImage()
  createArticul()
})
