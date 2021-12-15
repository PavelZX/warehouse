import { Op } from 'sequelize'
import { Order, User } from '../models'

export class OrderController {
	static async getOrders(lastOrderDate: any = new Date(), limit = 10) {
		try {
			const limitPlusOne = limit + 1

			const orders = await Order.findAll({
				order: [['createdAt', 'DESC']],
				include: [{ model: User, as: 'owner', attributes: ['id', 'username'] }],
				limit: limitPlusOne,
				where: {
					createdAt: { [Op.lt]: lastOrderDate },
				} as any,
			})

			return {
				orders: orders.slice(0, limit).map(order => {
					const snippet = order.text.substring(0, 50).trim()
					const elipsis = order.text.trim().length > 50 ? '...' : ''
					order.text = `${snippet}${elipsis}`
					return order
				}),
				hasMore: orders.length === limitPlusOne,
			}
		} catch (error) {
			return []
		}
	}

	static async addOrder({
		ownerId,
		title,
		text,
	}: {
		ownerId: string
		title: string
		text: string
	}) {
		try {
			const order = await Order.create({
				title,
				text,
				ownerId,
				points: 0,
			})

			await order.save()
			return order
		} catch (error) {
			throw error
		}
	}
}
