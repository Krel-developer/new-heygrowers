// Тут описана проверка полей формы

import { scrollToElement } from '../../elements/scrollToElement'

export function validateCartFields() {
  let isValide = true
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
