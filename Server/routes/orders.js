import express from "express";
import {getOrderByUserId ,createOrder, deleteOrder, getOrderById, getOrders, updateOrder } from "../controllers/orderController.js";


export const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.get("/:id", getOrderByUserId);