import * as customerService from "../services/customerServices.js";

const newCustomer = async (req, res) => {
    try {
        const customerDetails = req.body;

        const newCustomerDetails = await customerService.createNewCustomer(customerDetails);

        return res.status(200).send({ msg: newCustomerDetails.msg, customerId: newCustomerDetails.result.insertId });
        // console.log(newCustomer.result.insertId);  // CustomerId

    } catch (err) {
        res.status(err.status || 500).send({ err: err.error });
    }
}
// make seperate functions for executions and operations 
export default newCustomer;