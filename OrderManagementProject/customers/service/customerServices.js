import connection from "../../database/databaseConfig.js";
import { getAddressId } from "./addressService.js";

export const createNewCustomer = (customerDetails) => {
    return new Promise(async (resolve, reject) => {
        try {

            // Getting the Address ID 
            const { addressId } = await getAddressId(customerDetails);

            connection.connect((err) => {
                if (err) {
                    reject({ message: err.message, status: 501 })
                    return;
                }

                const currDate = new Date();
                // Customer Creation Date
                const customerCreationDate = `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`;
                console.log(customerCreationDate);

                                // Can make other function for query execution
                const createCustomerQuery = `INSERT INTO ONLINE_CUSTOMER (CUSTOMER_FNAME, CUSTOMER_LNAME, CUSTOMER_EMAIL, CUSTOMER_PHONE, ADDRESS_ID, CUSTOMER_CREATION_DATE, CUSTOMER_USERNAME, CUSTOMER_GENDER) VALUES( '${customerDetails.customerFirstName}' ,'${customerDetails.customerLastName}' ,'${customerDetails.customerEmail}' ,${customerDetails.customerPhone} ,${addressId} ,'${customerCreationDate}','${customerDetails.customerUserName}' ,'${customerDetails.customerGender}' );`

                connection.query(createCustomerQuery, function (err, result) {
                    if (err) {
                        reject({ message: err.message, status: 501 })
                        return;
                    }
                    resolve({ message: "Customer created Succesfully :)", result: result, status: 200 })
                });
            })
        } catch (error) {
            console.log(error);
            reject({ message: error.message, status: 500 })
        }

    })

}

export const getAllOrders = (customerId) => {
    return new Promise((resolve, reject) => {
        try {
            const allOrdersQuery = `SELECT * FROM ORDER_HEADER JOIN ORDER_ITEMS 
            ON ORDER_ITEMS.ORDER_ID = ORDER_HEADER.ORDER_ID
            WHERE CUSTOMER_ID=${customerId};`

            connection.query(allOrdersQuery, (error, result) => {
                if (error) {
                    // return res.status(501).send({ error: "Query Error", status: 501 });
                    return reject({ message: "Query Error", status: 501 })
                }

                resolve({ message: `${result.length === 0 ? "No Orders Found..." : "Orders Found..."}`, result: result, status: 200 })
            })
        } catch (error) {
            reject({ message: error.message, status: 500 })
        }
    })
}

export const getCustomerByIdService = (customerId) => {
    return new Promise((resolve, reject) => {
        try {
            const customerQuery = `SELECT * FROM ONLINE_CUSTOMER WHERE CUSTOMER_ID='${customerId}';`

            connection.query(customerQuery, (error, result) => {
                if (error) {
                    return reject({ message: "Query Error", status: 501 })
                }
                resolve({ message: `${result.length === 0 ? "Customer Does not Exists..." : "Customer Found"}`, result: result })
            })
        } catch (error) {
            reject({ message: error.message, status: 500 })
        }
    })
}

export const getAllCustomersService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getCustomersQuery = `SELECT * FROM ONLINE_CUSTOMER`;

            connection.query(getCustomersQuery, (error, result) => {
                if (error) return reject({ message: error.message })

                resolve({ result: result });
            })
        } catch (error) {
            return reject({ message: error.message })
        }
    })
}

export const deleteCustomerByIdService = (customerId) => {
    return new Promise((resolve,reject)=>{
        try {
            const deleteCustomerQuery = `DELETE FROM ONLINE_CUSTOMER WHERE CUSTOMER_ID=${customerId}`

            connection.query(deleteCustomerQuery, (error, result) => {
                if( error ){
                    return reject({message : "Query error...", status : 501})
                }

                resolve({message : "Customer Deleted Successfully" , result})
            })
        } catch (error) {
            return reject({message : "Internal Server Error..."})            
        }
    })
}

export const updateCustomerByIdService = (customerId) => {
    return new Promise((resolve,reject)=>{
        try {

            // Get Customer Details first 
            const updateCustomerQuery = `UPDATE ONLINE_CUSTOMER SET CUSTOMER_FNAME = ? , CUSTOMER_LNAME = ? , 
                                                                CUSTOMER_EMAIL = ? ,                                                    
                                                                CUSTOMER_PHONE = ? ,                                                    
                                                            CUSTOMER_USERNAME = ? ,                                                    
                                                            CUSTOMER_GENDER = ? ,
                                                            ADDRESS_LINE_1 = ? ,
                                                            ADDRESS_LINE_2 = ? ,
                                                            CITY = ? ,
                                                            STATE = ? ,
                                                            PINCODE = ? ,
                                                            COUNTRY = ? ,
                                                            WHERE CUSTOMER_ID=${customerId}`

            // update address table also using joins
            
            console.log(updateCustomerQuery);
            // connection.query(updateCustomerQuery, (error, result) => {
            //     if( error ){
            //         return reject({message : "Query error...", status : 501})
            //     }

            //     resolve({message : "Customer Updated Successfully" , result})
            // })
            resolve({});
        } catch (error) {
            return reject({message : "Internal Server Error..."})            
        }
    })
}