const express = require("express")
const Router = express.Router()

const HomeController = require("../controllers/homePage")
Router.get("/", HomeController)

Router.get("/about", (req, res) => {
    res.render("about")
})

Router.get("/cart", (req, res) => [
    res.render("cart")
])

Router.get("/checkout", (req, res) => {
    res.render("checkout")
})

const contactController = require("../controllers/contact")
Router.get("/contact", contactController)

const loginController = require("../controllers/login")
Router.get("/login", loginController)

const registerController = require("../controllers/register")
Router.get("/register", registerController)

Router.get("/news", (req, res) => {
    res.render("news")
})

Router.get("/single-news", (req, res) => {
    res.render("single-news")
})

Router.get("/single-product", (req, res) => {
    res.render("single-product")
})

Router.get("/dashboard", (req, res) => {
    res.render("user_interface")
})

const ShopController = require("../controllers/shop")
Router.get("/shop", ShopController)

const errController = require("../controllers/error")
Router.get("/*", errController)

module.exports = Router