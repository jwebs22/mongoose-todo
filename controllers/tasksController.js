const Task = require('../models/Tasks');
const Tasks = require('../models/Tasks');

//Create One Task --DONE
async function createOneTask(req, res, next) {
    try {
      //parse out fields from POST request
      const name  = req.body.name
      const description = req.body.description 
      const completed = req.body.completed
      
      //pass fields to new Tasks model 
      const newTask = new Task({
          name,
          description,
          completed
      });

      //save our new entry to the database 
      const savedData =  await newTask.save();

      //return the successful request to the user 
      res.json({
          success: true,
          tasks: savedData
      });
  
    } catch (e) {
      console.log(typeof e);
      console.log(e);
      res.json({
        error: e.toString(),
      });
    }
  };


// GET all tasks --DONE
async function getAllTasks(req, res, next)
{
   //query tasks
   try {
    const allTasks = await Tasks.find({});
    res.json({tasks: allTasks });
  }catch(e){
    console.log(e);
  }
};

// DELETE one by ID --DONE
async function deleteOneById(req, res, next)
{
  const entryId = req.params.id;

    try {
        await Tasks.deleteOne({id: entryId});
    } catch (err) {
        console.log(err);
        throw err;  
    }

    res.json({
        success: true,
        message: `task entry id ${entryId} deleted`
    })
};

// PUT Update a task by id to mark it complete
//I didn't know how to create a toggle on the same route, 
//so made a seperate route for complete/incomplete. 
//I tried using $bit, but just didn't understand what it was doing.
async function updateTaskComplete(req, res, next)
{
  const updateId = req.params.id;

  try {
    
    await Tasks.updateOne(
      {id: updateId},
      {$set: {
        completed: true,
        dateCompleted: new Date(),
        status: "complete"
      }}
      )
    
  } catch (err) {
    console.log(err);
    throw err;
  }

  res.json({
    success: true,
    message: `task update id ${updateId} status updated`
  })
};

//PUT Update a task by ID to mark incomplete

async function updateTaskIncomplete(req, res, next)
{
  const updateId = req.params.id;

  try {
    
    await Tasks.updateOne(
      {id: updateId},
      {$set: {
        completed: false,
        //returns null, is there a way to delete it?
        dateCompleted: "",
        status: "incomplete"
      }}
      )
    
  } catch (err) {
    console.log(err);
    throw err;
  }

  res.json({
    success: true,
    message: `task update id ${updateId} status updated`
  })
};

// DELETE Multiple --DONE

async function deleteMulti(req, res, next)
{
  const deleted = await Tasks.deleteMany(
      {name: "test"}
      )

  res.json({
    success: true,
    message: `${deleted.deletedCount} tasks fit the query and were deleted.`
  });    
    
}

// POST Create Multi --DONE

async function createMulti(req, res, next)
{
  try {

    const name  = req.body.name
    const description = req.body.description 
    const completed = req.body.completed

    const newTasks = req.body
    const savedTasks = await Tasks.create(newTasks)
    
    res.json({
        success: true,
        tasks: savedTasks
    });
    
  } catch (err) {
    console.log(err);
    throw err;
  }
}


module.exports = {
    createOneTask,
    getAllTasks,
    deleteOneById,
    updateTaskComplete,
    updateTaskIncomplete,
    deleteMulti,
    createMulti 
};