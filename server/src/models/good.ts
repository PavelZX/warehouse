import { sequelize } from './index'
import { User } from './user'
import { DataTypes, Model, Optional } from 'sequelize'

interface GoodAttributes {
	id: string
	title: string
	text: string
	points: number
	ownerId: string
}

interface GoodCreationAttributes extends Optional<GoodAttributes, 'id'> {}

class Good
	extends Model<GoodAttributes, GoodCreationAttributes>
	implements GoodAttributes {
	public id!: string
	public title!: string
	public text!: string
	public points!: number
	public ownerId!: string
	public readonly createdAt!: Date
	public readonly updatedAt!: Date
}

Good.init(
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
		modelName: 'Good',
	}
)

export { Good, GoodAttributes, GoodCreationAttributes }
