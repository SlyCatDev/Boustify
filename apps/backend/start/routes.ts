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
const UsersController = () => import('#controllers/users_controller')
const RecipesController = () => import('#controllers/recipes_controller')

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
router
  .group(() => {
    router.get('/profile', [UsersController, 'profile'])
    // router.patch('/profile', [UsersController, 'update'])
    // router.delete('/profile', [UsersController, 'destroy'])
  })
  .prefix('/users')
  .use(middleware.auth({ guards: ['api'] }))

/**
 * Routes recettes
 * ----------------------------------------
 * GET    /recipes      - Liste des recettes publiques
 * POST   /recipes      - Créer une nouvelle recette
 * GET    /recipes/:id  - Détails d'une recette
 * PATCH  /recipes/:id  - Modifier une recette
 * DELETE /recipes/:id  - Supprimer une recette
 */
router
  .group(() => {
    // Routes publiques
    router.get('/', [RecipesController, 'index']) // Liste des recettes
    router.get('/:id', [RecipesController, 'show']) // Détails d'une recette

    // Routes protégées (nécessitent une authentification)
    router
      .group(() => {
        router.post('/', [RecipesController, 'store']) // Créer
        // router.patch('/:id', [RecipesController, 'update'])    // Modifier
        // router.delete('/:id', [RecipesController, 'destroy'])  // Supprimer
      })
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('/recipes')
