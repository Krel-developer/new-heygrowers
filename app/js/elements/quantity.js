export function quntityInit() {
  function quantityPlusOrMinus(el) {
    if (el.closest('.quantity-btn')) {
      const btn = el.closest('.quantity-btn')
      const input = btn.parentNode.children[1]
      const inputValue = +input.value
      if (btn.dataset.dir === 'minus' && inputValue !== 1) {
        if (!!input.getAttribute('max')) {
          if (input.value === input.getAttribute('max')) {
            btn.parentNode.children[2].style.display = null
          }
        }
        input.value = inputValue - 1
      } else if (btn.dataset.dir === 'plus') {
        input.value = inputValue + 1
        if (!!input.getAttribute('max')) {
          if (+input.value >= +input.getAttribute('max')) {
            btn.style.display = 'none'
          }
        }
      }
      const checkout = document.querySelector('[name="update_cart"]')
      if (checkout) {
        checkout.disabled = false
        jQuery('[name="update_cart"]').trigger('click')
      }
    }
  }
  function quantityInput(el) {
    const checkingRegExp = new RegExp(/^(\d){1,7}$/g)
    const result = el.value.match(checkingRegExp) !== null

    if (!result) {
      el.value = el.value.slice(0, -1)
    }
    if (!!el.getAttribute('max')) {
      if (+el.value > +el.getAttribute('max')) {
        el.value = +el.getAttribute('max')
        el.parentNode.children[2].style.display = 'none'
      }
    }
  }

  return {
    click: quantityPlusOrMinus,
    input: quantityInput,
  }
}
