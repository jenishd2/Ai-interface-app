import {Router} from "express"
import { Createchat } from "../controllers/chat.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/data").post(verifyJWT,Createchat)

export default router