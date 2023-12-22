import express from "express"
import * as customerController from '../customers/controllers/customerControllers.js'
import * as validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/auth.js";
import {
    checkSchema
} from 'express-validator';

const route = express.Router()

// add
route.post("/",
    checkSchema(validate.registerCustomerValidationsSchema),
    validate.validationError,
    customerController.newCustomerController
);

route.post("/login",
    checkSchema(validate.loginCustomerValidationsSchema),
    validate.validationError,
    customerController.loginCustomerController
);
// read
route.get(
    "/:customerId/orders",
    verifyToken,
    customerController.getCustomerOrdersController
);
route.get(
    "/:customerId",
    validate.isValidCustomer,
    customerController.getCustomerByIdController
);
route.get(
    "/",
    customerController.getAllCustomersController
);
// delete
route.delete(
    "/:customerId",
    verifyToken,
    validate.isValidCustomer,
    customerController.deleteCustomerByIdController);
// update
route.put(
    "/:customerId",
    verifyToken,
    validate.isValidCustomer,
    customerController.updateCustomerController
);

export default route;