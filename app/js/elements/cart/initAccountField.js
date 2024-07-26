export function initAccountField() {
  const field = document.getElementById('account_custom')
  if (field) {
    field.addEventListener('change', () => {
      const originalAccoutnField = document.getElementById('createaccount')

      const fieldCont = field.closest('.krel__checkout__fields')

      if (field.checked) {
        originalAccoutnField.checked = true
        fieldCont.classList.remove('not_need_validate')
      } else {
        originalAccoutnField.checked = false
        fieldCont.classList.add('not_need_validate')
      }

      originalAccoutnField.dispatchEvent(new Event('change'))
    })
  }
}
