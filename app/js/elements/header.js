export function initHeader() {
  miniHeader()
}

function miniHeader() {
  const width = window.screen.availWidth
  if (width > 991) {
    const headerTop = document.querySelector('.header__top')
    window.addEventListener('scroll', (e) => {
      if (window.scrollY > 50) {
        document.body.classList.add('header__mini')
      } else {
        document.body.classList.remove('header__mini')
      }
    })
    const searchBtn = document.querySelector(
      '.header__search .header__search__btn'
    )
    searchBtn.onclick = () => {
      document
        .querySelector('.dgwt-wcas-search-form')
        .dispatchEvent(new Event('submit'))
    }
  }
}
