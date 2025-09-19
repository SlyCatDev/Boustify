import type { HttpContext } from '@adonisjs/core/http'
// import User from '#models/user'
// import { updateProfileValidator } from '#validators/user'
// import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  /**
   * Récupérer le profil de l'utilisateur connecté
   */
  async profile({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    return response.ok({
      id: user.id,
      email: user.email,
      full_name: user.fullName,
      created_at: user.createdAt,
    })
  }

  /**
   * Mettre à jour le profil de l'utilisateur connecté
   */
  async update({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(updateProfileValidator)

    // Si un nouveau mot de passe est fourni, vérifions d'abord l'ancien
    if (data.new_password) {
      const isValid = await hash.verify(user.password, data.current_password!)
      if (!isValid) {
        return response.unprocessableEntity({
          errors: [{ message: 'Le mot de passe actuel est incorrect' }],
        })
      }
      user.password = data.new_password
    }

    // Mise à jour des autres champs
    if (data.full_name) user.fullName = data.full_name
    if (data.email) user.email = data.email

    await user.save()

    return response.ok({
      id: user.id,
      email: user.email,
      full_name: user.fullName,
      created_at: user.createdAt,
    })
  }

  /**
   * Supprimer le compte de l'utilisateur connecté
   */
  async destroy({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    await user.delete()

    return response.ok({ message: 'Compte supprimé avec succès' })
  }
}
