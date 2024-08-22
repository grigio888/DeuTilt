import bcrypt from 'bcrypt';
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
		}
	},
	{
		tableName: 'Users',
		timestamps: true,
        instanceMethods: {
            comparePassword: function (password) {
                return bcrypt.compareSync(password, this.password);
            }
        }
	}
);

export default User;
