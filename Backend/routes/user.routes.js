import { Router } from "express";
import { getusers,login, logoutUser, registerUser, refreshAccessToken } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.route("/register").post(
    registerUser
)
router.route("/allusers").get(getusers)
router.route("/login").post(login)

router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)


export default router
