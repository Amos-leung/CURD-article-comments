const express = require("express");
const commentModel = require("../../model/comment.js");
const articleModel = require("../../model/article.js");
const tools = require("../../model/tool.js");

var router = express.Router()

router.get("/add", (req, res) => {
    res.render("comment/add.html", {})
})

router.post("/doAdd", async (req, res) => {
    
    var username = req.body.username;
    var content = req.body.ccontent;
    var atitle = req.body.atitle;
    let result = articleModel.find({ "title": atitle })
    if ((await result).length <= 0) {
        res.render('public/error.html', {
            redirectUrl: "/admin/comment/add",
            message: "The article title is not fund ￣へ￣"
        });
        return;
    } else {
        var add = new commentModel({
            username: username,
            content: content,
            articletitle: atitle,
            add_time:tools.getDate() 
        })
        await add.save();

        res.render('public/success.html', {
            redirectUrl: "/admin/welcome",
            message: "Congratulations Successfully Submit o(*￣▽￣*)ブ"
        });
    }
})

router.get("/show", async (req, res) => {

    let result = await commentModel.find({}).sort({ "username": 1 })

    res.render("comment/show", {
        list: result
    })
}) 

router.get("/edit", async(req, res) => {
  
    var id = req.query.id

    var result = await commentModel.find({"_id":id})
    console.log(result)
    if(result.length>0){
        res.render("comment/edit",{
        list:result[0]
    })
    return;
}else{
    res.render('public/error.html', {
        redirectUrl: "/admin/welcome",
        message: "Sorry there were something wrong Please contact the system manager ￣へ￣"
    })
}
    
})

router.post("/doEdit", async(req, res) => {

    var id = req.body._id
    var add_time = req.body.add_time
    var content = req.body.ccontent
    var temp = await commentModel.find({"_id":id}) 
   
    if(temp.length < 0 )
    {
        res.render('public/error.html', {
            redirectUrl: "/admin/comment/edit",
            message: "Sorry the title has existed ￣へ￣"
        });
        return;
    }
    else{
       await commentModel.updateOne({"_id":id},{$set:{"content":content,"add_time":add_time,"edit_time":tools.getDate()}})
       res.render('public/success.html', {
            redirectUrl: "/admin/comment/show",
            message: "Congratulations Successfully Submit o(*￣▽￣*)ブ"
        });
    }
}) 

router.get("/delete", async (req, res) => {
    
    var id = req.query.id
    await commentModel.deleteOne({"_id":id})
    res.render('public/success.html', {
        redirectUrl: "/admin/comment/show",
        message: "Successfully Delete the data o(*￣▽￣*)ブ"
    });

}) 

module.exports = router 