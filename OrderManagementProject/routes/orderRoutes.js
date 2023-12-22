import express from "express"
// import placeOrder from '../controllers/orderControllers.js'
import * as orderController from '../orders/controllers/orderControllers.js'
import * as validate from '../middlewares/validate.js'

const route = express.Router()
// create
route.post("/", validate.validateOrder ,validate.isCustomer , orderController.placeOrder );
// update
route.patch("/:id" , orderController.updateOrderController );
// read
route.get("/:id" , orderController.getOrderByIdController );
// delete
route.delete("/:id" , orderController.deleteOrderByIdController );
// 10127
export default route;