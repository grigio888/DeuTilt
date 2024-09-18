import { DataTypes } from 'sequelize';
import sequelize from '../connector.js';

import User from './user.js';

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
		subTitle: {
			type: DataTypes.STRING
		},
		imageHeader: {
			type: DataTypes.STRING
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		views: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		createdBy: {
			type: DataTypes.INTEGER,
			references: {
				model: 'User',
				key: 'id'
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE'
		},
		editedBy: {
			type: DataTypes.INTEGER,
			references: {
				model: 'User',
				key: 'id'
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE'
		},
		editedAt: {
			type: DataTypes.DATE
		},
		published: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		publishedAt: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'Posts',
		timestamps: true
	}
);

Posts.belongsTo(User, { foreignKey: 'createdBy', as: 'Author' });

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
		},
		icon: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'none'
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

const Comments = sequelize.define(
	'Comments',
	{
		postId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Posts',
				key: 'id'
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE'
		},
        userId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'User',
				key: 'id'
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
			defaultValue: 2
		},
		name: {
			// This is only used for the visitor
			type: DataTypes.STRING
		},
		email: {
			// This is only used for the visitor
			type: DataTypes.STRING
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false
		},
		editedBy: {
			type: DataTypes.INTEGER,
			references: {
				model: 'User',
				key: 'id'
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE'
		},
		editedAt: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'Comments',
		timestamps: true
	}
);

Comments.belongsTo(User, { foreignKey: 'userId', as: 'User' });
Comments.belongsTo(Posts, { foreignKey: 'postId', as: 'Post' });

export default Posts;
export { Tags, PostTags, Comments };
