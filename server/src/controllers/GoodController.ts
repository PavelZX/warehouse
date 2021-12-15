import { Op } from 'sequelize'
import { Good, User } from '../models'

export class GoodController {
	static async getGoods(lastGoodDate: any = new Date(), limit = 10) {
		try {
			const limitPlusOne = limit + 1

			const goods = await Good.findAll({
				order: [['createdAt', 'DESC']],
				include: [{ model: User, as: 'owner', attributes: ['id', 'username'] }],
				limit: limitPlusOne,
				where: {
					createdAt: { [Op.lt]: lastGoodDate },
				} as any,
			})

			return {
				goods: goods.slice(0, limit).map(good => {
					const snippet = good.text.substring(0, 50).trim()
					const elipsis = good.text.trim().length > 50 ? '...' : ''
					good.text = `${snippet}${elipsis}`
					return good
				}),
				hasMore: goods.length === limitPlusOne,
			}
		} catch (error) {
			return []
		}
	}

	static async addGood({
		ownerId,
		title,
		text,
	}: {
		ownerId: string
		title: string
		text: string
	}) {
		try {
			const good = await Good.create({
				title,
				text,
				ownerId,
				points: 0,
			})

			await good.save()
			return good
		} catch (error) {
			throw error
		}
	}
}
