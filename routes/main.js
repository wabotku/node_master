const router = require("express").Router();
const controllers = require("../controllers/init");

router.get("/", controllers.mainController.getData);
router.post("/", controllers.mainController.postData);
router.put("/", controllers.mainController.putData);
router.delete("/", controllers.mainController.deleteData);

module.exports = router;
