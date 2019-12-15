const moment = require('moment')
const Order = require('../models/Order')
const errorHandler = require('../utils/erorrHandler')
module.exports.overview = function (req,res) {
    try {
        const allOrders = await Order.find({user: req.user.id}).sort(1)
        const ordersMap = getOrdersMap(allOrders)
        const yesterdayOrders = ordersMap[moment().add(-1, d).format('DD.MM.YYYY')] || []

        //Qantity orders yesterday
        const yesterdayOrdersNumber = allOrders.length
        //Qantity orders
        const totalOrdersNumber = allOrders.length
        //Total days all
        const daysNumber = Object.keys(ordersMap).length
        //Orders for day
        const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0)
        //Percent for quantity orders
        //((Orders for yesterday / quntity for day ) - 1) *100
        const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay)-1) *100).toFixed(2)
        //Total gain
        const totalGain = calculatePrice(allOrders)
        //Gain per day
        const gainPerDay = totalGain / daysNumber
        //Gain for yesterday
        const yesterdayGain = calculatePrice(yesterdayOrders)
        //Percent gain
        const gainPercent = (((yesterdayGain / gainPerDay)-1) *100).toFixed(2)
        // Compare gain
        const compareGain = (yesterdayGain - gainPerDay).toFixed(2)
        // Compare quntity orders 
        const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2)
    
    res.status(200).json({
        gain: {
            percent: Math.abs(+gainPercent),
            compare: Math.abs(+compareGain),
            yesterday: +yesterdayGain,
            isHigher: gainPercent > 0
        },
        orders:{
            percent: Math.abs(+ordersPercent),
            compare: Math.abs(+compareNumber),
            yesterday: +yesterdayOrders,
            isHigher: ordersPercent > 0
        }
    })
    } catch (e){
        errorHandler(res,e)
    }
}

module.exports.analitic = function (req,res) {

}

function getOrdersMap(orders = []){
    const daysOrders = {}
    orders.forEach(order => {
        const date = moment(order.date).format('DD.MM.YYYY')

        if (date === moment().format('DD.MM.YYYY')){
            return 
        }
        if (daysOrders[date]) {
            daysOrders[date] = []
        }
        daysOrders[date].push(order)
    })
    return daysOrders
}

function calculatePrice (orders = []) {
    return orders.reduce( (total, order) => {
        const orderPrice = order.list.reduce((orderTotal, item)=>{
            return orderTotal += item.cost * itemQuantity
        }, 0)
        return total += orderPrice
    }, 0)
}