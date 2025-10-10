import vine from '@vinejs/vine'

/**
 * Validateur pour la création d'une recette
 */
export const createRecipeValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).maxLength(255),
    description: vine.string().optional(),
    ingredients: vine.array(
      vine.object({
        name: vine.string().minLength(2).maxLength(100),
        quantity: vine.string().maxLength(50),
        unit: vine.string().maxLength(20).optional(),
      })
    ),
    instructions: vine.array(vine.string().minLength(10)),
    prepTime: vine.number().positive(),
    cookTime: vine.number().positive(),
    servings: vine.number().positive(),
    category: vine.string().maxLength(50),
  })
)

/**
 * Validateur pour la mise à jour d'une recette
 */
export const updateRecipeValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).maxLength(255).optional(),
    description: vine.string().optional(),
    ingredients: vine
      .array(
        vine.object({
          name: vine.string().minLength(2).maxLength(100),
          quantity: vine.string().maxLength(50),
          unit: vine.string().maxLength(20).optional(),
        })
      )
      .optional(),
    instructions: vine.array(vine.string().minLength(10)).optional(),
    prepTime: vine.number().positive().optional(),
    cookTime: vine.number().positive().optional(),
    servings: vine.number().positive().optional(),
    category: vine.string().maxLength(50).optional(),
  })
)
