import { Sequelize } from 'sequelize'
import conf from '../config/config.json'

const env = process.env.NODE_ENV || 'development'
const config = (conf as any)[env]
const sequelize = config.use_env_variable
	? new Sequelize(process.env[config.use_env_variable] as string, config)
	: new Sequelize(config.database, config.username, config.password, config)

export { sequelize }

import { Article } from './article'
import { Order } from './order'
import { Good } from './good'
import { User } from './user'

User.hasMany(Article, {
	sourceKey: 'id',
	foreignKey: { allowNull: false, name: 'ownerId' },
	as: 'articles',
	onDelete: 'CASCADE',
})
User.belongsToMany(Good, {
	through: Order,
	foreignKey: { allowNull: false, name: 'goodId' },
	onDelete: 'CASCADE',
})

Article.belongsTo(User, {
	foreignKey: { name: 'ownerId' },
	as: 'owner',
})
Good.belongsToMany(User, {
	through: Order,
	foreignKey: { allowNull: false, name: 'goodId' },
	onDelete: 'CASCADE',
})

Order.hasMany(Good, {
	foreignKey: 'orderId',
	as: 'goods',
})

Good.belongsTo(Order, {
	foreignKey: 'orderId',
	as: 'order'
})

export { Article, Good, Order, User, Sequelize }
