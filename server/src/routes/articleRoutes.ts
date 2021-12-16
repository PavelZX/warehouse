import { NextFunction, Request, Response, Router } from 'express'
import { ArticleController } from '../controllers/ArticleController'
import { isAuth } from '../middlewares/isAuth'

const router = Router()

router.get(
	'/articles',
	async (req: Request, res: Response, _next: NextFunction) => {
		try {
			const { cursor } = req.query
			const articles = await ArticleController.getArticles(cursor)
			return res.json(articles)
		} catch (error) {
			return res.json([])
		}
	}
)

router.post(
	'/articles',
	isAuth,
	async (req: Request, res: Response, _next: NextFunction) => {
		try {
			const { userId: ownerId, title, text } = req.body
			const article = await ArticleController.addArticle({ ownerId, title, text })
			return res.json(article)
		} catch (error) {
			return res.json(error)
		}
	}
)

export { router }
