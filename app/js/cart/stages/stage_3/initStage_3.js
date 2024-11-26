import { krelMaskInput } from '../../../../libs/krelMaskInput'
import { initCheckoutLegalBtns } from './checkoutLegalBtns'
import { initAccountField } from './initAccountField'

export function initStage_3() {
  // активируем поле "коментарий"
  const fieldTextArea = document.querySelector(
    '.krel__checkout__field textarea'
  )

  if (fieldTextArea) {
    fieldTextArea.addEventListener('input', () => {
      document.getElementById('order_comments').value = fieldTextArea.value
    })
  }
  // активируем маску для поля "Номер телефона"
  krelMaskInput('billing_phone__custom', '(999) 999-99-99')

  // Поле "нужно ли перезвонить для уточнения заказа"
  const zvonokField = document.querySelector('#order_new_fild1_field input')
  if (zvonokField) {
    const zvonokRadios = document.querySelectorAll(
      '.krel__checkout__fields__zvonok input'
    )
    zvonokRadios.forEach((el) => {
      if (el.checked) {
        zvonokField.value = el.value
      }
      el.addEventListener('change', () => {
        zvonokField.value = el.value
      })
    })
  }

  // ВЫбор Юр/Физ лицо
  initCheckoutLegalBtns()

  // Активируем поле создания аккаунта
  initAccountField()
}
