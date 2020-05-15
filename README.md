# task-api
REST API built using NodeJS, Express, Mongoose 

This API is deployed on heroku. You can use it through postman using base URL [https://mittal-task-manager-api.herokuapp.com](https://mittal-task-manager-api.herokuapp.com)

**Features:**
1. Password is stored in hash
2. User is authenticated before making API requests
3. User can upload image.
4. MongoDB is used
5. Options are provided for filtering, pagination and sorting of data
6. Emails are sent when user send request to create account and destroy account.
```
User:
{
  name: String, required
  email: String, required, unique
  password: String, required, minLength=7
  age: Number, required
}
```

# Endpoints for user
1. **POST /users/login:** <br /> Allows user to send their email and password. If successful, an auth token is generated, stored and passed for further use of API.
1. **POST /users/logout:** <br /> Allows user to destroy token and logout.
1. **POST /users/logoutAll:** <br /> Allows user to logout from all devices.
1. **POST /users/me/avatar:** <br /> Allows user to upload profile pic to MongoDB
1. **POST /users:** <br /> Allows user to signup
1. **PATCH /users/me:** <br /> Allows user to update his credentials
1. **GET /users/me:** <br /> Allows user to get their profile data
1. **GET /users/{userid}/avatar:** <br /> Sends profile pic
1. **DELETE /users/me:** <br /> Delete Account
1. **DELETE /users/me/avatar:** <br /> Delete profile picture

```
Tasks:
{
  description: String, required
  completed: Boolean
}
```

Task endpoints can only be used after user logins or signup
# Endpoints for task
1. **GET /tasks/{taskId}:** <br /> Sends a task corresponding to taskId
1. **GET /tasks:** <br />  Sends group of tasks
   <br /> **Options:**
   1. **limit:** Integer value for the no of tasks you want to get at a time
   1. **skip:** Integer value for the no of tasks you want to skip fro the beginning.
   1. **sortBy:** {completed, createdAt} :asc/:desc is added to string for getting data in ascending order/descending order
1. **POST /tasks:** <br /> Create a new task
1. **PATCH /tasks/{taskId}:** <br /> Update an existing task
1. **DELETE /tasks/{taskId}:** <br /> Delete a task
