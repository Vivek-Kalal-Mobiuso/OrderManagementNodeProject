import express from "express"
import newCustomer from '../controllers/customerControllers.js'
import { validateCustomer  } from "../middlewares/validate.js";

const route = express.Router()

route.post("/", validateCustomer , newCustomer );

export default route;