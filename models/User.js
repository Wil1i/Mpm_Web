const { DataTypes } = require('sequelize');
const bcrypt = require("bcrypt")
const db = require("../configs/db")

"CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(128), password VARCHAR(128), email TEXT, firstName TEXT, lastName TEXT, number VARCHAR(128), userRank VARCHAR(64))"

const user = db.define('user', {

    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },

    username : {
        type : DataTypes.STRING,
    },

    password : {
        type : DataTypes.STRING,
    },

    email : {
        type : DataTypes.STRING,
    },

    firstName : {
        type : DataTypes.STRING,
    },

    lastName : {
        type : DataTypes.STRING,
    },

    number : {
        type : DataTypes.STRING,
    },

    userRank : {
        type : DataTypes.STRING,
    },

    products : {
        type : DataTypes.NUMBER,
        defaultValue : 0
    },

    codeMelli : {
        type : DataTypes.STRING,
        defaultValue : "ثبت نشده"
    },

    cardNumber : {
        type : DataTypes.STRING,
        defaultValue : "ثبت نشده"
    },

    news : {
        type : DataTypes.STRING,
        defaultValue : "خیر"
    },

    wallet : {
        type : DataTypes.STRING,
        defaultValue : 0
    },

    picture : {
        type : DataTypes.STRING,
        defaultValue : null
    },

    birthday : {
        type : DataTypes.DATE,
        defaultValue : null
    }

}, {
    timestamps : false
})

user.validPassword = (user, pwd) => {
    return bcrypt.compareSync(pwd, user.password)
}

user.encryptPassword = async (password) => {
    const saltRounds = 10
    const salt = await bcrypt.genSaltSync(saltRounds)
    const hash = await bcrypt.hashSync(password, salt)
    return hash
}

module.exports = user