const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("name").trim().notEmpty(),
  ],
  authController.register.bind(authController)
);

router.post("/verify-otp", authController.verifyOTP.bind(authController));

router.post(
  "/login",
  [body("email").isEmail().normalizeEmail(), body("password").notEmpty()],
  authController.login.bind(authController)
);

router.post(
  "/request-password-reset",
  authController.requestPasswordReset.bind(authController)
);

router.post(
  "/reset-password",
  [body("newPassword").isLength({ min: 6 })],
  authController.resetPassword.bind(authController)
);

router.post(
  "/token-validation",
  authController.verifyToken.bind(authController)
);

module.exports = router;
