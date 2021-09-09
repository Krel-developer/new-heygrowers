import { initBtnAddToCartAnim } from './elements/animAddToCart'

function catalogInit() {
  initPriceRange()
  initFilter()
  initProductList()
  initOrderBy()
  initBtnAddToCartAnim()
  initLoadMoreBtn()

  const btn = document.querySelector('.woof_reset_search_form')
  if (btn) {
    btn.textContent = 'Сбросить '
  }
  const filterBtn = document.querySelector('.btn__filter__open')
  if (filterBtn) {
    filterBtn.onclick = () => {
      document.body.classList.add('filter--open')
    }
  }
}
function initPriceRange() {
  const inputCont = document.querySelector('.price_slider_amount')
  if (inputCont) {
    const min = document.createElement('div')
    const max = document.createElement('div')
    min.classList.add('price_slider_amount__cont', 'price_slider_amount__min')
    max.classList.add('price_slider_amount__cont', 'price_slider_amount__max')
    min.append(inputCont.children[0])
    max.append(inputCont.children[0])
    inputCont.prepend(max)
    inputCont.prepend(min)

    min.insertAdjacentHTML(
      'afterend',
      '<span class="price_slider_amount__line"></span>'
    )
    inputCont.insertAdjacentHTML(
      'beforebegin',
      `<div class="min__max__text"><div>${min.children[0].getAttribute(
        'data-min'
      )}</div><div>${max.children[0].getAttribute('data-max')}</div></div>`
    )
  }
}

function initFilter() {
  const counts = document.querySelectorAll('.woof_checkbox_count')
  if (counts.length) {
    counts.forEach((count) => {
      if (count.textContent === '(0)') {
        count.parentNode.parentNode.remove()
      } else {
        count.textContent = count.textContent.replace('(', '')
        count.textContent = count.textContent.replace(')', '')
      }
    })
    const conts = document.querySelectorAll('.woof_list_checkbox')
    if (conts.length) {
      conts.forEach((cont) => {
        if (!cont.children.length) {
          cont.closest('.woof_container').style.display = 'none'
        }
      })
    }
  }
}

function initProductList() {
  const categories = document.querySelectorAll('.product-category')
  if (categories.length) {
    const categoryCont = document.createElement('div')
    const categoryUl = document.createElement('ul')
    categoryCont.classList.add('product-category__cont')
    categoryUl.classList.add('products')
    categories.forEach((category) => {
      categoryUl.append(category)
    })
    const li = '<li class="product-category product-category__void"></li>'
    const html = li + li + li + li + li
    categoryUl.insertAdjacentHTML('beforeend', html)
    categoryCont.append(categoryUl)
    document.querySelector('.woof_shortcode_output').prepend(categoryCont)
  }
}

function initDescription() {
  const desc = document.querySelector('.term-description')
  if (desc) {
    const cont = document.createElement('div')
    const btn = document.createElement('div')
    cont.classList.add('term-description__cont')
    btn.classList.add('term-description__btn')
    btn.textContent = 'Читать подробнее'
    cont.append(desc)
    document.querySelector('.woocommerce-products-header').append(cont)
    cont.after(btn)
    btn.onclick = () => {
      if (btn.classList.contains('active')) {
        btn.classList.remove('active')
        cont.style.height = null
        btn.textContent = 'Читать подробнее'
      } else {
        btn.classList.add('active')
        cont.style.height = cont.children[0].offsetHeight + 'px'
        btn.textContent = 'Скрыть'
      }
    }
  }
}

function initOrderBy() {
  const form = document.querySelector('.woocommerce-ordering')
  if (form) {
    const btns = document.createElement('div')
    btns.classList.add('orderby__btns')
    for (let i = 0; i < form.children[0].children.length; i++) {
      const option = form.children[0].children[i]
      if (!(option.textContent === 'Сортировка')) {
        const btn = document.createElement('div')
        if (option.getAttribute('selected') === 'selected') {
          btn.classList.add('active')
        }
        btn.classList.add('orderby__btn')
        btn.onclick = () => {
          woof_current_values.orderby = option.value
          woof_ajax_page_num = 1
          woof_submit_link(woof_get_submit_link(), 0)
        }
        btn.textContent = option.textContent
        btns.append(btn)
      }
    }
    const text = document.createElement('div')
    text.classList.add('orderby__btn', 'orderby__text')
    text.textContent = 'Сортировать по:'
    btns.prepend(text)
    form.after(btns)
  }
}

function filterMob() {
  const filterBtn = document.querySelector('.btn__filter__open')
  if (filterBtn) {
    filterBtn.onclick = () => {
      document.body.classList.add('filter--open')
    }
  }
  document.querySelector('.shop__left__close').onclick = () => {
    document.body.classList.remove('filter--open')
  }
  document.querySelector('.shop__left__background').onclick = () => {
    document.body.classList.remove('filter--open')
  }
}

function scrollToFilterResult() {
  const headerHeight = document.querySelector('.header').offsetHeight
  const result = document.getElementById('woof_results_by_ajax')
  if (result) {
    jQuery('html, body').animate(
      { scrollTop: result.offsetTop - headerHeight },
      1000
    )
  }
}

function initLoadMoreBtn() {
  const next = document.querySelector('.page-numbers.next')
  if (next) {
    const btn = document.createElement('div')
    btn.textContent = 'Показать еще'
    btn.classList.add('shop__left__more')
    btn.onclick = () => {
      const max = document.querySelector('.page-numbers.next span')
      if (max) {
      }
      let href = window.location.href
      href = href.split('?')
      const current = +document.querySelector('.page-numbers.current')
        .textContent
      let query = ''
      if (href[1]) {
        query = '?' + href[1]

        query = query.replace(`paged=${current}`, `paged=${current + 1}`)
      }
      let main = href[0].split('page')[0]
      history.pushState(null, null, `${main}${query}`)
      const resultLink = `${main}page/${current + 1}/${query}`
      if (+max.textContent === current + 1) {
        btn.remove()
      }
      load_next_page(false, resultLink)
    }

    document.querySelector('#woof_results_by_ajax .products').after(btn)
  }
}

function afterFilterFound() {
  catalogInit()
  scrollToFilterResult()
  krelLazyLoad()

  // откртыие товара в новой вкладке
  const productLinks = document.querySelectorAll(
    '.woocommerce-LoopProduct-link'
  )
  if (productLinks.length) {
    productLinks.forEach((link) => {
      link.setAttribute('target', 'blank')
    })
  }
}
document.addEventListener('DOMContentLoaded', () => {
  catalogInit()
  initDescription()
  filterMob()

  window.afterFilterFound = afterFilterFound

  // обновление счетчика избранного в хедере при добавление в избраное
  jQuery('body').on('added_to_wishlist', () => {
    const count = document.querySelector('.header__wishlist span')
    count.textContent = +count.textContent + 1
  })
})
