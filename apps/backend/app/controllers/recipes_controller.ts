import type { HttpContext } from '@adonisjs/core/http'
import Recipe from '#models/recipe'
import { createRecipeValidator } from '#validators/recipe'

export default class RecipesController {
  /**
   * Liste des recettes publiques
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const recipes = await Recipe.query().orderBy('created_at', 'desc').paginate(page, limit)

    return response.ok(recipes)
  }

  /**
   * Détails d'une recette
   */
  async show({ params, response }: HttpContext) {
    const recipe = await Recipe.findOrFail(params.id)
    return response.ok(recipe)
  }

  /**
   * Créer une nouvelle recette
   */
  async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createRecipeValidator)
    const user = auth.getUserOrFail()

    const recipe = await Recipe.create({
      ...data,
      ingredients: JSON.stringify(data.ingredients),
      instructions: JSON.stringify(data.instructions),
      userId: user.id,
    })

    return response.created(recipe)
  }

  /**
   * Modifier une recette existante
   */
  // async update({ params, request, response, auth }: HttpContext) {
  //   const data = await request.validateUsing(updateRecipeValidator)
  //   const user = auth.getUserOrFail()

  //   const recipe = await Recipe.findOrFail(params.id)

  //   // Vérifier que l'utilisateur est le propriétaire de la recette
  //   if (recipe.userId !== user.id) {
  //     return response.forbidden({
  //       message: "Vous n'êtes pas autorisé à modifier cette recette",
  //     })
  //   }

  //   await recipe.merge(data).save()

  //   return response.ok(recipe)
  // }

  /**
   * Supprimer une recette
   */
  // async destroy({ params, response, auth }: HttpContext) {
  //   const user = auth.getUserOrFail()
  //   const recipe = await Recipe.findOrFail(params.id)

  //   // Vérifier que l'utilisateur est le propriétaire de la recette
  //   if (recipe.userId !== user.id) {
  //     return response.forbidden({
  //       message: "Vous n'êtes pas autorisé à supprimer cette recette",
  //     })
  //   }

  //   await recipe.delete()

  //   return response.ok({
  //     message: 'Recette supprimée avec succès',
  //   })
  // }
}
