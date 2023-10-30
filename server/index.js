import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { connect } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import discountRoutes from "./routes/discountRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import {
  notFound,
  errorHandler,
} from "./middlewares/errorMiddleware.js";

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({ limit: "30mb", extended: true })
);
app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/feedbacks", feedbackRoutes);

app.use(notFound);
app.use(errorHandler);

connect();

app.listen(port, () =>
  console.log(`Listening on port: http://localhost:${port}`)
);
