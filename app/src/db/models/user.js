import { DataTypes } from 'sequelize';
import sequelize from '../connector.js';

const User = sequelize.define(
	'User',
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		firstName: {
			type: DataTypes.STRING
		},
		lastName: {
			type: DataTypes.STRING
		},
		biography: {
			type: DataTypes.TEXT
		},
		roleId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Roles',
				key: 'id'
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE'
		}
	},
	{
		tableName: 'Users',
		timestamps: true,
		hooks: {
			// Logic after creating a user
			// afterCreate: (user, options) => {
			// }
		}
	}
);

const Roles = sequelize.define(
	'Roles',
	{
		slug: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		title: {
			type: DataTypes.STRING
		}
	},
	{
		tableName: 'Roles',
		timestamps: true
	}
);

User.belongsTo(Roles, { foreignKey: 'roleId', as: 'Role' });
Roles.hasMany(User, { foreignKey: 'roleId', as: 'Users' });

export default User;
export { Roles };
