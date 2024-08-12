import { cartRightUpdateAction } from './cart_right/cartRightUpdateAction'
import { cartUpdateAction_s1 } from './stages/stage_1/cartUpdateAction_s1'
import { cartUpdateAction_s2 } from './stages/stage_2/cartUpdateAction_s2'
import { cartUpdateAction_s3 } from './stages/stage_3/cartUpdateAction_s3'

export function initCartEvents() {
  console.log('initCArt Event')
  jQuery('body').on('updated_checkout', function () {
    // Здесь описаны вссе деййствия в правой части корзины(Информация о зазказе) при обновлении корзины

    cartRightUpdateAction()

    // Здесь описаны все действия в блоке шаг 1 (корзина) при обновлении корзины
    cartUpdateAction_s1()

    // Здесь описаны все действия в блоке шаг 2 (доставка) при обновлении корзины
    cartUpdateAction_s2()

    // Здесь описаны все действия в блоке шаг 3 (оформление) при обновлении корзины
    cartUpdateAction_s3()

    // Выключаем прилеадер для корзины

    document.querySelector(
      '.custom_checkout_cart__right__cont__preloader'
    ).style.display = null
  })

  jQuery('body').on('update_checkout', function () {
    // Включаем прилеадер для корзины
    document.querySelector(
      '.custom_checkout_cart__right__cont__preloader'
    ).style.display = 'block'
  })
}
