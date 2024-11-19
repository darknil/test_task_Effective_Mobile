import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    PLU: vine.string().minLength(6).maxLength(6),
    name: vine.string().minLength(2).maxLength(15),
  })
)
export const updateProductValidator = vine.compile(
  vine.object({
    PLU: vine.string().minLength(6).maxLength(6),
    name: vine.string().minLength(1).maxLength(15),
  })
)
export const NameQueryValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
  })
)
