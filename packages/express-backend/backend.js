import express from "express";
import cors from "cors";
import userServices from "./models/user-services.js";

const app = express();
const port = 8000;

app.use(cors());

//convs json request bodies in js objects
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  //getUsers rets a mongoose query instead of an array
  // .then runs after users are ret by MongoDB
  userServices
    .getUsers(name, job)
    .then((users) => {
      res.send({users_list: users });
    })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Unable to get users.");
      });
});
//get user id
app.get("/users/:id", (req, res) =>{
  const id = req.params.id;

  userServices
    .findUserById(id)
    .then((user) => {
      if(user===null){
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Unable to find user.");
    });
});
//POST-->user
app.post("/users", (req, res) => {
  const userToAdd =req.body;
  userServices
    .addUser(userToAdd)
    .then((newUser) => {
      //201 means that a new resource was successfully created
      res.status(201).send(newUser);
    })
    .catch((error) =>{
      console.log(error);
      //400 = the user committed a schema violation, something like missing name or a job less than < 2 chars
      res.status(400).send(error.message);
    });
});
//DELETE-->user by id :(
app.delete("/users/:id", (req, res) =>{
  const id = req.params.id;
  userServices
    .deleteUserById(id)
    .then((deletedUser) => {
      // if user not find ret null
      if(deletedUser=== null){
        res.status(404).send("Resource not found");
      } else {
      // 204 means successfully deleted the user
      res.status(204).send();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Unable to delete user.");
    });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
