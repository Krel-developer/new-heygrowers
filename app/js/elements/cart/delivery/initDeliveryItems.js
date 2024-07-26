export function initDeliveryItems() {
  const shippingBtns = document.querySelectorAll(
    '.krel_checkout__shipping__radio input'
  )
  if (shippingBtns.length) {
    shippingBtns.forEach((btn) => {
      btn.addEventListener('change', (e) => {
        setDelieryItem(btn)
        chooseDelivery(btn)
      })
    })
  }
}

function deliveryItemsClear() {
  // убираем со всех элементов активный класс и добавляем класс неакстивности к полям
  const shippingBtns = document.querySelectorAll(
    '.krel_checkout__shipping__item'
  )
  if (shippingBtns.length) {
    shippingBtns.forEach((btn) => {
      btn.classList.remove('krel_checkout__shipping__item_active')
      const fieldCont = btn.querySelector('.krel__checkout__fields')
      if (fieldCont) {
        fieldCont.classList.add('not_need_validate')
      }
    })
  }
}

function chooseDelivery(btn) {
  document.getElementById(btn.value).checked = true
  document.body.dispatchEvent(new Event('update_checkout'))
}

// Доставка куръром зависит от суммы корзины, это функция проверяет это и соотвественно настраивает
export function deliveryTuneDostavkaKurerom() {
  const kurerBtn = document.querySelector(
    '.krel_checkout__shipping__item__kurer'
  )
  const kurerBtnInput = document.querySelector(
    '.krel_checkout__shipping__item__kurer input'
  )
  kurerBtn.style.display = ''
  if (kurerBtn) {
    if (document.getElementById('shipping_method_0_flat_rate-2')) {
      kurerBtnInput.value = 'shipping_method_0_flat_rate-2'
    } else if (document.getElementById('shipping_method_0_flat_rate-1')) {
      kurerBtnInput.value = 'shipping_method_0_flat_rate-1'
    } else {
      kurerBtn.style.display = 'none'
    }
  }
}

function setDelieryItem(btn) {
  btn.checked = 'checked'
  const parentBlock = btn.closest('.krel_checkout__shipping__item')
  deliveryItemsClear()
  parentBlock.classList.add('krel_checkout__shipping__item_active')
  const fieldCont = parentBlock.querySelector('.krel__checkout__fields')
  if (fieldCont) {
    fieldCont.classList.remove('not_need_validate')
  }
}

export function changeCurrentDeliveryItem() {
  const current = document.querySelector(
    '.woocommerce-shipping-totals .shipping_method[checked="checked"]'
  )

  if (current) {
    const shippingBtns = document.querySelectorAll(
      '.krel_checkout__shipping__radio input'
    )
    if (shippingBtns.length) {
      shippingBtns.forEach((btn) => {
        if (btn.value === current.id) {
          setDelieryItem(btn)
        }
      })
    }
  }
}
