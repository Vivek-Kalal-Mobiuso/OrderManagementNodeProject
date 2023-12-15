import connection from "../database/db.js";

const createNewCustomer = (customerDetails) => {
    return new Promise((resolve, reject) => {
        try {
            connection.connect((err) => {
                if (err)
                    reject({ error: err.message, status: 501 })

                const createCustomerQuery = `INSERT INTO ONLINE_CUSTOMER (CUSTOMER_FNAME, CUSTOMER_LNAME, CUSTOMER_EMAIL, CUSTOMER_PHONE, ADDRESS_ID, CUSTOMER_CREATION_DATE, CUSTOMER_USERNAME, CUSTOMER_GENDER) VALUES( '${customerDetails.CUSTOMER_FNAME}' ,'${customerDetails.CUSTOMER_LNAME}' ,'${customerDetails.CUSTOMER_EMAIL}' ,${customerDetails.CUSTOMER_PHONE} ,${customerDetails.ADDRESS_ID} ,${customerDetails.CUSTOMER_CREATION_DATE} ,'${customerDetails.CUSTOMER_USERNAME}' ,'${customerDetails.CUSTOMER_GENDER}' );`

                connection.query(createCustomerQuery, function (err, result) {
                    if (err){
                        reject({ error: err.message, status: 501 })
                        return;
                    }
                    resolve({ msg: "Customer created Succesfully :)", result: result, status: 200 })
                });
            })
        } catch (error) {
            reject({ error: error.message, status: 500 })
        }

    })

}


export default createNewCustomer;