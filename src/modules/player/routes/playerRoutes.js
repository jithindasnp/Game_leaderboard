import authenticationControllers from "../controllers/authenticationControllers.js";
import express from 'express'
import playerControllers from "../controllers/playerControllers.js";
import { verifyToken } from "../../../utilities/token.js";

const router = express.Router();

router.post("/update-score",verifyToken, playerControllers.updateScore);
router.post("/check-score",verifyToken, playerControllers.checkScore);


export default router;