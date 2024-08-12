import { initInfoBlock } from './initInfoBlock'

export function cartRightUpdateAction() {
  jQuery('.shipping_method').each(function () {
    if (jQuery(this).attr('checked')) {
      const shiping = jQuery(this).val()

      if (shiping === 'flat_rate:2') {
        const cost = jQuery(this).parent().children('label').children('span')
        initInfoBlock(cost[0].outerHTML)
      } else {
        initInfoBlock()
      }
    }
  })
}
