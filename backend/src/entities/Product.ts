import db from '../dbConfig';
import Sequelize, { ModelDefined } from 'sequelize';

export interface ProductAttributes{
    id:number,
    category:string,
    name:string,
    expirationDate:Date,
    quantity:number,
    isAvailable: boolean|null,
    userId:number
}

export interface ProductCreationAttributes {
    category:string,
    name:string,
    expirationDate:Date,
    quantity:number,
    isAvailable: boolean|null,
    userId:number
}



const Product :ModelDefined<ProductAttributes,ProductCreationAttributes>= db.define("Product", 
{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    expirationDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isAvailable: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    } 
});

export default Product;