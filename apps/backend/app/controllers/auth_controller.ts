import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await User.create(payload)

    return response.created(user)
  }

  async login({ request, response, auth }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator)

      // Vérification des identifiants et création du token
      const user = await User.verifyCredentials(email, password)
      const token = await auth.use('api').createToken(user)

      return response.ok({
        user: {
          id: user.id,
          email: user.email,
          full_name: user.fullName,
        },
        type: 'bearer',
        token: token.value!.release(),
      })
    } catch (error) {
      console.error('Erreur de connexion:', error)
      return response.unauthorized({ message: 'Identifiants invalides' })
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('api').invalidateToken()
    return response.ok({ message: 'Déconnexion réussie' })
  }
}
