import { initDeliveryItems } from './delivery/initDeliveryItems'
import { initSamovivozDelivery } from './delivery/samovivoz'
import { initSdekDelivery } from './delivery/sdek'
export function initStage_2() {
  initDeliveryItems()

  // Поле адресса самовывоза

  initSamovivozDelivery()

  // Активируем виджет СДЕКа

  initSdekDelivery()
}
