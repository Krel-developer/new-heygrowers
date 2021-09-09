export class krelMenu {
  constructor() {
    this.menu = document.querySelector('.catalog__list')
    this.menuCont = this.menu.querySelector('.catalog__list__left').children[0]
    this.onMouseOver = this.onMouseOver.bind(this)
    this.init()
  }
  init() {
    const width = window.screen.availWidth
    for (let i = 0; i < this.menuCont.children.length; i++) {
      const btn = this.menuCont.children[i]

      if (btn.children[1]) {
        const subs = btn.children[1].querySelectorAll(
          '.catalog__list__has__subs'
        )

        if (subs.length) {
          subs.forEach((sub) => {
            this.createArowBtn(sub)
          })
        }

        if (width > 767) {
          btn.children[0].addEventListener('mouseover', this.onMouseOver)
          if (i === 0) {
            btn.children[0].removeEventListener('mouseover', this.onMouseOver)
            this.currentMainCateg = btn.children[0]
            btn.children[0].classList.add('categ__active')
            btn.children[1].classList.add('catalog__list__childrens__active')
          }
        } else {
          if (btn.children[1].children[0].children.length) {
            this.createArowBtn(btn)
          }
        }
      }
    }

    this.initBtn()
    this.background = document.createElement('div')
    this.background.classList.add('catalog__list__background')
    this.background.addEventListener('click', this.close.bind(this))
    this.menu.after(this.background)
  }
  onMouseOver(e) {
    if (this.currentMainCateg) {
      this.currentMainCateg.parentNode.children[1].classList.remove(
        'catalog__list__childrens__active'
      )
      this.currentMainCateg.addEventListener('mouseover', this.onMouseOver)
      this.currentMainCateg.classList.remove('categ__active')
    }
    this.currentMainCateg = e.target
    e.target.parentNode.children[1].classList.add(
      'catalog__list__childrens__active'
    )
    e.target.removeEventListener('mouseover', this.onMouseOver)
    e.target.classList.add('categ__active')
  }
  initBtn() {
    this.btn = document.querySelector('.catalog__btn')
    this.btn.onclick = () => {
      if (this.menu.style.display === 'none') {
        this.open()
      } else {
        this.close()
      }
    }
  }
  createArowBtn(li) {
    const subBtn = document.createElement('div')
    const subCont = li.children[1]
    const subBtnCont = document.createElement('div')
    subBtnCont.classList.add('catalog__list__link__cont')
    subBtn.classList.add('sub__btn')
    subBtnCont.append(li.children[0])
    subBtnCont.append(subBtn)
    subCont.before(subBtnCont)
    subBtn.onclick = (e) => {
      e.preventDefault()
      if (subBtnCont.classList.contains('open')) {
        subBtnCont.classList.remove('open')
        subCont.style.height = subCont.offsetHeight + 'px'
        setTimeout(() => {
          subCont.style.height = null
        }, 0)
      } else {
        subBtnCont.classList.add('open')
        subCont.style.height = subCont.children[0].scrollHeight + 'px'
        setTimeout(() => {
          subCont.style.height = 'auto'
        }, 300)
      }
    }
  }
  close() {
    this.menu.style.opacity = null
    document.body.style.overflow = null
    this.background.classList.remove('active')
    document.body.classList.remove('header__mini')
    setTimeout(() => {
      this.menu.style.display = 'none'
    }, 300)
    this.btn.classList.remove('active')
  }
  open() {
    this.menu.style.display = null
    document.body.style.overflow = 'hidden'
    document.body.classList.add('header__mini')
    setTimeout(() => {
      this.menu.style.opacity = '1'
      this.background.classList.add('active')
    }, 0)
    this.btn.classList.add('active')
  }
}
