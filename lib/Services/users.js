var User = require('../Model/users');
var bcrypt=require('bcryptjs');

module.exports= class userService {
    // In this Function User's data will Insert in users table. 
    async Insert(data,txn){
        const pass = await bcrypt.hash(data.password,8)
        data['password']=pass
        let user_details= await User.query(txn).insertGraph(data)
        return user_details;
    }

    // in this Function I checked password which user entered is it correct or not
    async passChecking(emailVerify,data){
        return bcrypt.compare(data,emailVerify.password)
    }

    // in this function i checked email which user entered is it valid or not.
    async emailVerify(data,txn){
       var user_details= await User.query().findOne('email',data)
       return user_details
    }
}