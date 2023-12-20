import express from "express"
// import placeOrder from '../controllers/orderControllers.js'
import * as orderController from '../orders/controllers/orderControllers.js'
import * as validate from '../middlewares/validate.js'

const route = express.Router()

route.post("/", validate.validateOrder ,validate.isCustomer , orderController.placeOrder );
route.patch("/:id" , orderController.updateOrderController );
route.get("/:id" , orderController.getOrderByIdController );
route.delete("/:id" , orderController.deleteOrderByIdController );
// 10127
export default route;