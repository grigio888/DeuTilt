import { DataTypes } from 'sequelize';
import sequelize from '../connector.js';

const Posts = sequelize.define(
	'Posts',
	{
		slug: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
        imageHeader: {
            type: DataTypes.STRING
        },
		content: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		createdBy: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Users',
				key: 'id'
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE'
		}
	},
	{
		tableName: 'Posts',
		timestamps: true
	}
);

export default Posts;
