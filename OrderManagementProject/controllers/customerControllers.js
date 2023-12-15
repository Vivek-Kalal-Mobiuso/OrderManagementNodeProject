import createNewCustomer from "../services/createCustomer.js";

const newCustomer = async (req, res) => {
    try {
        const customerDetails = req.body;

        const newCustomer = await createNewCustomer(customerDetails);

        // console.log(newCustomer.result.insertId);  // CustomerId

        res.status(200).send({ msg: newCustomer.msg , customerId : newCustomer.result.insertId });
    } catch (err) {
        res.status(500).send({ err: err.error });
    }
}
// make seperate functions for executions and operations 
export default newCustomer;