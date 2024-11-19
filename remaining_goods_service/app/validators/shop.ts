import vine from '@vinejs/vine'

export const createShopValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(15),
  })
)
export const updateShopValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(1).maxLength(15),
  })
)
