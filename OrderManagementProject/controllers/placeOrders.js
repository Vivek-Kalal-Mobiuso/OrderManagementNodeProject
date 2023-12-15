import connection from "../database/db.js";

const placeOrder = async (req, res) => {
    try {
            const orderDetails = req.body
            
            const placedOrderDetails = await orderHeaderService(orderDetails); 

            const orderItemsQuery = `INSERT INTO ORDER_ITEMS VALUES(${orderDetails.ORDER_ID} , ${orderDetails.PRODUCT_ID} ,${orderDetails.PRODUCT_QUANTITY} )`;

            connection.query(orderItemsQuery, (err, result) => {
                if (err) {
                    console.log(err + " in executing query of placeorder in order items");
                    res.status(500).status({ err: "Query Error Execution" })
                }
                console.log("result");
                console.log(result);
            })
            // SRP : Single responsibility principle
            res.status(200).send({ msg: "Order Succesfully Placed.." })
    } catch (error) {
        res.status(500).status({ err: "Internal Server Error" })
    }
}

export default placeOrder;