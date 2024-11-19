import vine from '@vinejs/vine'

export const createInventoryValidator = vine.compile(
  vine.object({
    PLU: vine.string().minLength(6).maxLength(6),
    shop_id: vine.number().positive(),
    quantity_on_shelf: vine.number(),
    quantity_in_order: vine.number(),
  })
)
export const updateInventoryValidator = vine.compile(
  vine.object({
    PLU: vine.string().minLength(6).maxLength(6),
    shop_id: vine.number().positive(),
    quantity_on_shelf: vine.number(),
    quantity_in_order: vine.number(),
  })
)
