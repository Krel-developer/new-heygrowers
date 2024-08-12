import { initPaymentMethods } from './actions/initPayMethods'

export function cartUpdateAction_s3() {
  // Активируем кнопки выбора способа оплаты
  initPaymentMethods()
}
