var express = require('express');
var router = express.Router();
const Assignment = require('../Services/assignment');
const AssignmentData=new Assignment;
const {authenticateToken}=require('../Jwt/auth/auth');

//In this API The admin be able to get list of modules in the project and Authenticated users be able to see only the assigned modules
router.get('/all_assignment',authenticateToken,async function(req,res){
    var auth_data=req.decode;
    let Result=await AssignmentData.findAllAssignment(auth_data)
    res.send(Result)
})
 
//In this API The admin be able to assign the modules to the new users.
router.post('/create_assignment',authenticateToken,async function(req,res){
    let data = req.body;
    var auth_data=req.decode;
    if (auth_data.username.role==='admin'){
        let Result = await AssignmentData.Insert(data);
        res.send(Result)
    }else{
        res.send({
            "message":"you can't add task you are not admin"
        })
    }
})

//IN this API The admin be able to update the task of assignment for the existing users
router.put('/update_assignment/:taskId',authenticateToken,async function(req,res){
    let taskid = req.params.taskId
    console.log(taskid);
    let data =req.body;
    let auth_data =req.decode;
    if (auth_data.username.role==='admin'){
        let Result = await AssignmentData.updateAssignment(data,taskid);
        if (Result){
            let Result = await AssignmentData.findOne(taskid)
            res.send(Result)
        }
    }else{
        res.send({
            "message":"you can't Update task you are not admin"
        })
    }
})


//In this API The admin be able to remove the task of assignment for the existing users
router.delete('/delete_assignment/:taskId',authenticateToken,async function(req,res){
    let taskid=req.params.taskId
    let auth_data =req.decode;
    if (auth_data.username.role==='admin'){
        await AssignmentData.deleteAssignment(taskid).then(data=>{
            if(data){
                res.send({'data':'Delete Event Sucessfully...   '})
            }
        })
    }else{
        res.send({
            "message":"you can't Delete task you are not admin"
        })
    }
})

// In this API The admin will be able to get the list of users on board and their current task assignment
router.get('/userWithAssignment',authenticateToken,async function(req,res){
    var auth_data=req.decode;
    let Result=await AssignmentData.userWithAssignment(auth_data)
    res.send(Result)
})




module.exports = router;
