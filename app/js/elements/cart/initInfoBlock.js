export function initInfoBlock(costShip = null) {
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

function addInfoItem(label, info, location) {
  const div = document.createElement('div')
  div.classList.add('custom_checkout_cart__right__item')
  div.insertAdjacentHTML('beforeend', `<div>${label}</div><div>${info}</div>`)
  location.before(div)
}
