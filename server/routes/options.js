import express from "express";
import {
  getOptionTypes,
  getOptionsByType,
  getAllOptions,
  getOptionById,
} from "../controllers/optionsController.js";

const router = express.Router();

// GET /api/options/types - Get all option types
router.get("/types", getOptionTypes);

// GET /api/options/type/:typeId - Get options by type
router.get("/type/:typeId", getOptionsByType);

// GET /api/options - Get all options
router.get("/", getAllOptions);

// GET /api/options/:id - Get single option
router.get("/:id", getOptionById);

export default router;
