import connection from "../../database/databaseConfig.js";

export const orderHeaderService = (orderDetails) => {
    return new Promise((resolve, reject) => {
        try {
            connection.connect((err) => {
                if (err) {
                    return reject({ message: "DB connection Error " + err.message, status: 501 })
                }
                const currDate = new Date();
                // Customer Creation Date
                const orderCreationDate = `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`;

                const orderHeaderQuery = `INSERT INTO ORDER_HEADER(
                                                                CUSTOMER_ID,
                                                                ORDER_DATE,
                                                                ORDER_STATUS,
                                                                PAYMENT_MODE,
                                                                PAYMENT_DATE,
                                                                ORDER_SHIPMENT_DATE,
                    SHIPPER_ID) VALUES (${orderDetails.customerId} ,'${orderCreationDate}' ,'${orderDetails.orderStatus}' ,'${orderDetails.paymentMode}' ,${orderDetails.paymentDate} , ${orderDetails.orderShipmentDate} ,${orderDetails.shipperId} )`;

                connection.query(orderHeaderQuery, (error, result) => {

                    if (error) {
                        console.log(error + " in  executing query of placeOrder");
                        // res.status(500).status({ err: "Query Error Execution" })
                        return reject({ message: error.message, status: 501 })

                    }
                    // console.log(result);
                    resolve({ message: "Order Created Succesfully", status: 200, result: result })
                })

            })
        } catch (error) {
            reject({ message: error.message, status: 500 })
        }
    })
}

export const orderItemsService = (orderDetails, orderId) => {

    return new Promise((resolve, reject) => {
        try {
            const orderItemsQuery = `INSERT INTO ORDER_ITEMS VALUES(${orderId} , ${orderDetails.productId} ,${orderDetails.productQuantity} )`;

            connection.query(orderItemsQuery, (err, result) => {
                if (err) {
                    return reject({ message: "Query Error Execution", status: 501 })
                }

                resolve({ message: "Order Placed Succesfully :)", result: result, status: 200 })
            })
        } catch (error) {
            reject({ message: error.message, status: 500 })
        }
    })
}

export const getOrderByIdService = (orderId) => {
    return new Promise((resolve, reject) => {
        try {
            const orderIdQuery = `SELECT * FROM ORDER_HEADER JOIN ORDER_ITEMS ON ORDER_ITEMS.ORDER_ID = ORDER_HEADER.ORDER_ID WHERE order_header.ORDER_ID=${orderId};`

            connection.query(orderIdQuery, (error, result) => {
                if (error) {
                    return reject({ message: "Query Error Execution", status: 501 })
                }
                return resolve({ message: (result.length === 0) ? "Order Doesn't exist" : "Order Found.. :)", result: result })
            })
        } catch (error) {
            reject({ message: error.message, status: 500 })
        }
    })
}

export const updateOrderHeaderService = (orderDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await getOrderByIdService(orderDetails.orderId);

            const updateOrderQuery = `UPDATE ORDER_HEADER SET ORDER_STATUS = ? , PAYMENT_MODE = ? ,PAYMENT_DATE = ? ,ORDER_SHIPMENT_DATE = ? ,SHIPPER_ID = ? WHERE ORDER_ID=${orderDetails.orderId}`
            const values = [
                (!orderDetails.orderStatus) ? order.result[0].ORDER_STATUS : orderDetails.orderStatus,
                (!orderDetails.paymentMode) ? order.result[0].PAYMENT_MODE : orderDetails.paymentMode,
                (!orderDetails.paymentDate) ? order.result[0].PAYMENT_MODE : orderDetails.paymentDate,
                (!orderDetails.orderShipmentDate) ? order.result[0].ORDER_SHIPMENT_DATE : orderDetails.orderShipmentDate,
                (!orderDetails.shipperId) ? order.result[0].SHIPPER_ID : orderDetails.shipperId,
            ]

            connection.query(updateOrderQuery, values, (error, result) => {
                if (error) {
                    return reject({ message: "Query Error", status: 501 })
                }
                // resolve
                return resolve({ message: "Order Updated Successfully", result })
            })
        } catch (error) {
            return reject({ message: "Internal Server Error", status: 500 })
        }
    })
}

export const updateOrderItemsService = (orderDetails) => {
    return new Promise((resolve, reject) => {
        try {

            const updateOrderItems = order 
        } catch (error) {
            return reject({ message: "Internal Server Error", status: 500 })
        }
    })
}