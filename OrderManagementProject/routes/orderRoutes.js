import express from "express"
import placeOrder from '../controllers/placeOrders.js'

const route = express.Router()

route.post("/", placeOrder );

export default route;