import { krelToast } from '../libs/krel-toast/krel-toast'
import { initBtnCheckout } from './elements/initBtnCheckout'
// кнопки доставки в оформлении заказа

// генерациия правильной  структуры страницы заказа
function initHtmlCheckout() {
  const cartAndCheckout = document
    .querySelector('.entry-content')
    .querySelectorAll('.woocommerce')
  const cartAndCheckoutCont = document.createElement('div')
  cartAndCheckoutCont.classList.add('custom_checkout_cart')
  const cartAndCheckoutContLeft = document.createElement('div')
  cartAndCheckoutContLeft.classList.add('custom_checkout_cart__left')
  cartAndCheckoutContLeft.append(cartAndCheckout[0])
  cartAndCheckoutContLeft.append(cartAndCheckout[1])
  cartAndCheckoutCont.append(cartAndCheckoutContLeft)
  document.querySelector('.entry-content').append(cartAndCheckoutCont)
  cartAndCheckoutCont.append(
    document.querySelector('.custom_checkout_cart__right')
  )
}

function sdekShippingActive(e) {
  const headerHeight = document.querySelector('.header').offsetHeight + 20
  const scrollElement = jQuery('.shipping__desc')
  jQuery('html, body').animate(
    { scrollTop: scrollElement.offset().top - headerHeight },
    1000
  )
  e.target.blur()
}

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

function addInfoItem(label, info, location) {
  const div = document.createElement('div')
  div.classList.add('custom_checkout_cart__right__item')
  div.insertAdjacentHTML('beforeend', `<div>${label}</div><div>${info}</div>`)
  location.before(div)
}

function initInfoBlock(costShip = null) {
  const btn = document.querySelector('.custom_checkout_cart__right .btn')
  const oldItems = document.querySelectorAll(
    '.custom_checkout_cart__right__item'
  )
  const disconts = document.querySelectorAll('#order_review .cart-discount')
  oldItems.forEach((item) => item.remove())
  if (costShip || disconts.length) {
    addInfoItem(
      'Подитог',
      document.querySelector('#order_review .cart-subtotal').children[1]
        .outerHTML,
      btn
    )
  }
  if (disconts.length) {
    disconts.forEach((discont) => {
      addInfoItem(
        discont.children[0].outerHTML,
        discont.children[1].outerHTML,
        btn
      )
    })
  }
  if (costShip) {
    addInfoItem('Стоимость доставки', costShip, btn)
  }
  addInfoItem(
    'Сумма',
    document.querySelector('#order_review .order-total').children[1].outerHTML,
    btn
  )
}

function initCoupon() {
  const form = document.querySelector(
    '.checkout_coupon.woocommerce-form-coupon'
  )
  if (form) {
    const btn = document.createElement('div')
    btn.textContent = 'Есть купон? Нажмите, чтобы ввести'
    btn.classList.add('coupon__btn')
    const coupon = document.createElement('div')
    coupon.classList.add('coupon__cont')
    form.before(coupon)
    coupon.append(form)
    form.innerHTML = '<div class="coupon__form">' + form.innerHTML + '</div>'
    form.before(btn)
    btn.onclick = () => {
      if (form.classList.contains('open')) {
        form.classList.remove('open')
        form.style.height = null
      } else {
        form.classList.add('open')
        form.style.height = form.children[0].offsetHeight + 'px'
      }
    }
  }
}
function getSubTotal() {
  return +document
    .querySelector('.cart-subtotal bdi')
    .firstChild.textContent.split(',')
    .join('')
}
document.addEventListener('DOMContentLoaded', () => {
  jQuery('body').on('updated_checkout', function () {
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

    // кнопки доставки в оформлении заказа
    initBtnCheckout(subtotal)
  })

  jQuery('body').on('update_checkout', function () {
    document.querySelector(
      '.custom_checkout_cart__right__cont__preloader'
    ).style.display = 'block'
  })

  initThankyou()
  window.krelToast = krelToast

  // генерациия правильной  структуры страницы заказа
  initHtmlCheckout()

  // Купоны
  initCoupon()

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

  // кнопка оформить заказ
  const btnOrder = document.querySelector('.custom_checkout_cart__right .btn')
  if (btnOrder) {
    btnOrder.addEventListener('click', () => {
      jQuery('form[name="checkout"]').trigger('submit')
    })
  }
  krelMaskInput('billing_phone', '+7 (999) 999-99-99')

  // модуль сдэк
  window.ourWidjet = new ISDEKWidjet({
    defaultCity: 'Санкт-Петербург', //какой город отображается по умолчанию
    cityFrom: 'Санкт-Петербург', // из какого города будет идти доставка
    // country: 'Россия', // можно выбрать страну, для которой отображать список ПВЗ
    link: false,
    popup: true,
    path: 'https://widget.cdek.ru/widget/scripts/',
    hidedelt: true,
  })
  ourWidjet.binders.add(choosePVZ, 'onChoose')
  function choosePVZ(wat) {
    const adres = `г. ${wat.cityName}, ${wat.PVZ.Address}`
    document.getElementById(
      'billing_address_2'
    ).value = ` г. ${wat.cityName}, ${wat.PVZ.Address}`
    const text = `Вы выбрали пункт выдчи СДЭК по адресу г. ${wat.cityName}, ${wat.PVZ.Address}`
    document.getElementById('sdek__adress').textContent = text

    krelToast.toast(text)
  }
  document.getElementById('billing_address_2').value = ''

  // Поле "нужно ли перезвонить для уточнения заказа"

  const zvonokField = document.querySelector('#order_new_fild1_field input')
  if (zvonokField) {
    const zvonokRadios = document.querySelectorAll('.form-row-zvonok input')
    zvonokRadios.forEach((el) => {
      if (el.checked) {
        zvonokField.value = el.value
      }
      el.addEventListener('change', () => {
        zvonokField.value = el.value
      })
    })
  }

  // Поле "Выбор магазина для самовывоза"

  const magazinField = document.querySelector('#billing_new_fild11_field input')
  if (magazinField) {
    const magazinRadios = document.querySelectorAll('.form-row-samovivos input')
    magazinRadios.forEach((el) => {
      if (el.checked) {
        magazinField.value = el.value
      }
      el.addEventListener('change', () => {
        magazinField.value = el.value
      })
    })
  }
})
