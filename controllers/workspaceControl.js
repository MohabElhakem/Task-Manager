const path = require('path');
const { exit } = require('process');
const workspace = require(path.join(__dirname,'..','data','workspace.js'));
const task = require(path.join(__dirname,'..','data','task.js'));


//Create the workspace
const createWorkspace = async(req,res)=>{
    try {
        const data = req.body;
        //all the things you need from the user only the creator id is from the payload
        await workspace.create({
            workspaceName: data.Name,
            note: data.note,
            priority: data.priority,
            creator_id: req.userPayload._id,
        });
        return res.status(201).json({message: "New Workspace Added..... Good Luck Reaching Your Goal"});

    } catch (error) {
        // deals with duplicated fields
        if (error.code === 11000){
        const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({error: `${field} already exists`});
        }else if (error.name === 'ValidationError'){
            // deals with required stuff
            return res.status(400).json({ error: error.message });
        }else{
            // other errors
            return res.status(500).json({error: error.message});
        }
    }
}

// My work spaces
const myWorkspaces = async (req,res)=>{
    try {
        const workspaces = await workspace.find({creator_id: req.userPayload._id});
    
        if(workspaces.length === 0 ){
            return res.status(200).json({message:"Creat Your Very First Own Workspace Please....."});
        }
        
    //Doing it with the ocp principle in the solid for oop 

        //Empty object to hold your workspaces
        const groupWS = {};

        // for......of loop through workspaces as long as ws (the items inside) exists
        for (const ws of workspaces){
            const priority = ws.priority || "unassigned";
            if(!groupWS[priority]){
                groupWS[priority]= [];
            }
            
            groupWS[priority].push({
                workspaceName: ws.workspaceName,
                _id : ws._id
             });
        }
        return res.status(200).json({
            message:"Here are all the workspaces you have",
            ...groupWS
        });

    } catch (error) {
        console.error(error)
        return res.status(500).json({error: error.message});
    }
}

//Delete Workspace
const erase = async (req,res)=>{
    try {
        const workspace_id = req.params.workspace_id
        const exists = await workspace.exists({_id: workspace_id,creator_id : req.userPayload._id});
        if(!exists){
            return res.status(404).json({message: "There is no work space with that name"});
        }
        await task.deleteMany({workspace_id: workspace_id });
        await workspace.deleteOne({_id: workspace_id});
    
        return res.status(200).json({message: "Hope you Done will in your endeavor"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports={createWorkspace,myWorkspaces,erase};