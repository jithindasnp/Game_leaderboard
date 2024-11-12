import adminControllers from "../controllers/adminControllers";


const router = express.Router();

router.post("/leaderboard",verifyToken, adminControllers.leaderBoard);


export default router;