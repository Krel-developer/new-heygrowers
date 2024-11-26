// Тут описана проверка полей формы

import { scrollToElement } from '../../elements/scrollToElement'

export function validateCartFields() {
  let isValide = true

  let isEmailValide = true
  const stageCont = document.querySelector(
    '.custom_checkout_cart__stage__block.kc_active'
  )

  const fieldsContainers = stageCont.querySelectorAll('.krel__checkout__fields')

  fieldsContainers.forEach((fieldsCont) => {
    if (!fieldsCont.classList.contains('not_need_validate')) {
      const fields = fieldsCont.querySelectorAll(
        '.krel__checkout__field  input'
      )

      if (fields.length) {
        fields.forEach((field) => {
          if (!field.value && field.type === 'text') {
            field.classList.add('krel__checkout__field_error')
            isValide = false
          } else if (field.value && field.dataset.parent === 'billing_email') {
            /* https://stackoverflow.com/questions/2855865/jquery-validate-e-mail-address-regex */
            const pattern = new RegExp(
              /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
            ) // eslint-disable-line max-len

            if (!pattern.test(field.value)) {
              field.classList.add('krel__checkout__field_error')

              isEmailValide = false
            }
          }
        })
      }
    }
  })

  if (stageCont.dataset.stage == '2') {
    if (!sdekValidate()) {
      isValide = false
    }
  }

  if (!isValide) {
    krelToast.error('Заполните обязятельные поля')
    scrollToElement('.krel_checkout__stages')
  }
  if (!isEmailValide) {
    isValide = false
    krelToast.error('Вы указали неверный Email')
    scrollToElement('.krel_checkout__stages')
  }

  return isValide
}

function sdekValidate() {
  let isValid = true
  const sdek = document.querySelector('.krel_checkout__shipping__sdek__title')
  if (
    sdek.dataset.filled === 'false' &&
    !sdek
      .closest('.krel__checkout__fields ')
      .classList.contains('not_need_validate')
  ) {
    sdek.classList.add('krel_checkout__shipping__sdek__title_error')
    isValid = false
  }
  return isValid
}
