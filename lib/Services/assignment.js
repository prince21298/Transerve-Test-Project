var Assignment = require('../Model/assignment');
var Users=require('../Model/users')


module.exports= class AssignmentService {

    // In this function Authenticated users be able to get only the his assigned modules
    // And The admin be able to get list of modules in the project
    async findAllAssignment(auth_data,txn){
     if(auth_data.username.role==='admin'){
        let assignment_details = await Assignment.query(txn)
        return assignment_details;
     }
     else{
        let assignment_details = await Assignment.query(txn).where({'assignTo':auth_data.username.email})
        return assignment_details;
     }
    }

    // In this function The admin be able to assign the modules to the new users.
    async Insert(data,txn){
        console.log(data);
        let assignment_details= await Assignment.query().insertGraph(data)
        return assignment_details;
    }

    // In this function The admin be able to update the task of assignment for users
    async findOne(taskid,txn){
        return await Assignment.query(txn).where({'id':taskid})
    }

    // In this function The admin be able to get the task after updateing fields of assignment for users
    async updateAssignment(data,taskid,txn){
        return await Assignment.query(txn).update(data).where({'id':taskid})
    }

    // In this function The admin be able to remove the task of assignment for users
    async deleteAssignment(taskid,txn){
        return await Assignment.query(txn).delete().where({'id':taskid})
    }


    // In this Function The admin be able to get the list of users on board and their current task assignment
    async userWithAssignment(auth_data){
        if(auth_data.username.role==='admin'){
            let user_details = await Users.query().select('username','email')
            var storage_data={}
            const promises=await user_details.map(async value=>{
                let assignment_details=await Assignment.query().where({'assignTo':value.email}).select('projectNmae','assignmentTask','taskDescription')
                storage_data[value.username]=assignment_details
                return storage_data
            })
            const total_data=await Promise.all(promises)
            return total_data[1]
        }
        else{
            return {'data':'you can not see this because you are not admin'}
        }
    }
}