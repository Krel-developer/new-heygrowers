export function initSaleInput() {
  let sale = 0
  const cartItemPercentArray = document.querySelectorAll(
    '.krel__cart_item .krel__cart_item__price__cont .save-percent'
  )
  if (cartItemPercentArray.length) {
    cartItemPercentArray.forEach((el) => {
      const percentValue = +el.textContent.split('-')[1].split('%')[0]
      const oldPrice = +el.parentNode
        .querySelector('del')
        .textContent.split('руб')[0]
      if (sale == 0) {
        sale = percentValue
      } else if (!oldPrice || oldPrice >= 100) {
        if (percentValue < sale) {
          sale = percentValue
        }
      }
    })
  }

  const $saleField = document.querySelector('#billing_new_fild12_field input')

  if ($saleField) {
    if (sale == 0) {
      $saleField.value = 'Без скидки'
    } else {
      // $saleField.value = `Скидка ${sale}%`
      $saleField.value = sale
    }
  }
}
