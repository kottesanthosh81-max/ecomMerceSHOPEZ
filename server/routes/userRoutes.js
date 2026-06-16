const express = require("express");
const router = express.Router();

const {
  register,
  getUsers,
  loginUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

router.post("/", register);
router.get("/", getUsers);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;