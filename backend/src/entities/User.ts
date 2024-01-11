import db from '../dbConfig';
import { DataTypes, ModelDefined } from 'sequelize';
import { ProductAttributes } from './Product.js';

export interface UserAttributes {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    Products: ProductAttributes[]
}

export interface UserCreationAttributes {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

const User: ModelDefined<UserAttributes, UserCreationAttributes> = db.define("User",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default User;