import express from "express";
import {
  createCategory,
  destroyCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/CategoryController.js";

const route = express.Router();

route.get("/category", getAllCategory);
route.get("/category/:id", getCategoryById);
route.post("/category", createCategory);
route.patch("/category/:id", updateCategory);
route.delete("/category/:id", destroyCategory);

export default route;
