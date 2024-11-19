import express from 'express';
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier, getSupplierById } from '../controllers/supplierController.js';

export const router = express.Router();

router.get("/", getSuppliers);
router.get("/:id", getSupplierById);
router.post("/", createSupplier);
router.patch("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

