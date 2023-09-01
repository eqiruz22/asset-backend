import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ProductRoute from "./routes/ProductRoute.js";
import UserRoute from "./routes/UserRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import SbuRoute from "./routes/SbuRoute.js";
import RoleRoute from "./routes/RoleRoute.js";
import TypeRoute from "./routes/TypeRoute.js";
import AssetRoute from "./routes/AssetRoute.js";
import DivisiRoute from "./routes/DivisiRoute.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(ProductRoute);
app.use(UserRoute);
app.use(CategoryRoute);
app.use(SbuRoute);
app.use(RoleRoute);
app.use(TypeRoute);
app.use(AssetRoute);
app.use(DivisiRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`server running on port ${process.env.APP_PORT}`);
});
