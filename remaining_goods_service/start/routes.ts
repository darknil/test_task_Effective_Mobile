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
const ShopsController = () => import('#controllers/shops_controller')
const InventoriesController = () => import('#controllers/inventories_controller')
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// products routes
router.post('/products', [ProductsController, 'store'])
router.get('/products', [ProductsController, 'index'])
router.get('/products/show', [ProductsController, 'show'])

// shops routes
router.post('/shops', [ShopsController, 'store'])
router.get('/shops', [ShopsController, 'index'])

// inventories routes
router.post('/inventories', [InventoriesController, 'store'])
router.get('/inventories', [InventoriesController, 'index'])
router.put('/inventories', [InventoriesController, 'edit'])
