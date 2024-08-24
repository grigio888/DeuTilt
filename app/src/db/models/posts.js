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

const Tags = sequelize.define(
	'Tags',
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
		color: {
			type: DataTypes.STRING
		}
	},
	{
		tableName: 'Tags',
		timestamps: true
	}
);

const PostTags = sequelize.define(
	'PostTags',
	{
		postId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Posts',
				key: 'id'
			},
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		},
		tagId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Tags',
				key: 'id'
			},
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}
	},
	{
		tableName: 'PostTags'
	}
);

Posts.belongsToMany(Tags, { through: PostTags, foreignKey: 'postId', as: 'Tags' });
Tags.belongsToMany(Posts, { through: PostTags, foreignKey: 'tagId', as: 'Posts' });

export default Posts;
export { Tags, PostTags };
