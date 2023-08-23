import express from "express";
import {
  createAsset,
  destroyAsset,
  showAllAsset,
  showAssetById,
  updateAsset,
} from "../controllers/AssetController.js";

const route = express.Router();

route.get("/asset", showAllAsset);
route.get("/asset/:id", showAssetById);
route.post("/asset", createAsset);
route.patch("/asset/:id", updateAsset);
route.delete("/asset/:id", destroyAsset);

export default route;
