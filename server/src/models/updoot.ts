import { sequelize } from './index'
import { Article } from './article'
import { Good } from './good'
import { Order } from './order'
import { User } from './user'
import { DataTypes, Model, Optional } from 'sequelize'

interface UpdootAttributes {
	id: string
	value: number
	userId: string
	articleId: string
	goodId: string
	orderId: string
}

interface UpdootCreationAttributes extends Optional<UpdootAttributes, 'id'> {}

class Updoot extends Model<UpdootAttributes, UpdootCreationAttributes> {}

Updoot.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		value: {
			type: DataTypes.INTEGER,
			validate: {
				max: 1,
				min: -1,
			},
			allowNull: false,
			defaultValue: 0,
		},
		userId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
		},
		articleId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Article,
				key: 'id',
			},
		},
		goodId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Good,
				key: 'id',
			},
		},
		orderId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Order,
				key: 'id',
			},
		},
	},
	{
		sequelize,
		modelName: 'Updoot',
	}
)

export { Updoot, UpdootAttributes, UpdootCreationAttributes }
