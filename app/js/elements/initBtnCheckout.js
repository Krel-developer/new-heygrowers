export function initBtnCheckout(total = null) {
  const oldShipping = document.querySelector('.shipping__cont')
  if (oldShipping) {
    oldShipping.remove()
  }
  const shipping = document.getElementById('shipping_method')
  if (shipping) {
    const btns = document.createElement('div')
    const btnsDesc = document.createElement('div')
    const shippingCont = document.createElement('div')
    btns.classList.add('shipping__btns')
    btnsDesc.classList.add('shipping__desc')
    shippingCont.classList.add('shipping__cont')
    document
      .querySelector('.checkout.woocommerce-checkout')
      .parentNode.before(shippingCont)
    shippingCont.append(btns)
    btns.after(btnsDesc)
    for (let i = 0; i < shipping.children.length; i++) {
      const li = shipping.children[i]
      const descAndBtn = creatDescAndBtn(li)
      const { btn, desc } = descAndBtn
      btns.append(btn)
      btnsDesc.append(desc)
      if (li.children[0].checked) {
        if (
          li.children[0].getAttribute('id') ===
          'shipping_method_0_shipping_sdek'
        ) {
          document.querySelector('.sdek__module').style.display = 'block'
        }

        if (
          li.children[0].getAttribute('id') ===
          'shipping_method_0_local_pickup-1'
        ) {
          document.querySelector('.form-row-samovivos').style.display = 'block'
        }
        btn.classList.add('active')
        desc.classList.add('active')
      }

      btn.addEventListener('click', checkoutBtnHandler.bind(null, btn, desc))
    }
    if (total && total < 1500) {
      const btnVoid = createBtn(
        '<div><span>Доставка по Санкт-Петербургу</span> <span>(доступно от 1500руб.)</span></div>',
        'shipping__btn__void'
      )
      btnVoid.classList.add('shipping__btn__void')
      btns.children[0].after(btnVoid)
    }
  }
}

function creatDescAndBtn(li) {
  const info = li.children[1].textContent.split('/')
  const id = li.children[0].getAttribute('id')
  return { btn: createBtn(info[0], id), desc: createDesc(info[1]) }
}

function createBtn(text, id) {
  const btn = document.createElement('div')
  btn.classList.add('shipping__btn')
  btn.dataset.id = id
  btn.innerHTML = text

  return btn
}
function createDesc(text) {
  const desc = document.createElement('div')
  desc.classList.add('shipping__desc__item')
  desc.innerHTML = text
  return desc
}

function checkoutBtnHandler(btn, desc) {
  document.getElementById(btn.dataset.id).checked = true
  document.body.dispatchEvent(new Event('update_checkout'))
  btn.parentNode
    .querySelector('.shipping__btn.active')
    .classList.remove('active')
  desc.parentNode
    .querySelector('.shipping__desc__item.active')
    .classList.remove('active')
  btn.classList.add('active')
  desc.classList.add('active')
  if (btn.dataset.id === 'shipping_method_0_shipping_sdek') {
    document.querySelector('.sdek__module').style.display = 'block'
  } else {
    document.querySelector('.sdek__module').style.display = null
  }
  if (btn.dataset.id === 'shipping_method_0_local_pickup-1') {
    document.querySelector('.form-row-samovivos').style.display = 'block'
  } else {
    document.querySelector('.form-row-samovivos').style.display = null
  }
}
