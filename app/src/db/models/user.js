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
    },
    {
        tableName: 'Users',
        timestamps: true
    }
);

export default User;