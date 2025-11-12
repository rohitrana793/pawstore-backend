import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import breedRoute from "./routes/breedRoutes.js";
import userRoute from "./routes/userRoutes.js";
import productRoute from "./routes/productRoutes.js";
import blogRoute from "./routes/blogRoutes.js";
import subsscriberRoute from "./routes/subscriberRoutes.js";
import orderRoute from "./routes/orderRoutes.js";
import adminRoute from "./routes/adminRoute.js";
import contactRoute from "./routes/contactRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.get("/", (req, res) => {
  res.send("Pawstore backend running");
});

const Port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//routes
app.use("/api/breed", breedRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/blog", blogRoute);
app.use("/api/subscriber", subsscriberRoute);
app.use("/api/order", orderRoute);
app.use("/api/admin", adminRoute);
app.use("/api/contact", contactRoute);

connectDB().then(() => {
  app.listen(Port, () => {
    console.log(`Server running on port ${Port}`);
  });
});
