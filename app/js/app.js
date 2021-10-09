// // Import jQuery module (npm i jquery)
// import $ from 'jquery'
// window.jQuery = $
// window.$ = $

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')
import { krelMenu } from './elements/menu'
import { quntityInit } from './elements/quantity'
import { liteSlider } from '../libs/krel-slider-lite/krelSliderLite'
import { krelPopup } from '../libs/krel-popup/krelPopup'
import { krelMaskInput } from '../libs/krelMaskInput'
import { initHeader } from './elements/header'
import { initCookie } from './elements/cookie'
import { krelLazyLoad } from './elements/lazy'
import { krelSlider } from '../libs/krel_slider/slider'

// ленивая загрузка
document.addEventListener('DOMContentLoaded', function () {
  window.krelLazyLoad = krelLazyLoad
  krelLazyLoad()
})

document.addEventListener('DOMContentLoaded', () => {
  initCookie()
  //... перезагрузка страницы при изменении размера окна
  const width = window.screen.availWidth

  // перезагрузка при изменение ширины экрана
  window.addEventListener('resize', function () {
    if (width != window.screen.availWidth) {
      document.body.style.display = 'none'
      window.location.href = window.location.href
      return
    }
  })

  initHeader()
  // Инициализация меню
  const menu = new krelMenu()

  // Слайдер хиты продаж
  liteSlider('.hits .products', {
    response: 767,
  })

  //слайдер для брендов
  liteSlider('.brends__slider', {
    isCont: true,
    response: 767,
  })

  // иницицилизвция элемента изменения количества товара
  window.quantityFunction = quntityInit()
  window.krelMaskInput = krelMaskInput

  // попап обратный звонок
  krelPopup('.recall__btn', { anim: 'top' })
  krelMaskInput('popup__phone', '+7 (999) 999-99-99')

  if (width < 992) {
    // открытие меню
    document.querySelector('.header__menu__open').onclick = (e) => {
      e.preventDefault()

      if (document.body.classList.contains('header__menu--active')) {
        document.body.classList.remove('header__menu--active')
      } else {
        document.body.classList.add('header__menu--active')
      }
    }
    document.querySelector('.header__background').onclick = (e) => {
      document.body.classList.remove('header__menu--active')
    }
    // открытие поиска
    document.querySelector('.header__top__mob .header__search__btn').onclick =
      () => {
        document
          .querySelector('.dgwt-wcas-enable-mobile-form')
          .dispatchEvent(new Event('click'))
      }
    // перенос банера на мобильной
    const baner = document.querySelector('.novinki__right')
    if (baner) {
      console.log(baner)
      document
        .querySelector('.hits')
        .insertAdjacentHTML(
          'afterend',
          `<section><div class="container">${baner.outerHTML}</div></section>`
        )
      baner.remove()
    }
  }

  // скрол до уведомление о ошибке
  jQuery(function ($) {
    $.scroll_to_notices = function (scrollElement) {
      const headerHeight = document.querySelector('.header').offsetHeight + 20
      if (scrollElement.length) {
        $('html, body').animate(
          { scrollTop: scrollElement.offset().top - headerHeight },
          1000
        )
      }
    }
  })

  // обновление счетчика избранного в хедере при удалении из избраного
  jQuery(document).on('yith_wcwl_init_after_ajax', () => {
    const wishlist = document.querySelector('.wishlist-items-wrapper')
    if (wishlist) {
      const count = document.querySelector('.header__wishlist span')
      count.textContent = wishlist.children.length
    }
  })

  // откртыие товара в новой вкладке
  const productLinks = document.querySelectorAll(
    '.woocommerce-LoopProduct-link'
  )
  if (productLinks.length) {
    productLinks.forEach((link) => {
      link.setAttribute('target', '_blank')
    })
  }

  const offers = document.querySelector('.offers')
  if (offers) {
    krelSlider('.offers', {
      slidesToShow: 1,
      slidesToScroll: 1,
      infinity: true,
      autoplay: true,
      autoplaySpeed: 3000,
    })

    const cont = document.querySelector('.offers .container')
    console.log(window.screen.availWidth, cont)
    const otstup = (window.screen.availWidth - cont.offsetWidth) / 2
    document.querySelector('.offers .krel-prev').style.left = otstup + 'px'
    document.querySelector('.offers .krel-next').style.right = otstup + 'px'
  }
})

// прелодер
window.addEventListener('load', function () {
  document.querySelector('body').classList.add('loaded_hiding')
  setTimeout(() => {
    document.querySelector('body').classList.add('loaded')
  }, 200)
})
