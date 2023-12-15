
export const validateCustomer = (req, res, next) => {
    const customerDetails = req.body ;
    if( !customerDetails.CUSTOMER_FNAME || !customerDetails.CUSTOMER_LNAME || 
        !customerDetails.CUSTOMER_EMAIL || !customerDetails.CUSTOMER_PHONE || !customerDetails.ADDRESS_ID || 
        !customerDetails.CUSTOMER_CREATION_DATE || !customerDetails.CUSTOMER_USERNAME || !customerDetails.CUSTOMER_GENDER ) {
            return res.status(400).send({error : "Incomplete Details..."});
    }

    next();
}