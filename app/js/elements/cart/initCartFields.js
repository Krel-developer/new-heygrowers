import { initContactsStage } from './initContactsStage'
import { initDeliveryStage } from './initDeliveryStage'

export default function initCartFields() {
  // Перебираем вссе поля и инитируем  связь с оригинальными полями
  const fields = document.querySelectorAll('.krel__checkout__field input')

  if (fields.length) {
    fields.forEach((field) => {
      // ищем оригнальное поле в корзине
      const parentId = field.dataset.parent

      if (parentId) {
        const parent = document.getElementById(parentId)

        setParentValueToChild(field, parent)

        if (parent.placeholder) {
          field.placeholder = parent.placeholder
        }

        const eventName = field.type == 'text' ? 'input' : 'change'

        field.addEventListener(eventName, () => {
          if (field.value.length) {
            field.classList.remove('krel__checkout__field_error')
          } else {
            field.classList.add('krel__checkout__field_error')
          }
          if (parentId === 'billing_phone') {
            parent.value = '+7 ' + field.value
          } else {
            parent.value = field.value
          }
        })
        if (parentId === 'billing_phone') {
          field.addEventListener('focusout', () => {
            parent.value = '+7 ' + field.value
          })
        }
      }
    })
  }

  // Активируем поля для шага "Доставка"
  initDeliveryStage()

  // Активируем поля для шага "Контактная информация"
  initContactsStage()
}

// Ставим значение оригнального поля псевдополю
function setParentValueToChild(field, parent) {
  if (parent.value) {
    field.value = parent.value
  }
}
