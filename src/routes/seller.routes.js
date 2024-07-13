import { Router } from "express"
import { registerSeller, loginSeller, forgotPassword } from "../controllers/seller.contollers.js"

const router = Router()

router.route("/register").post(registerSeller)
router.route("/login").get(loginSeller)
router.route("/forgotPassword").get(forgotPassword)

export default router
