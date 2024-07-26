export function initDaDataOptions() {
  // отключиили все стандартные поля
  const ids_input_expseption = [
    'billing_first_name',
    'shipping_first_name',
    'billing_last_name',
    'shipping_last_name',
    'billing_address_1',
    'shipping_address_1',
    'billing_email',
    'billing_company',
    'billing_bank',
  ]

  ids_input = ids_input.filter((el) => !ids_input_expseption.includes(el[0]))
}
