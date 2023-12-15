import mysql from "mysql2";

/** Database Connection ***/
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "orders",
})

export default connection ;