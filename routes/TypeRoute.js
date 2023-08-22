import express from "express";
import {
  destroyType,
  getAllType,
  getTypeById,
  insertType,
  updateType,
} from "../controllers/TypeController.js";

const route = express.Router();

route.get("/type", getAllType);
route.get("/type/:id", getTypeById);
route.post("/type", insertType);
route.patch("/type/:id", updateType);
route.delete("/type/:id", destroyType);

export default route;
