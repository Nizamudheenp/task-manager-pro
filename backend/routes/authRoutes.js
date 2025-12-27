const router = require("express").Router();
const { register, login } = require("../controllers/authController");
const { registerValidation, loginValidation } = require("../validations/authValidation");

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

module.exports = router;
