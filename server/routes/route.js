const router = require("express").Router();
const AuthMiddleware = require("../middleware/Verify.token.js");
const { logout, login, register } = require("../controller/user_controll.js");
const { tasks_register, tasks_data, tasks_update, tasks_delete } = require("../controller/tasks_controller.js");

/** HTTP Reqeust */

// router.get("/download", Download); // download texture files on server

router.post("/signup", register); // user registration controller
router.post("/signin", login); // user login controller
router.post("/signout", logout); // user logout controller

router.post("/task", AuthMiddleware, tasks_register); // Get all users details
router.get("/task", AuthMiddleware, tasks_data); // admin and users can reset the password
router.put("/task/:id", AuthMiddleware, tasks_update); // admin and users can delete
router.delete("/task/:id", AuthMiddleware, tasks_delete); // admin and users can delete

module.exports = router;
