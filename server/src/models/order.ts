import { sequelize } from './index'
import { User } from './user'
import { Good } from './good'
import {
	Association,
	DataTypes,
	HasManyAddAssociationMixin,
	HasManyCountAssociationsMixin,
	HasManyCreateAssociationMixin,
	HasManyGetAssociationsMixin,
	HasManyHasAssociationMixin,
	Model,
	Optional,
} from 'sequelize'

interface OrderAttributes {
	id: string
	title: string
	text: string
	points: number
	ownerId: string
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order
	extends Model<OrderAttributes, OrderCreationAttributes>
	implements OrderAttributes {
	public id!: string
	public title!: string
	public text!: string
	public points!: number
	public ownerId!: string
	public readonly createdAt!: Date
	public readonly updatedAt!: Date

	public getGoods!: HasManyGetAssociationsMixin<Good>
	public addGood!: HasManyAddAssociationMixin<Good, number>
	public hasGood!: HasManyHasAssociationMixin<Good, number>
	public countGoods!: HasManyCountAssociationsMixin
	public createGoods!: HasManyCreateAssociationMixin<Good>

	public readonly goods?: Good[]

	public static associations: {
		goods: Association<Order, Good>
	}
}

Order.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		text: {
			type: DataTypes.TEXT,
			defaultValue: '',
		},
		points: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		ownerId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
		},
	},
	{
		sequelize,
		modelName: 'Order',
	}
)

export { Order, OrderAttributes, OrderCreationAttributes }
