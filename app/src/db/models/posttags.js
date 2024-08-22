import { DataTypes } from 'sequelize';
import sequelize from '../connector.js';

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

export default PostTags;
