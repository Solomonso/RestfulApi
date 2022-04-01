
## Getting Started

 Before you run the server to test the various endpoint, make you sure have node installed on your pc. This is the link https://nodejs.org/en/ download the LTS version if Node JS is not already Installed on your pc. 

Test data are provided for testing json and xml which is in the **testData** directory found inside the project.

Summary of the project structure

* **Controller** directory where all the operations for the CRUD functions are written
* **routes** directory  for the API routes
* **Schemas** directory with the schemas used for validating.

## Installation 

 After cloning the project with any code editor preferably (IntelliJ Ultimate or Visual studio code) 

Type to install all the packages needed

```
npm install
```



## How to Run

Type the command to start the server

```
node server.js or
nodemon server.js
```

## Endpoint

These are the various endpoints 

http://localhost:4000/api/album

http://localhost:4000/api/topsong

http://localhost:4000/api/country

All have functionalities of CRUD both in xml and Json and data is validated.

The Content-type should be changed to application/json or application/xml. 

## Software needed

Postman for testing the endpoints.

This is a link to download DB browser for SQLite  https://sqlitebrowser.org/dl/ if you want to load the database found in the project as **database.sqlite**, but it is not needed to test the endpoints.

 
## Note do not forget to specify the content type in the header for either json or xml
