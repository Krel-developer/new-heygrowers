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
          // let xDelta = 0
          anim.classList.add('btn_anim_add')
          document.body.append(anim)
          // console.log(anim.offsetWidth)
          // if (anim.offsetWidth !== btn.offsetWidth) {
          //   xDelta = btn.offsetWidth / 2 - anim.offsetWidth / 2
          // }
          anim.style.top = coord.top + 'px'
          anim.style.left = coord.left + 'px'

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
