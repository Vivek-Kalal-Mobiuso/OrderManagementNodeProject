import express from "express"
import newCustomer from '../controllers/customerControllers.js'
import * as validate from "../middlewares/validate.js";

const route = express.Router()

route.post("/", validate.validateCustomer , newCustomer );

export default route;