/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const ProductsController = () => import('#controllers/products_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/products', [ProductsController, 'store'])
router.get('/products/show/:PLU', [ProductsController, 'show'])
router.get('/products/:name', [ProductsController, 'showByName'])
