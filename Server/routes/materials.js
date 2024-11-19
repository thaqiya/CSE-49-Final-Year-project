import express from 'express';
import { getMaterials,getSupplierByBarcode, createMaterial, updateMaterial, deleteMaterial, getMaterialById } from '../controllers/materialController.js';

export const router = express.Router();

router.get("/", getMaterials);
router.get("/:id", getMaterialById);
router.post("/", createMaterial);
router.patch("/:id", updateMaterial);
router.delete("/:id", deleteMaterial);
router.get("/barcode/:barcode", getSupplierByBarcode);

