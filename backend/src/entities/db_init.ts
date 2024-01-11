import mysql from 'mysql2/promise.js'
import env from 'dotenv';
import User from './User';
import Product from './Product';
import { Products } from './dbConst';

env.config();

function createDatabase(){   
    mysql.createConnection({
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD
    })
    .then((connection) => {   
    return connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
    })    
    .catch((err) => {
    console.warn(err.stack)
    })
}

function fkConfig()
{
    User.hasMany(Product,{as:Products,foreignKey:"userId"});
    Product.belongsTo(User,{foreignKey:"userId"});
}

function db_init(){
    createDatabase();
    fkConfig();    
}

export default db_init;