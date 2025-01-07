import { createConnection } from "mysql2";
import express from "express";
import cors from "cors";
import { router as UserRouter } from "./routes/users.js";
import { router as MissingPeopleRouter } from "./routes/missingPeople.js";
import { router as SupplierRouter } from "./routes/suppliers.js";
import { router as MaterialRouter } from "./routes/materials.js";
import { router as PaymentRouter } from "./routes/payment.js";
import { router as LocationRouter } from "./routes/location.js";
import { router as OrderRouter } from "./routes/orders.js";
import dotenv from "dotenv";
dotenv.config();

export const connection = createConnection({
  host: "localhost",
  user: "anurag",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const app = express();

connection.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  app.listen(5001, "0.0.0.0", () => {
    console.log("Connected to MySQL and listening on port 5001");
  });
});

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("App is running");
});

app.use("/api/users", UserRouter);
app.use("/api/missing-people", MissingPeopleRouter);
app.use("/api/suppliers", SupplierRouter);
app.use("/api/materials", MaterialRouter);
app.use("/api/payment", PaymentRouter);
app.use("/api/location", LocationRouter);
app.use("/api/orders", OrderRouter);

// orders table
// material_id(FK), scan_type(arrival/departure), latitude, longitude, bar_code_number, user_id(FK)

// select id from materials where bar_code_number = bar_code_number

// select * from table where user = userId
