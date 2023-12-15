import * as orderService from '../services/orderServices.js'

export const placeOrder = async (req, res) => {
    try {
        const orderDetails = req.body

        const placedOrderDetails = await orderService.orderHeaderService(orderDetails);
        // console.log(placedOrderDetails + " Hi");
        const orderItemsDetails = await orderService.orderItemsService(orderDetails, placedOrderDetails.result.insertId);

        // SRP : Single responsibility principle
        res.status(200).send({ msg: "Order Succesfully Placed.." })
    } catch (error) {
        res.status(500).send({ err: "Internal Server Error" })
    }
}

// export default placeOrder;