import * as customerService from "../service/customerServices.js";

export const newCustomerController = async (req, res) => {
    try {
        const customerDetails = req.body;

        const newCustomerDetails = await customerService.createNewCustomer(customerDetails);

        return res.status(200).send({ message: newCustomerDetails.message, customerId: newCustomerDetails.result.insertId });
    } catch (error) {
        // console.log( err);
        return res.status(error.status || 500).send({ error: error.message });
    }
}

export const getCustomerOrdersController = async (req, res) => {
    try {
        const customerId = req.params.id;

        const customerOrders = await customerService.getAllOrders(customerId);
        
        return res.status(200).send({ message: customerOrders.message , result: customerOrders.result });
    } catch (error) {
        return res.status(error.status || 500).send({ error: error.message || "Internal Server Error" });
    }
}

export const getCustomerByIdController = async (req, res) => {
    try {
        const customerId = req.params.id

        const customer = await customerService.getCustomerByIdService(customerId);

        return res.status(200).send({ message: customer.message, result: customer.result })
    } catch (error) {
        res.status(error.status || 500).send({ error: error.message || "Internal Server Error" })
    }
}

export const getAllCustomersController = async (req, res) => {
    try {
        const customers = await customerService.getAllCustomersService();

        return res.status(200).send({ message: "Customers found..", customers: customers.result });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}