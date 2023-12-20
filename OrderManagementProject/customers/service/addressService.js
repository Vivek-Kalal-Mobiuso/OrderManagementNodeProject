import connection from "../../database/databaseConfig.js"

export const getAddressId = ({ AddressLine1, AddressLine2, city, state, pincode, country }) => {
    return new Promise((resolve, reject) => {
        try {
            console.log(AddressLine1);
            console.log(AddressLine2);
            console.log(city);
            const addressQuery = `INSERT INTO ADDRESS (ADDRESS_LINE1,
                                                        ADDRESS_LINE2,
                                                        CITY,
                                                        STATE,
                                                        PINCODE,
                                                        COUNTRY) VALUES ('${AddressLine1}','${AddressLine2}','${city}','${state}',${pincode},'${country}');`
            connection.query(addressQuery, (error, result) => {
                if (error) {
                    return reject({ error: error.message, status: 501 })
                }
                resolve({ message: "Successfully Inserted into Address tables", addressId: result.insertId })
            })

        } catch (error) {
            return reject({ error: error.message, status: 500 })
        }
    })
}