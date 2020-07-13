# node-taskmanager-app
This is the task managing app to maintain a list of tasks you have to perform in daily life.
This is an API so it will run on postman or related softwares. It has no frontend. It totally works on the basis of request and response which should be handled in postman.
Url pattern list is given below:
1. Creating user. https://node-taskmanager-app.herokuapp.com/users (POST)
   Example of the request body: 
                                {
                                  "name" : "Siddhant Jain",
                                  "email" : "a_to_z@gmail.com",
                                  "password" : "siddhantjain"
                                }
                                
2. Login user. https://node-taskmanager-app.herokuapp.com/users/login (POST)
   Example of the request body: 
                                {
                                  "email" : "a_to_z@gmail.com",
                                  "password" : "siddhantjain"
                                }
                                
3. Logout user. https://node-taskmanager-app.herokuapp.com/users/logout (POST)
   No request body
   
4. Logout user from all devices. https://node-taskmanager-app.herokuapp.com/users/logoutAll (POST)
   No request body
   
5. Read user profile. https://node-taskmanager-app.herokuapp.com/users/me (GET)
   No request body
   
6. Update user profile. https://node-taskmanager-app.herokuapp.com/users/me (POST)
   Example of the request body: 
                                {
                                  "age" : "20"
                                }
                                
7. Delete user profile. https://node-taskmanager-app.herokuapp.com/users/me (DELETE)
   No request body
   
8. Get User Profile Photo. https://node-taskmanager-app.herokuapp.com/users/{{user_id}}/avatar (GET)
   No request body
   
9. Upload User Profile Photo. https://node-taskmanager-app.herokuapp.com/users/me/avatar (POST)
   form-data : key=avatar, value=photo.jpg
   
10.Delete User Profile Photo. https://node-taskmanager-app.herokuapp.com/users/me/avatar (DELETE)
   No request body
   
11.Create Task. https://node-taskmanager-app.herokuapp.com/tasks (POST)
   Example of the request body: 
                                {
                                  "description" : "complete 20 coding problems today.",
                                  "completed" : false
                                }
                                
12.Get tasks of user. https://node-taskmanager-app.herokuapp.com//tasks?limit=6&sortBy=createdAt:asc (GET)
   No request body. (-limit and sortBy are params passed.)
   
13.Get particular task of user. https://node-taskmanager-app.herokuapp.com//tasks/{{task_id}} (GET)
   No request body
   
14.Update a particular task. https://node-taskmanager-app.herokuapp.com//tasks/{{task_id}} (PATCH)
   Example of request body: 
                            {
                              "completed" : true
                            }
                            
15.Delete a particular task. https://node-taskmanager-app.herokuapp.com//tasks/{{task_id}} (DELETE)
   No request body
   
