import { Router } from "express";
import { getusers,login, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
// in this Wew use Multer to upload Files
router.route("/register").post(
    registerUser
)
router.route("/allusers").get(getusers)
router.route("/login").post(login)

router.route("/logout").post(verifyJWT,logoutUser)

export default router
