/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
// const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return {
    message: 'Hello from Adonis !',
  }
})

/**
 * Routes d'authentification
 * ----------------------------------------
 * /auth/register - Inscription
 * /auth/login    - Connexion
 * /auth/logout   - Déconnexion (protégée)
 */
router
  .group(() => {
    // Routes publiques
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])

    // Routes protégées
    router.post('/logout', [AuthController, 'logout']).use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('/auth')

/**
 * Routes utilisateur
 * ----------------------------------------
 * /users/profile      - Obtenir le profil (GET)
 * /users/profile      - Mettre à jour le profil (PATCH)
 * /users/profile      - Supprimer le compte (DELETE)
 */
// router
//   .group(() => {
//     router.get('/profile', [UsersController, 'profile'])
//     router.patch('/profile', [UsersController, 'update'])
//     router.delete('/profile', [UsersController, 'destroy'])
//   })
//   .prefix('/users')
//   .use(middleware.auth({ guards: ['api'] }))
