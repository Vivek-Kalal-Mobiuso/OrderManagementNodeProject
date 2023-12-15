import connection from '../database/databaseConfig.js'

export const validateCustomer = (req, res, next) => {
    const customerDetails = req.body;
    if (!customerDetails.CUSTOMER_FNAME || !customerDetails.CUSTOMER_LNAME ||
        !customerDetails.CUSTOMER_EMAIL || !customerDetails.CUSTOMER_PHONE || !customerDetails.ADDRESS_ID ||
        !customerDetails.CUSTOMER_USERNAME || !customerDetails.CUSTOMER_GENDER) {
        return res.status(400).send({ error: "Incomplete Details..." });
    }

    // check if customer already exist 
    const doesCustomerExist = `SELECT * FROM ONLINE_CUSTOMER WHERE CUSTOMER_EMAIL = '${customerDetails.CUSTOMER_EMAIL}';`
    // console.log(isCustomerExist);

    connection.query(doesCustomerExist, (error, result) => {
        if (error) {
            return res.status(501).send({ error: "Query Error" , status : 501});
            // return reject({ error: "Query Error" , status : 501})
        }
        if (result.length != 0) {
            return res.status(409).send({ error: "User Email Already Exist", status: 409 }); // 409 - Conflict Error
            // return reject({ error: "User Email Already Exist", status: 409 }) 
        }
    })

    next();
}