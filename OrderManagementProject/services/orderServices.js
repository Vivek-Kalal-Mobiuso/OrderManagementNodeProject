import connection from "../database/databaseConfig.js";

export const orderHeaderService = (orderDetails) => {
    return new Promise((resolve, reject) => {
        try {
            connection.connect((err) => {
                if (err) {
                    reject({ error: "DB connection Error " + err.message, status: 501 })
                    // res.status(500).status({ err: "DB connection Error" })
                    return;
                }
                const currDate = new Date();
                // Customer Creation Date
                const orderCreationDate = `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`;
                console.log(orderCreationDate);
                const orderHeaderQuery = `INSERT INTO ORDER_HEADER(
                                                                CUSTOMER_ID,
                                                                ORDER_DATE,
                                                                ORDER_STATUS,
                                                                PAYMENT_MODE,
                                                                PAYMENT_DATE,
                                                                ORDER_SHIPMENT_DATE,
                    SHIPPER_ID) VALUES (${orderDetails.CUSTOMER_ID} ,'${orderCreationDate}' ,'${orderDetails.ORDER_STATUS}' ,'${orderDetails.PAYMENT_MODE}' ,${orderDetails.PAYMENT_DATE} , ${orderDetails.ORDER_SHIPMENT_DATE} ,${orderDetails.SHIPPER_ID} )`;

                connection.query(orderHeaderQuery, (error, result) => {

                    if (error) {
                        console.log(error + " in  executing query of placeOrder");
                        // res.status(500).status({ err: "Query Error Execution" })
                        reject({ error: error.message, status: 501 })
                        return;
                    }
                    // console.log(result);
                    resolve({ msg: "Order Created Succesfully", status: 200, result: result })
                })

            })
        } catch (error) {
            reject({ error: error.message, status: 500 })
        }
    })
}

export const orderItemsService = (orderDetails, orderId) => {

    return new Promise((resolve, reject) => {
        try {
            const orderItemsQuery = `INSERT INTO ORDER_ITEMS VALUES(${orderId} , ${orderDetails.PRODUCT_ID} ,${orderDetails.PRODUCT_QUANTITY} )`;
            // console.log(orderItemsQuery);
            connection.query(orderItemsQuery, (err, result) => {
                if (err) {
                    // console.log(err + " in executing query of placeorder in order items");
                    reject({ error: "Query Error Execution", status: 501 })
                    // res.status(500).status({ err: "Query Error Execution" })
                }

                resolve({ msg: "Order Placed Succesfully :)", result: result, status: 200 })
            })
        } catch (error) {
            reject({ error: error.message, status: 500 })
        }
    })
}