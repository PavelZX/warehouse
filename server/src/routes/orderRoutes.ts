import { NextFunction, Request, Response, Router } from 'express'
import { OrderController } from '../controllers/OrderController'
import { isAuth } from '../middlewares/isAuth'

const router = Router()

router.get(
	'/orders',
	async (req: Request, res: Response, _next: NextFunction) => {
		try {
			const { cursor } = req.query
			const orders = await OrderController.getOrders(cursor)
			return res.json(orders)
		} catch (error) {
			return res.json([])
		}
	}
)

router.post(
	'/orders',
	isAuth,
	async (req: Request, res: Response, _next: NextFunction) => {
		try {
			const { userId: ownerId, title, text } = req.body
			const order = await OrderController.addOrder({ ownerId, title, text })
			return res.json(order)
		} catch (error) {
			return res.json(error)
		}
	}
)

export { router }
