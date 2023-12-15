import express from "express"
// import placeOrder from '../controllers/orderControllers.js'
import * as orderController from '../controllers/orderControllers.js'
const route = express.Router()

route.post("/", orderController.placeOrder );

export default route;