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

        return res.status(200).send({ message: customerOrders.message, result: customerOrders.result });
    } catch (error) {
        return res.status(error.status || 500).send({ error: error.message || "Internal Server Error" });
    }
}

export const getCustomerByIdController = async (req, res) => {
    try {
        const customerId = req.params.id

        const customer = await customerService.getCustomerByIdService(customerId);

        return res.status(200).send({ message: customer.message, result: customer.result[0] })
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

export const deleteCustomerByIdController = async (req, res) => {
    try {
        const customerId = req.params.id

        const deletedCustomer = await customerService.deleteCustomerByIdService(customerId)

        return res.status(200).send({message : deletedCustomer.message })
    } catch (error) {
        res.status(error.status || 500).send({message : error.message || "Internal Server Error"})
    }
}

export const updateCustomerByIdController = async(req,res) => {
    try {
        const customerId = req.params.id

        const updatedCustomer = await customerService.updateCustomerByIdService(customerId)

        return res.status(200).send({message : updatedCustomer.message })
    } catch (error) {
        
    }
}