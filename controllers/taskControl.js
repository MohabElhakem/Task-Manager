const path = require('path');
const task = require(path.join(__dirname,'..','data','task.js'));
const workspace = require(path.join(__dirname,'..','data','workspace.js'));

const createTask = async (req , res)=> {
  
    try {
        const workspace_id = req.params.workspace_id;
        const data = req.body;
    
        const safe = await workspace.findOne({creator_id: req.userPayload._id, _id : workspace_id });
        if(!safe){
            return res.status(403).json({ message: "Access denied or workspace not found" });
        }

        if (!data.name) {
            return res.status(400).json({ message: "Task name is required" });
        }
    
        const NewTask = await task.create({
                creator_id: req.userPayload._id,
                workspace_id: workspace_id,
                name: data.name,
                note: data.note,
                isDone: data.isDone,
                priority: data.priority,
                timeframe: data.timeframe
        })
        return res.status(201).json({
            message: `Task added succsefuly to ${safe.workspaceName} `,
            task: NewTask,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:"Error while creating the task",
            error: error.message
        })
    }
};



const ws_tasks = async (req,res) => {

    try {
        const workspace_id = req.params.workspace_id;
        const Aworkspace = await workspace.findOne({creator_id : req.userPayload._id, _id: workspace_id });
    
        if(!Aworkspace){
            return res.status(403).json({ message: "Access denied or workspace not found" });
        }

        const tasks = await task.find({creator_id : req.userPayload._id, workspace_id: workspace_id})
    
        const TasksOfWorkspaces={};
    
        for (const tws of tasks){
            
            const priority = tws.priority || "unassigned"
            if(!TasksOfWorkspaces[priority]){
                TasksOfWorkspaces[priority]=[]
            }
    
            TasksOfWorkspaces[priority].push({
                name: tws.name,
                note: tws.note,
                isDone: tws.isDone,
                timeframe: tws.timeframe,
            })
        }
    
        return res.status(200).json({
            message:"Your tasks are",
            tasks: TasksOfWorkspaces
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: error.message});
    }

}
module.exports = {createTask,ws_tasks};