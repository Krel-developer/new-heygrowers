import { krelYmGoal } from '../../elements/krelYmInterface'
import { scrollToElement } from '../../elements/scrollToElement'
import { validateCartFields } from '../cart_fields/cartFieldValidation'

export function initStageChanger() {
  // кнопки переключения стадий
  const btns = document.querySelectorAll('.custom_checkout_cart__stages__btn')
  if (btns.length) {
    btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const stage = +e.target.dataset.stage
        if (validateCartFields()) {
          if (stage === 3) {
            // Если стадия 3, прожимается кнопка оформления заказа
            document.querySelector(
              '.custom_checkout_cart__right__cont__preloader'
            ).style.display = 'block'
            jQuery('form[name="checkout"]').trigger('submit')
          } else {
            setKrelStage(stage + 1)
            scrollToElement('.krel_checkout__stages')
          }
        }
      })
    })
  }

  // Устанавливае сстадию, которая прописана в вёрстке(по умолчанию 1 стадия)
  const cart = document.querySelector('.custom_checkout_cart')
  setKrelStage(cart.dataset.stage)

  // отслеживаем дейтвие "назад", и возвращаем на предыдущию стадию
  window.addEventListener('popstate', (e) => {
    const url = new URL(document.location.href)
    const hash = url.hash.split('cart_stage_')[1]
    if (hash) {
      setKrelStage(+hash)
    } else {
      setKrelStage(
        document.querySelector('.custom_checkout_cart').dataset.stage
      )
    }
  })
}

// Переключает корзину на стадию 'stage'
function setKrelStage(stage) {
  const classList = [
    '.custom_checkout_cart__stages__btn',
    // Класс для кнопок стадий
    '.krel_checkout__stages__item',
    // Класс для заголвков стадий
    '.custom_checkout_cart__stage__block',
    // Класс для блоков стадий
  ]
  krelClearActiveClass()
  classList.forEach((className) => {
    krelSetClassToStageElement(stage, className)
  })

  const cart = document.querySelector('.custom_checkout_cart')
  cart.dataset.stage = stage

  if (stage == 2) {
    krelYmGoal('vibor-dost')
  } else if (stage == 3) {
    krelYmGoal('zapolnenie')
  }
  setStageInUrl(stage)
}

const KREL_ACTIVE_CLASS = 'kc_active'

function krelClearActiveClass() {
  document.querySelectorAll(`.${KREL_ACTIVE_CLASS}`).forEach((el) => {
    el.classList.remove(KREL_ACTIVE_CLASS)
  })
}

function krelSetClassToStageElement(stage, className) {
  document.querySelectorAll(className).forEach((el) => {
    if (el.dataset.stage == stage) {
      el.classList.add(KREL_ACTIVE_CLASS)
    }
  })
}

function setStageInUrl(stage) {
  const url = new URL(document.location.href)
  url.hash = 'cart_stage_' + stage
  history.pushState(null, null, url)
}
