export function initInfoBlock(costShip = null) {
  const oldItems = document.querySelectorAll(
    '.custom_checkout_cart__right__item'
  )
  const disconts = document.querySelectorAll('#order_review .cart-discount')
  oldItems.forEach((item) => item.remove())

  getProductSum()
  if (disconts.length) {
    disconts.forEach((discont) => {
      addInfoItem(discont.children[0].outerHTML, discont.children[1].outerHTML)
    })
  }
  if (costShip) {
    addInfoItem('Стоимость доставки', costShip)
  }
  addInfoItem(
    'Итого',
    document.querySelector('#order_review .order-total').children[1].outerHTML,
    true
  )
}

function addInfoItem(label, info, isBig = false) {
  const btn = document.querySelector('.custom_checkout_cart__right .btn')

  const div = document.createElement('div')
  div.classList.add('custom_checkout_cart__right__item')

  if (isBig) {
    div.classList.add('custom_checkout_cart__right__item_big')
  }
  div.insertAdjacentHTML('beforeend', `<div>${label}</div><div>${info}</div>`)

  // добавляем элемент перед кнопкой
  btn.before(div)
}

function getProductSum() {
  const productTotals = document.querySelectorAll(
    '.krel__cart_item__subtotal__cont .product-subtotal'
  )

  console.log(productTotals)
  if (productTotals.length) {
    let productsSumm = 0

    const subtotalElement = document.querySelector(
      '#order_review .cart-subtotal'
    ).children[1]

    if (productTotals[0].children[1]) {
      productTotals.forEach((productTotal) => {
        const productPriceValue = krelHtmlToNumber(productTotal.children[0])
        productsSumm += productPriceValue
      })

      const deltaPrice = productsSumm - krelHtmlToNumber(subtotalElement)

      addInfoItem(
        'Стоимость товаров',
        returnPriceHTML(krelNumberToStroke(productsSumm))
      )
      addInfoItem('Скидка', returnPriceHTML(krelNumberToStroke(deltaPrice)))

      addInfoItem(
        'Цена со скидкой',
        document.querySelector('#order_review .cart-subtotal').children[1]
          .outerHTML
      )
    } else {
      console.log(subtotalElement)
      addInfoItem('Стоимость товаров', subtotalElement.outerHTML)
    }
  }
}

function returnPriceHTML(price) {
  return `
    <span class="woocommerce-Price-amount amount">
      <bdi>
        ${price}
        <span class="woocommerce-Price-currencySymbol"><span class="rur">р<span>уб.</span></span></span>
      </bdi>
    </span>
  `
}
function krelNumberToStroke(number) {
  // приводит число формата 1000 к 1,000
  var int = String(Math.trunc(number))
  if (int.length <= 3) return int
  let space = 0
  let newNumber = ''

  for (var i = int.length - 1; i >= 0; i--) {
    if (space == 3) {
      newNumber = ',' + newNumber
      space = 0
    }
    newNumber = int.charAt(i) + newNumber
    space++
  }

  return newNumber
}

function krelHtmlToNumber(html) {
  // приводит html элемент к числовому значению

  return +html.textContent.trim().split('руб')[0].split(',').join('')
}
