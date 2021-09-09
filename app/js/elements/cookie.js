export function initCookie() {
  const isCookie = localStorage.getItem('cookieAcepted')
  if (!isCookie) {
    const cookieHtml = `
    <div class="cookie">
      <div class="cookie__cont">
        <div class="cookie__top">
          <div>Мы используем файлы cookie. <a href="">Подробнее</a></div>
          <div class='cookie__btn'>Я согласен</div>
        </div>
        <div class="cookie__bottom">
          <div>Продолжая использовать наш сайт, вы даете согласие на обработку файлов cookie (пользовательских данных, содержащих сведения о местоположении; тип, язык и версию ОС; тип, язык и версию браузера; сайт или рекламный сервис, с которого пришел пользователь; тип, язык и разрешение экрана устройства, с которого пользователь обращается к сайту; ip-адрес, с которого пользователь обращается к сайту; сведения о взаимодействии пользователя с web-интерфейсом и службами сайта) в целях аутентификации пользователя на сайте, проведения ретаргетинга, статистических исследований и обзоров. Если вы не хотите, чтобы ваши данные обрабатывались, покиньте сайт.</div>
        </div>
      </div>
    </div>   
  `

    document.body.insertAdjacentHTML('afterbegin', cookieHtml)
    document.body.classList.add('cookie__init')
    const cookie = document.querySelector('.cookie__cont')
    cookie.querySelector('a').onclick = (e) => {
      e.preventDefault()
      const a = e.target
      if (a.classList.contains('active')) {
        a.classList.remove('active')
        cookie.children[1].style.height = null
        a.textContent = 'Подробнее'
        document.body.style.setProperty('--jivo-cookie-margin', null)
      } else {
        a.classList.add('active')
        const height = cookie.children[1].children[0].offsetHeight
        cookie.children[1].style.height = height + 'px'
        a.textContent = 'Скрыть'
        document.body.style.setProperty(
          '--jivo-cookie-margin',
          height + 57 + 'px'
        )
      }
    }
    cookie.querySelector('.cookie__btn').onclick = () => {
      document.body.classList.remove('cookie__init')
      document.body.style.setProperty('--jivo-cookie-margin', null)
      localStorage.setItem('cookieAcepted', true)
      cookie.parentNode.remove()
    }
  }
}
