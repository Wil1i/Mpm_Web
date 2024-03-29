const User = require("../models/User")
const Order = require("../models/Order")
const Product = require("../models/Products")
const Point = require("../models/Point")
const Service = require("../models/Services")
const Ticket = require("../models/Ticket")
const convert = require("../utils/convert")
const Setting = require("../models/Setting")

const mainPage = async (req, res) => {
    const users = await User.findAll({
        order : [
            ['id', 'ASC']
        ]
    })
    const orders = await Order.findAll()
    const products = await Product.findAll()
    const services = await Service.findAll()
    const ticketCount = await Ticket.count()
    const points = await Point.findAll({
        order : [
            ['points', 'DESC']
        ]
    })

    const lastProducts = products.slice(products.length - 4, products.length)
    const lastOrders = orders.slice(orders.length - 7, orders.length)
    const lastUsers = users.slice(users.length - 8, users.length)

    res.render("admin/index", {
        user : req.user,
        flash : req.flash(),
        users,
        orders,
        products,
        lastProducts,
        lastOrders,
        lastUsers,
        points,
        services,
        ticketCount,
        pageName : "داشبورد"
    })
}

const tickets = async (req, res) => {
    if(!req.query.id){
        const ticketCount = await Ticket.count()
        const tickets = await Ticket.findAll()
    
        res.render("admin/tickets", {
            user : req.user,
            ticketCount,
            tickets, 
            flash : req.flash(),
            pageName : "تیکت ها"
        })
    }else if(req.query.id && req.query.action == "delete"){
        await Ticket.destroy({
            where : {
                id : req.query.id
            }
        })

        req.flash("success", "تیکت با موفقیت حذف شد")
        res.redirect("/admin/tickets")
    }
}

const users = async (req, res) => {
    const ticketCount = await Ticket.count()
    const users = await User.findAll()

    res.render("admin/users", {
        user : req.user,
        active : "users",
        flash : req.flash(),
        users,
        ticketCount
    })
}

const services = async (req, res) => {
    const ticketCount = await Ticket.count()
    const services = await Service.findAll()

    res.render("admin/services", {
        user : req.user,
        active : "services",
        flash : req.flash(),
        services,
        ticketCount
    })
}

const products = async (req, res) => {
    const products = await Product.findAll()
    const ticketCount = await Ticket.count()

    res.render("admin/products", {
        user : req.user,
        active : "products",
        flash : req.flash(),
        products,
        ticketCount,
        convert     
    })
} 

const settings = async (req, res) => {
    const products = await Product.findAll()
    const ticketCount = await Ticket.count()
    const settings = await Setting.findAll()

    res.render("admin/settings", {
        user : req.user,
        active : "settings",
        flash : req.flash(),
        products,
        ticketCount,
        settings
    })
}

const settingsPost = async (req, res) => {
    const findShop = await Setting.findOne({
        where : {
            name : "shop"
        }
    })

    if(findShop.value !== req.body.shop){
        findShop.update({value : req.body.shop})
        req.flash("success", "با موفقیت فروشگاه آپدیت شد")
    }

    res.redirect("/admin/settings")
}

module.exports = {
    mainPage,
    tickets,
    users,
    services,
    products,
    settings,
    settingsPost
}