const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require('method-override')

const Chat=require("./model/chat.js");

const app = express();
const port = 7080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.listen(port, () => {
  console.log("Server connected successfully");
});

app.get("/chats", async(req, res)=>{
  let allChats=await Chat.find();
  res.render('index.ejs', {allChats});
})

app.get("/chats/new", (req, res)=>{
  res.render("new.ejs");
})

app.post("/chats", (req, res)=>{
  let {from, to, mesg}=req.body;
  let chat=new Chat({
    from,
    to,
    mesg
  });
  chat.save().then(res=>console.log(res)).catch(err=>console.log(err));
  res.redirect("/chats");
})

app.get("/chats/:id/edit", async(req, res)=>{
  let {id}=req.params;
  let getData=await Chat.findById(id);
  res.render("edit.ejs", {getData});
})

app.patch("/chats/:id", async(req, res)=>{
  let {id}=req.params;
  let {mesg}=req.body;
  Chat.findByIdAndUpdate(id, {mesg:mesg}, {new:true}, {runValidators:true}).then(res=>console.log(res)).catch(er=>console.log(er));
  res.redirect("/chats");
})

app.delete("/chats/:id", (req, res)=>{
  let {id}=req.params;
  Chat.findByIdAndDelete(id, {new:true}).then(res=>console.log(res)).catch(err=>console.log(err));
  res.redirect("/chats");
})
