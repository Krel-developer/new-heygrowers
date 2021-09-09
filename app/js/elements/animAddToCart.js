export function initBtnAddToCartAnim() {
  const time = 300
  const btns = document.querySelectorAll('.add_to_cart_button')
  const cart = document.querySelector('.header__cart')
  if (btns) {
    btns.forEach((btn) => {
      if (
        btn.getAttribute('id') !== 'sbw_wc-adding-button-archive' &&
        !btn.classList.contains('product_type_variable')
      ) {
        btn.onclick = () => {
          const coord = btn.getBoundingClientRect()
          const cartCoord = cart.getBoundingClientRect()
          const anim = document.createElement('div')
          anim.classList.add('btn_anim_add')
          anim.style.top = coord.top + 'px'
          anim.style.left = coord.left + 'px'
          document.body.append(anim)
          anim.style.transition = `${time}ms ease-in`
          setTimeout(() => {
            anim.style.top =
              cartCoord.top + (cart.offsetHeight - anim.offsetHeight) / 2 + 'px'
            anim.style.left =
              cartCoord.left + (cart.offsetWidth - anim.offsetWidth) / 2 + 'px'
            setTimeout(() => {
              anim.style.opacity = 0
              setTimeout(() => {
                anim.remove()
              }, time)
            }, time)
          }, 0)
        }
      }
    })
  }
}
