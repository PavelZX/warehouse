import { Application } from 'express'
import { router as userRoutes } from './userRoutes'
import { router as articleRoutes } from './articleRoutes'
import { router as goodRoutes } from './goodRoutes'
import { router as orderRoutes } from './orderRoutes'

const routes = (app: Application) => {
	app.use(userRoutes, articleRoutes, goodRoutes, orderRoutes)
}

export default routes
