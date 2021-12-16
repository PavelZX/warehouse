import { Op } from 'sequelize'
import { Article, User } from '../models'

export class ArticleController {
	static async getArticles(lastArticleDate: any = new Date(), limit = 10) {
		try {
			const limitPlusOne = limit + 1

			const articles = await Article.findAll({
				order: [['createdAt', 'DESC']],
				include: [{ model: User, as: 'owner', attributes: ['id', 'username'] }],
				limit: limitPlusOne,
				where: {
					createdAt: { [Op.lt]: lastArticleDate },
				} as any,
			})

			return {
				articles: articles.slice(0, limit).map(article => {
					const snippet = article.text.substring(0, 50).trim()
					const elipsis = article.text.trim().length > 50 ? '...' : ''
					article.text = `${snippet}${elipsis}`
					return article
				}),
				hasMore: articles.length === limitPlusOne,
			}
		} catch (error) {
			return []
		}
	}

	static async addArticle({
		ownerId,
		title,
		text,
	}: {
		ownerId: string
		title: string
		text: string
	}) {
		try {
			const article = await Article.create({
				title,
				text,
				ownerId,
				points: 0,
			})

			await article.save()
			return article
		} catch (error) {
			throw error
		}
	}
}
