import {createUser} from "../controllers/user-controller";
import {Router} from "express";

const router = Router();

router.post("/", createUser);

export default router;