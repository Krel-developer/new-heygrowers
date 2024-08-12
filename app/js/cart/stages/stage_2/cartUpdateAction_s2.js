import {
  changeCurrentDeliveryItem,
  deliveryTuneDostavkaKurerom,
} from './delivery/initDeliveryItems'

export function cartUpdateAction_s2() {
  // Настраиваем доставку курьером
  deliveryTuneDostavkaKurerom()

  // Ставим значение доставки в псевдокорзине соотвественно оригинальной
  changeCurrentDeliveryItem()
}
