import { Application } from 'express'
import { router as userRoutes } from './userRoutes'
import { router as postRoutes } from './postRoutes'
import { router as goodRoutes } from './goodRoutes'
import { router as orderRoutes } from './orderRoutes'

const routes = (app: Application) => {
	app.use(userRoutes, postRoutes, goodRoutes, orderRoutes)
}

export default routes
