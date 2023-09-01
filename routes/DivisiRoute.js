import express from "express";
import {
  createDivisi,
  destroyDivisi,
  showAllDivisi,
  showDivisiById,
  updateDivisi,
} from "../controllers/DivisiController.js";

const route = express.Router();

route.get("divisi", showAllDivisi);
route.get("divisi/:id", showDivisiById);
route.post("divisi", createDivisi);
route.patch("divisi/:id", updateDivisi);
route.delete("divisi/:id", destroyDivisi);

export default route;
