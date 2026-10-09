const express = require("express");
const router = express.Router();

const usercontroller = require("../controllers/usercontrollers");
router.post("/createuser", usercontroller.createuser);
router.get("/getalluser", usercontroller.getalluser);
router.post("/login", usercontroller.login);
router.post("/searchuser/:value", usercontroller.searchuser);
router.put("/update/:id", usercontroller.update);
router.delete("/delete/:id", usercontroller.delete);

module.exports = router;