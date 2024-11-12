import authenticationControllers from "../controllers/authenticationControllers.js";
import express from 'express'

const router = express.Router();

router.post("/login", authenticationControllers.login);
router.post("/login-admin", authenticationControllers.login);
router.post("/add-admin", authenticationControllers.adminRegister);
router.post("/add-player", authenticationControllers.playerRegister);


export default router;