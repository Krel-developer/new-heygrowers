const LEGAL_ACTIVE_CLASS = 'krel__legal__btn_active'

export function initCheckoutLegalBtns() {
  const legalCheckbox = document.getElementById(
    'ship-to-different-address-checkbox'
  )

  if (legalCheckbox) {
    const legalFieldsCont = document.querySelector(
      '.krel__checkout__fields__legal'
    )
    const fizUrField = document.getElementById('fiz_ur')
    if (fizUrField) {
      document.querySelectorAll('.krel__legal__btn').forEach((btn) => {
        const legalValue = btn.dataset.legal

        if (legalCheckbox.checked && legalValue === 'ur') {
          document
            .querySelector(`.${LEGAL_ACTIVE_CLASS}`)
            .classList.remove(LEGAL_ACTIVE_CLASS)

          btn.classList.add(LEGAL_ACTIVE_CLASS)
          fizUrField.value = 'Юридичское лицо'
        } else {
          fizUrField.value = 'Физическое лицо'
        }

        btn.addEventListener('click', () => {
          document
            .querySelector(`.${LEGAL_ACTIVE_CLASS}`)
            .classList.remove(LEGAL_ACTIVE_CLASS)

          btn.classList.add(LEGAL_ACTIVE_CLASS)

          if (legalValue === 'ur') {
            legalCheckbox.checked = true
            legalFieldsCont.classList.remove('not_need_validate')
          } else {
            legalCheckbox.checked = false
            legalFieldsCont.classList.add('not_need_validate')
          }
          fizUrField.value = btn.textContent

          jQuery('#ship-to-different-address-checkbox').trigger('change')
        })
      })
    }
  }
}
