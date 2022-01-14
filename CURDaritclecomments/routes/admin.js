const express = require("express");
const router = express.Router()
const article = require("./admin/article")
const comment = require("./admin/comment")
const find = require("./admin/find")
    
  
router.get("/", (req, res) => {
    res.render("main/index.html")    
}) 
 
router.get("/welcome",(req,res)=>{
    res.send("welcome to the System! ~~~(^v^)~~~ ");
 })

 router.get("/logout",(req,res)=>{

    res.render('main/logout.html', {
        redirectUrl: "/admin/logout",
        message: "BYE BYE Thanks for useing"
    });

 })

 
router.use("/article", article)
router.use("/comment", comment)
router.use("/find", find)

      

module.exports = router