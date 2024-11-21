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
router.post('/products', [ProductsController, 'store']) // create product
router.get('/products', [ProductsController, 'index']) // get all products
router.get('/products/show', [ProductsController, 'show']) // get product by PLU or name in query params

// shops routes
router.post('/shops', [ShopsController, 'store']) // create shop
router.get('/shops', [ShopsController, 'index']) // get all shops

// inventories routes
router.post('/inventories', [InventoriesController, 'store']) // create inventory JSON payload
router.get('/inventories', [InventoriesController, 'index']) // get inventories by filters in query params
router.put('/inventories', [InventoriesController, 'edit']) // update inventory JSON payload
