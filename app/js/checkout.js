import initCartFields from './elements/cart/initCartFields'
import { krelInitStages } from './elements/cart/initStages'
import { krelToast } from '../libs/krel-toast/krel-toast'
import { initDaDataOptions } from './elements/cart/daDataOptions'
import { initCartEvents } from './elements/cart/initCartEvents'

document.addEventListener('DOMContentLoaded', () => {
  // подключаем уведомления
  window.krelToast = krelToast

  initCartFields()
  krelInitStages()

  initCartEvents()

  // Настраиваем поля daData
  initDaDataOptions()

  // Ставим автомматически галочку на 	"Я прочитал(а) и соглашаюсь с правилами сайта правила и условия *"
  const terms = document.getElementById('terms')
  if (terms) {
    terms.checked = 'checked'
  }

  // обновление корзины при смене кол-ва товавара
  document.querySelector('div.woocommerce').addEventListener('change', () => {
    setTimeout(() => {
      document
        .querySelector('[name="update_cart"]')
        .dispatchEvent(new Event('click'))
    }, 100)
  })

  jQuery('div.woocommerce').on('change', 'input.qty', function () {
    setTimeout(function () {
      jQuery('[name="update_cart"]').trigger('click')
    }, 100)
  })

  initThankyou()
})

function initThankyou() {
  if (document.querySelector('.woocommerce-order-received')) {
    const btn = document.querySelector('.thankyou__more')
    const cont = document.querySelector('.woocommerce-order-details')

    btn.onclick = () => {
      if (cont.classList.contains('active')) {
        cont.style.height = null
        cont.classList.remove('active')
      } else {
        const headerHeight = document.querySelector('.header').offsetHeight
        cont.style.height = cont.children[0].offsetHeight + 'px'
        cont.classList.add('active')
        jQuery('html, body').animate(
          { scrollTop: cont.offsetTop - headerHeight },
          1000
        )
      }
    }

    const shipping = document.querySelector('.shipping')
    if (shipping) {
      const text = shipping.querySelector('.shipped_via')
        ? shipping.querySelector('.shipped_via')
        : shipping.children[1]
      let newText = text.textContent.split('/')[0]
      if (newText[0] === '(') {
        newText = newText + ')'
      }

      text.textContent = newText
    }
  }
}
