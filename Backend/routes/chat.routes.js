import {Router} from "express"
import { Createchat, getChatDetails, GetChats } from "../controllers/chat.controller.js"


const router = Router()

router.route("/data").post(Createchat)
router.route("/chats").post(GetChats)
router.route("/chats/:id").get(getChatDetails)

export default router