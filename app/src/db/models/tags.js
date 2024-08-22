import { DataTypes } from 'sequelize';
import sequelize from '../connector.js';

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
    },
    {
        tableName: 'Tags',
        timestamps: true
    }
);

export default Tags;