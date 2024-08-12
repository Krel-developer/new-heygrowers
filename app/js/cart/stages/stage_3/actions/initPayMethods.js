export function initPaymentMethods() {
  const paymentMethods = document.querySelectorAll('.wc_payment_methods input')

  if (paymentMethods.length) {
    const paymentCont = document.querySelector(
      '.krel__checkout__payment__methods'
    )
    paymentCont.innerHTML = ''
    paymentMethods.forEach((payment) => {
      const isChecked = payment.checked ? 'checked="checked"' : ''

      paymentCont.insertAdjacentHTML(
        'beforeend',
        `
        <label class="krel_checkout__shipping__radio">
          <input type="radio" value="${
            payment.value
          }" class="custom-radio" name="payments_methods_custom" id="${
          payment.value
        }_custom" ${isChecked}}>
          <span>${payment.parentNode.querySelector('label').textContent}</span>
        </label>
      `
      )

      paymentCont
        .querySelector(`#${payment.value}_custom`)
        .addEventListener('change', (e) => {
          setPaymentMethod(e.target.value)
        })
    })
  }
}

function setPaymentMethod(method) {
  const paymentMethods = document.querySelectorAll('.wc_payment_methods input')
  paymentMethods.forEach((payment) => {
    if (payment.value === method) {
      payment.checked = true
      // document.body.dispatchEvent(new Event('update_checkout'))
    }
  })
}
