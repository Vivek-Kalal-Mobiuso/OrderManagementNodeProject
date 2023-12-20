import connection from '../database/databaseConfig.js'

export const validateCustomer = (req, res, next) => {
    const customerDetails = req.body;

    if (!customerDetails.customerFirstName || !customerDetails.customerLastName ||
        !customerDetails.customerEmail || !customerDetails.customerPhone || !customerDetails.AddressLine1 || !customerDetails.city || !customerDetails.state || !customerDetails.city || !customerDetails.pincode || !customerDetails.country || 
        !customerDetails.customerUserName || !customerDetails.customerGender) {
        return res.status(400).send({ error: "Incomplete Details..." });
    }

    // check if customer already exist 
    const doesCustomerExist = `SELECT * FROM ONLINE_CUSTOMER WHERE CUSTOMER_EMAIL = '${customerDetails.customerEmail}';`
    // console.log(isCustomerExist);

    connection.query(doesCustomerExist, (error, result) => {
        if (error) {
            return res.status(501).send({ error: "Query Error", status: 501 });
            // return reject({ error: "Query Error" , status : 501})
        }
        if (result.length != 0) {
            return res.status(409).send({ error: "User Email Already Exist", status: 409 }); // 409 - Conflict Error
            // return reject({ error: "User Email Already Exist", status: 409 }) 
        }
    })

    next();
}

export const isValidCustomer = (req, res, next) => {
    const customerId = req.params.id

    const doesCustomerExist = `SELECT * FROM ONLINE_CUSTOMER WHERE CUSTOMER_ID=${customerId};`

    connection.query(doesCustomerExist, (error, result) => {
        if (error) {
            return res.status(501).send({ error: "Query Error", status: 501 });
            // return reject({ error: "Query Error" , status : 501})
        }
        if (result.length == 0) {
            return res.status(404).send({ error: "Customer Does not Exist", status: 404 }); // 404 - Not Found
            // return reject({ error: "User Email Already Exist", status: 409 }) 
        }
    })
    next();
}

export const isCustomer = (req, res, next) => {
    const customerId = req.body.customerId;

    const doesCustomerExist = `SELECT * FROM ONLINE_CUSTOMER WHERE CUSTOMER_ID=${customerId};`

    connection.query(doesCustomerExist, (error, result) => {
        if (error) {
            return res.status(501).send({ error: "Query Error", status: 501 });
            // return reject({ error: "Query Error" , status : 501})
        }
        if (result.length == 0) {
            return res.status(404).send({ error: "Customer Does not Exist", status: 404 }); // 404 - Not Found
            // return reject({ error: "User Email Already Exist", status: 409 }) 
        }
    })
    next();
}

export const validateOrder = (req, res, next) => {
    const orderDetails = req.body;

    if (!orderDetails.customerId ||
        !orderDetails.orderStatus ||
        !orderDetails.paymentMode ||
        !orderDetails.paymentDate ||
        !orderDetails.orderShipmentDate ||
        !orderDetails.shipperId || 
        !orderDetails.productId ||
        !orderDetails.productQuantity) {
        return res.status(400).send({ error: "Incomplete Details... " })
    }

    next();
}
