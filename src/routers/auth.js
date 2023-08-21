import express from "express";
// import { getLoginPage, login } from "../controllers/auth.js";
import { AuthController } from "../controllers/index.js";

const router = express.Router();

// router.get('/signin', getLoginPage);
// router.post('/signin', login);

router.post('/signup', AuthController.signup);
router.post('/signin', AuthController.signin);

export default router