import { DataTypes } from 'sequelize';
import sequelize from '../connector.js';

const Example = sequelize.define(
    'Example',
    {
        column1: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        column2: {
            type: DataTypes.INTEGER,
        },
        column3: {
            type: DataTypes.BOOLEAN,
        },
        column4: {
            type: DataTypes.JSON
        },
        column5: {
            type: DataTypes.TEXT
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW
        }
    },
    {
        tableName: 'Example',
        timestamps: true, // Enable timestamps
        paranoid: true, // Enable soft delete
        indexes: [
            // Create a unique index on column1
            {
                unique: true,
                fields: [
                    'column1'
                ]
            }
        ],
        defaultScope: {
            // Exclude column3 from default queries
            attributes: {
                exclude: [
                    'column3'
                ]
            }
        },
        hooks: {
            beforeCreate: (user, options) => {
                // Logic before creating a user
            },
            afterCreate: (user, options) => {
                // Logic after creating a user
            }
        }
    }
);

export default Example;