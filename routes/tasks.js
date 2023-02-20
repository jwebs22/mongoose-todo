var express = require('express');
var router = express.Router();

const tasksController = require('../controllers/tasksController');

// POST new task
router.post("/create-one", tasksController.createOneTask);

// GET all tasks
router.get("/all", tasksController.getAllTasks);

// DELETE one task by ID
router.delete("/delete-one-by-id/:id", tasksController.deleteOneById);

// PUT update task to mark complete
router.put("/updateComplete/:id", tasksController.updateTaskComplete);

// PUT update task to mark incomplete
router.put("/updateIncomplete/:id", tasksController.updateTaskIncomplete);

// DELETE Multiple
router.delete("/delete-multi", tasksController.deleteMulti);

// POST Creat Multi
router.post("/create-multi", tasksController.createMulti);




module.exports = router;