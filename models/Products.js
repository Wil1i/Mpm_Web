const { DataTypes } = require("sequelize")
const db = require("../configs/db")

const Products = db.define("products", {
    id : {
        type : DataTypes.NUMBER,
        primaryKey : true,
        autoIncrement : true
    },

    name : {
        type : DataTypes.STRING
    },

    per : {
        type : DataTypes.STRING
    },

    price : {
        type : DataTypes.STRING
    },

    picture : {
        type : DataTypes.STRING
    },

    description : {
        type : DataTypes.STRING
    },

    count : {
        type : DataTypes.NUMBER
    }
}, {
    timestamps : false
})

module.exports = Products