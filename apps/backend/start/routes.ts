/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    message: 'Hello from Adonis !',
  }
})

// auth.ts

// inscription
router.get('/register', 'AuthController.register')

// connexion
router.get('/login', 'AuthController.login')
