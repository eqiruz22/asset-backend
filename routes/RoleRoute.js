import express from "express";
import {
  createRepo,
  destroyRole,
  showAllRole,
  showRoleById,
  updateRole,
} from "../controllers/RoleController.js";

const route = express.Router();

route.get("/role", showAllRole);
route.get("/role/:id", showRoleById);
route.post("/role", createRepo);
route.patch("/role/:id", updateRole);
route.delete("/role/:id", destroyRole);

export default route;
