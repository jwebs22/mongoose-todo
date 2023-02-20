//import mongoose library
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

//create a taskSchema 
const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String, 
    completed: { type: Boolean, required: true },
    dateCreated: { type: Date, default: Date.now, required: true },
    dateCompleted: { type: Date },
    status: { type: String, default: "incomplete", required: true, enum: ["incomplete", "complete", "deferred"] },
    id: {type: String, default: uuidv4},
}); 

//register model to collection
const Task = mongoose.model("sample_tasks", taskSchema);

//make our model accessible to outside files 
module.exports = Task;