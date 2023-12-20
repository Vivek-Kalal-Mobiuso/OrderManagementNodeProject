import dotenv from 'dotenv'
import express from "express";
import customerRoutes from './routes/customerRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import connection from "./database/databaseConfig.js";

dotenv.config();
const app = express();
const PORT = 3001

app.use(express.json())

// Connect 
connection.connect((err) => {
    if (err) {
        console.error("Error Connection database");
    } else {
        console.log("Database connected");
    }
})

// customer routes
app.use("/api/v1/customers", customerRoutes);

// order routes
app.use("/api/v1/orders", orderRoutes);

app.listen(process.env.PORT || PORT, () => {
    console.log("server is running on port : ", process.env.PORT || PORT);
})