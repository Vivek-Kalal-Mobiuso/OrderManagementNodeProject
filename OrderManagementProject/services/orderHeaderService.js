
const orderHeaderService = (orderDetails) => {
    return new Promise((resolve, reject) => {
        try {
            connection.connect((err) => {
                if (err) {
                    reject({ error: "DB connection Error " + err.message, status: 501 })
                    // res.status(500).status({ err: "DB connection Error" })
                    return;
                }

                const orderHeaderQuery = `INSERT INTO ORDER_HEADER VALUES( ${orderDetails.ORDER_ID} ,${orderDetails.CUSTOMER_ID} ,${orderDetails.ORDER_DATE} ,'${orderDetails.ORDER_STATUS}' ,'${orderDetails.PAYMENT_MODE}' ,${orderDetails.PAYMENT_DATE} , ${orderDetails.ORDER_SHIPMENT_DATE} ,${orderDetails.SHIPPER_ID} )`;

                connection.query(orderHeaderQuery, (error, result) => {

                    if (error) {
                        console.log(error + " in  executing query of placeOrder");
                        // res.status(500).status({ err: "Query Error Execution" })
                        reject({ error: error.message, status: 501 })
                    }
                    console.log(result);
                    resolve({ msg: "Order Created Succesfully", status: 200, result: result })
                })

            })
        } catch (error) {
            reject({ error: error.message, status: 500 })
        }
    })
}