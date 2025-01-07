import express from 'express';
import { getUsers, createUser, updateUser, deleteUser, getUserById, loginUser } from '../controllers/userController.js';
import { requireAuth } from '../middleware/requireAuth.js';

export const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/",createUser);
router.post("/login", loginUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
