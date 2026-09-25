import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB CONNECTION ERROR", error);
  });

function getUsers(name, job) {
  const filter = {};

  if(name !== undefined){
    filter.name = name;
  }
  if(job!==undefined){
    filter.job = job;
  }
  //find() rets a mongoose query, backend handles it w .then and .catch
  return userModel.find(filter);
}

// finds one user id
function findUserById(id){
    return userModel.findById(id);

}
//converts the request data into a mongoose document and saves in MongoDB
function addUser(user){
    const userToAdd = new userModel(user);
    return userToAdd.save();
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}
function deleteUserById(id){
    return userModel.findByIdAndDelete(id);
}
//make functions available to backend.js
export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUserById,
};