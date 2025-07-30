const path = require('path');
const express = require('express');
const task = require('../data/task');
const router = express.Router()
const userControl = require(path.join(__dirname,'..','controllers','userControl.js'));
const helper_T = require(path.join(__dirname,'..','helpers','tokens.js'));
const taskControl = require(path.join(__dirname,'..','controllers','taskControl.js'));
const workspaceControl = require(path.join(__dirname,'..','controllers','workspaceControl.js'));



// WorkSpace Manipulation end-points 
   



    // New Workspace 
    router.post('/new/workspace',helper_T.authTokenMiddleware , workspaceControl.createWorkspace);

    // Show all my WorkSpaces
    router.get ('/myWorkspaces' , helper_T.authTokenMiddleware , workspaceControl. myWorkspaces );

    // Delete workspase and all the tasks in it 
    router.delete('/delete/:workspace_id',helper_T.authTokenMiddleware , workspaceControl.erase);




// Tasks Manipulation end_points

 


    // New Task in A WorkSpace
    router.post('/new/task/:workspace_id' , helper_T.authTokenMiddleware , taskControl.createTask);

    // Show All My Tasks
    router.get ('/myTasks/:workspace_id', helper_T.authTokenMiddleware , taskControl.ws_tasks);

    //delete one task
    router.delete('/delete/One_Task/:task_id', helper_T.authTokenMiddleware , taskControl.eraseOneTask);

    

module.exports = router;
