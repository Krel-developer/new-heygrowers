import {
  changeCurrentDeliveryItem,
  deliveryTuneDostavkaKurerom,
} from './delivery/initDeliveryItems'
import { initInfoBlock } from './initInfoBlock'
import { initPaymentMethods } from './initPayMethods'
import { initSaleInput } from './initSaleInput'

export function initCartEvents() {
  jQuery('body').on('updated_checkout', function () {
    // Активируем кнопки выбора способа оплаты
    initPaymentMethods()

    const subtotal = getSubTotal()
    jQuery('.shipping_method').each(function () {
      if (jQuery(this).attr('checked')) {
        const shiping = jQuery(this).val()

        if (shiping === 'flat_rate:2') {
          const cost = jQuery(this).parent().children('label').children('span')
          initInfoBlock(cost[0].outerHTML)
        } else {
          initInfoBlock()
        }
      }
    })
    document.querySelector(
      '.custom_checkout_cart__right__cont__preloader'
    ).style.display = null

    // Настраиваем доставку курьером
    deliveryTuneDostavkaKurerom()

    // Ставим значение доставки в псевдокорзине соотвественно оригинальной
    changeCurrentDeliveryItem()

    // кнопки доставки в оформлении заказа
    // initBtnCheckout(subtotal)
    initSaleInput()
  })

  jQuery('body').on('update_checkout', function () {
    document.querySelector(
      '.custom_checkout_cart__right__cont__preloader'
    ).style.display = 'block'
  })
}

function getSubTotal() {
  return +document
    .querySelector('.cart-subtotal bdi')
    .firstChild.textContent.split(',')
    .join('')
}
