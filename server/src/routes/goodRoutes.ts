import { NextFunction, Request, Response, Router } from 'express'
import { GoodController } from '../controllers/GoodController'
import { isAuth } from '../middlewares/isAuth'

const router = Router()

router.get(
	'/goods',
	async (req: Request, res: Response, _next: NextFunction) => {
		try {
			const { cursor } = req.query
			const goods = await GoodController.getGoods(cursor)
			return res.json(goods)
		} catch (error) {
			return res.json([])
		}
	}
)

router.post(
	'/goods',
	isAuth,
	async (req: Request, res: Response, _next: NextFunction) => {
		try {
			const { userId: ownerId, title, text } = req.body
			const good = await GoodController.addGood({ ownerId, title, text })
			return res.json(good)
		} catch (error) {
			return res.json(error)
		}
	}
)

export { router }
