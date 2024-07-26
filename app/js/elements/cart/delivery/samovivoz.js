export function initSamovivozDelivery() {
  const magazinField = document.querySelector('#billing_new_fild11_field input')
  if (magazinField) {
    const magazinBtns = document.querySelectorAll('.krel__samovivoz__btn')
    magazinBtns.forEach((btn) => {
      if (btn.classList.contains('krel__samovivoz__btn_active')) {
        magazinField.value = btn.textContent
      }
      btn.addEventListener('click', () => {
        document
          .querySelector('.krel__samovivoz__btn_active')
          .classList.remove('krel__samovivoz__btn_active')

        btn.classList.add('krel__samovivoz__btn_active')
        magazinField.value = btn.textContent
      })
    })
  }
}
