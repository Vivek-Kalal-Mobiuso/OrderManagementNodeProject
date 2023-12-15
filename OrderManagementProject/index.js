import express from "express";
import customerRoutes from './routes/customerRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import connection from "./database/databaseConfig.js";

const app = express();
app.use(express.json())
const PORT = 3001



// Connect 
connection.connect((err) => {
    if (err) {
        console.error("Error Connection database");
    } else {
        console.log("Database connected");
        connection.query("SELECT * FROM online_customer", function (err, result, fields) {
            if (err) throw err;
            // console.log(result);
        });
    }
})

// customer routes
app.use("/customers", customerRoutes);

// order routes
app.use("/orders", orderRoutes);

app.listen(PORT, () => {
    console.log("server is running on port : ", PORT);
})