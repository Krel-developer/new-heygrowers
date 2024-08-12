export function initSdekDelivery() {
  // модуль сдэк

  // модуль версии api 3.0
  // window.widget = new window.CDEKWidget({
  //   apiKey: 'f7658099-573e-4534-8a84-845ef757c0f9',
  //   defaultLocation: 'Санкт-Петербург',
  //   hideFilters: {
  //     have_cashless: true,
  //     have_cash: true,
  //     is_dressing_room: true,
  //     type: true,
  //   },
  //   hideDeliveryOptions: {
  //     door: true,
  //   },
  //   popup: true,
  //   onChoose(type, tariff, address) {
  //     console.log(type, tariff, address)
  //     document.getElementById(
  //       'billing_address_2'
  //     ).value = `г. ${address.city} ${address.address}`
  //     const text = `Вы выбрали пункт выдчи СДЭК по адресу г. ${address.city} ${address.address}`
  //     document.getElementById('sdek__adress').textContent = text

  //     krelToast.toast(text)
  //   },
  // })

  // модуль версии api 2.0
  window.widget = new ISDEKWidjet({
    // country: 'Россия',
    defaultCity: 'Санкт-Петербург', //какой город отображается по умолчанию
    cityFrom: 'Санкт-Петербург', // из какого города будет идти доставка
    // country: 'Россия', // можно выбрать страну, для которой отображать список ПВЗ
    apikey: 'ce6e6098-99ea-4b80-abad-2cba6f28d5be',
    link: false,
    popup: true,
    hidedelt: true,
    hidedress: true,
    hidecash: true,
    path: 'https://heygrowers.ru/wp-content/themes/new-heygrowers/assets/widget/scripts/',
    servicepath:
      'https://heygrowers.ru/wp-content/themes/new-heygrowers/assets/widget/scripts/service.php', //ссылка на файл service.php на вашем сайте
    templatepath:
      'https://heygrowers.ru/wp-content/themes/new-heygrowers/assets/widget/scripts/template.php', //ссылка на файл template.php на вашем сайте
  })
  widget.binders.add(choosePVZ, 'onChoose')
  widget.binders.add(readyPVZ, 'onReady')

  document.getElementById('billing_address_2').value = ''

  function choosePVZ(wat) {
    const adres = `г. ${wat.cityName}, ${wat.PVZ.Address}`
    document.getElementById(
      'billing_address_2'
    ).value = ` г. ${wat.cityName}, ${wat.PVZ.Address}`
    const text = `Вы выбрали пункт выдчи СДЭК по адресу г. ${wat.cityName}, ${wat.PVZ.Address}`
    document.querySelector(
      '.krel_checkout__shipping__sdek__title'
    ).textContent = text

    krelToast.toast(text)
    const sdek = document.querySelector('.krel_checkout__shipping__sdek__title')
    sdek.classList.remove('krel_checkout__shipping__sdek__title_error')
    sdek.dataset.filled = 'true'
  }

  function readyPVZ() {
    console.log('ready')

    const searchList = document.querySelector('.CDEK-widget__search-list ul')

    if (searchList)
      searchList.addEventListener('click', (e) => {
        const li = e.target.closest('li')

        if (li) {
          const country = li.children[1].textContent.split(', ')[1]
          console.log(country)

          jQuery('#billing_country_custom').val(country)
          if (countryMap[country]) {
            jQuery('#billing_country').val(countryMap[country])
          } else {
            jQuery('#billing_country').val('RU')
            console.log('нет в спеецификации')
          }
        }
      })
  }
}

const countryMap = {
  Россия: 'RU',
  Казахстан: 'KZ',
  Армения: 'AM',
  Беларусь: 'BY',
  Киргизия: 'KG',
  Узбекистан: 'UZ',
  Таджикистан: 'TJ',
}
