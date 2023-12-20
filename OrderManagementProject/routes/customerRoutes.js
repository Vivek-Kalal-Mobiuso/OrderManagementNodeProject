import express from "express"
import * as customerController from '../customers/controllers/customerControllers.js'
import * as validate from "../middlewares/validate.js";

const route = express.Router()

route.post("/", validate.validateCustomer , customerController.newCustomerController );
route.get("/:id/orders", validate.isValidCustomer , customerController.getCustomerOrdersController );
route.get("/:id", customerController.getCustomerByIdController );
route.delete("/:id", validate.isValidCustomer , customerController.deleteCustomerByIdController );
route.put("/:id", validate.isValidCustomer , customerController.updateCustomerByIdController );
route.get("/",  customerController.getAllCustomersController );

export default route;