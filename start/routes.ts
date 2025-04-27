import router from '@adonisjs/core/services/router'

const HomeController = () => import('../app/controllers/home_controller.js')

router.get('/', [HomeController, 'index']).as('home')
router.put('/', [HomeController, 'update']).as('home.update')

router.delete('/', [HomeController, 'destroy']).as('home.destroy')

