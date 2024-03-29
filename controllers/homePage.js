const HomeTopObjs = require("../models/HomeTopItems");
const Offers = require("../models/Offers")
const PinnedComments = require("../models/PinnedComments")
const About = require("../models/About")
const News = require("../models/News")
const HomeMainItems = require("../models/HomeMainItems");
const Setting = require("../models/Setting")
const { format } = require("date-fns")

const HomeController = async (req, res) => {
    const homeTopItemsMain = await HomeTopObjs.findAll();
    const offersMain = await Offers.findAll();
    const pinnedCommentsMain = await PinnedComments.findAll();
    const aboutMain = await About.findAll();
    const newsMain = await News.findAll();
    const homeMainItemsMain = await HomeMainItems.findAll();
    let isShopAv = await Setting.findOne({
        where : {
            name : "shop"
        }
    })
    isShopAv = isShopAv.value == "on"

    let homeTopItems = homeTopItemsMain
    let offers = offersMain
    let pinnedComments = pinnedCommentsMain
    let about = aboutMain
    let news = newsMain.slice(newsMain.length - 3, newsMain.length)
    let homeMainItems = homeMainItemsMain
    if(!isShopAv){
        homeMainItems = homeMainItems.filter(x => x.name !== "فروشگاه")
    }

    if(!offers[0]) offers = undefined
    if(!homeTopItems[0]) homeTopItems = undefined
    if(!pinnedComments[0]) pinnedComments = undefined
    if(!about[0]) about = undefined
    if(!news[0]) news = undefined
    if(!homeMainItems[0]) homeMainItems = undefined

    res.render("index", {
        homeTopItems, 
        offers, 
        pinnedComments, 
        about, 
        news, 
        homeMainItems, 
        user : req.user,
        format,
        isShopAv
    });
}

module.exports = HomeController;