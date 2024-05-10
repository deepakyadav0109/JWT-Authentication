This project demonstrates a simple user authentication system using JSON Web Tokens (JWT)in a Node.js Express Application. It includes user registration, login, protected routes and Token Blacklisting functionalities.

To run this project locally on your machine, follow the steps : 

Requirements :
- 1. Node.js should be installed on your machine
- 2. npm should be availbale
 
Installation : 
- 1. Clone the GitHub repository to your local machine : git clone https://github.com/deepakyadav0109/JWT-Authentication.git

- 2. Navigate to the project directory : cd path/to/the/project/directory
- 3. Run : "npm install" to install all the dependencies.
- 4. Start thr server : node index.js or nodemon index.js. It will start the server at localhost:3000
 
You can connect the application to the locally created database( MySQL or SQLite or PostgreSQL). But for testing middleware functions, route-handlers, or error handling logic, you may not necessarily need to connect to the database.

Making requests : 

You can test the application by making endpoint requests in two ways : 
- 1. Using Postman
- 2. Using command-lines
I would suggest using Postman.

Making requests through Postman.
-
1. Registration
   -
   - Set up a POST request to `http://localhost:3000/api/auth/login`.
   - Set the request body to raw and select JSON in the dropdown menu. In the body, Write username and password in JSON format e.g.
   {
    "username": "Deepak",
    "password": "dpkydv"
}
   - Send the request.
   - You should receive a response indicating whether the user was registered successfully or if there was an error.
  
2. Login
   -
   - Set up a POST request to `http://localhost:3000/api/auth/login`.
   - Set the request body to JSON format with the username and password you registered.
   - Send the request.
   -  You should receive a response containing a JWT token if the login was successful.
  
3. Access Dashboard
   -
   - Copy the JWT token from the login response.
   - Set up a GET request to `http://localhost:3000/api/dashboard`.
   - Add the `Authorization` header with the value `Bearer <JWT_TOKEN>`, replacing <JWT_TOKEN> with the JWT token you copied.
   - Send the request.
   - You should receive a response containing the message "Protected route accessed successfully" if the token is valid and the user is authorized.
   - Or if any error occurs, you will receive the details about the error.
  
4. Logout
   -
   - Set up a POST request to `http://localhost:3000/api/auth/logout`.
   - Add the `Authorization` header with the value `Bearer <JWT_TOKEN>`, replacing <JWT_TOKEN> with the JWT token you want to blacklist.
   - Send the request.
   - You should receive a response indicating that the logout was successful.
  

The logout also adds the token to In-memory blacklistTokens, it means that the token becomes invalid as soon as user logs out. Now he can't login back using the same token.

I have also provided comments at almost every step of the code so that you can understand it clearly.

Thank You
