export function initCheckoutLegalBtns() {
  const legalCheckbox = document.getElementById(
    'ship-to-different-address-checkbox'
  )

  if (legalCheckbox) {
    const fizUrField = document.getElementById('fiz_ur')
    if (fizUrField) {
      document.querySelectorAll('.krel__legal__btn').forEach((btn) => {
        const legalValue = btn.dataset.legal
        console.log(legalValue)

        if (legalCheckbox.checked && legalValue === 'ur') {
          document
            .querySelector('.krel__legal__btn_active')
            .classList.remove('krel__legal__btn_active')

          btn.classList.add('krel__legal__btn_active')
          fizUrField.value = 'Юридичское лицо'
        } else {
          fizUrField.value = 'Физическое лицо'
        }

        btn.addEventListener('click', () => {
          document
            .querySelector('.krel__legal__btn_active')
            .classList.remove('krel__legal__btn_active')

          btn.classList.add('krel__legal__btn_active')

          if (legalValue === 'ur') {
            legalCheckbox.checked = true
          } else {
            legalCheckbox.checked = false
          }
          fizUrField.value = btn.textContent

          jQuery('#ship-to-different-address-checkbox').trigger('change')
        })
      })
    }
  }
}
