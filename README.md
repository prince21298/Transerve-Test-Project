# Transerve-Test-Project
In this I made Application Of Backend part 

If you want to setup this then you have clone it

        git clone https://github.com/prince21298/Transerve-Test-Project.git

## Last process
you have to set your enviroment instead of `sample.env` accordingly variables.

After that you have to run this command step by step.

        cd Transerve-Test-Project
        npm install
        npm start

##  Requirements
`Knex`

        npm i knex -g

`node`
`postgres`



you also can try with API which I hosted
Most Of the API only admin can Access

`GET`

for check server is working:

        http://13.232.32.187:4001/demo

output will be `Hello, How are you`

If you are getting this that's means server is working


for getting all assignment:

        http://13.232.32.187:4001/all_assignment

for getting User with their Crossponding task:

        http://13.232.32.187:4001/userWithAssignment

`POST`

for SignUp normal users:

        http://13.232.32.187:4001/sign_up

for login normal user or admin:

        http://13.232.32.187:4001/login

for admin will Sign_in with userId and password

    {
	"userId":"****",
	"password":"*****"
    }    

Or, Normal user Sign_in with email and password

        {
	"email":"****",
	"password":"*****"
    }   

for assign task to normal users only admin can assign:

        http://13.232.32.187:4001/create_assignment

`UPDATE`

for update task of normal users only admin can update:

        http://13.232.32.187:4001/update_assignment/{taskId}

`DELETE`

for Delete task of normal users only admin can Delete:

        http://13.232.32.187:4001/delete_assignment/{taskId}


