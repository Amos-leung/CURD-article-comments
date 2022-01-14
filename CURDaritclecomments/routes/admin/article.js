const express = require("express");
const articleModel = require("../../model/article.js");
const tools = require("../../model/tool.js");



var router = express.Router()

router.get("/add", (req, res) => {
    res.render("article/add")
})

router.post("/doAdd", async (req, res) => {
    
    var username = req.body.username
    var title = req.body.title
    var content = req.body.content
    let temptitle = await articleModel.find({ "title": title })
    
    if (username == "" || title == "" || content == "") {

        res.render('public/error.html', {
            redirectUrl: "/admin/article/add",
            message: "Sorry the title/username/content can not be null ￣へ￣"
        });
        return;
    }
    
    if (temptitle.length > 0) {
        res.render('public/error.html', {
            redirectUrl: "/admin/article/add",
            message: "Sorry the title has existed ￣へ￣"
        });
        return;
    } else {

        var add = new articleModel({
            username: username,
            title: title,
            acontent: content,
            add_time: tools.getDate()

        })
        await add.save()
        console.log(tools.getDate())
        res.render('public/success.html', {
            redirectUrl: "/admin/welcome",
            message: "Congratulations Successfully Submit o(*￣▽￣*)ブ"
        });
    }
})

router.get("/show", async (req, res) => {

    let result = await articleModel.find({}).sort({ "username": 1 })
    
    res.render("article/show", {
        list: result
    })

})

router.get("/edit", async (req, res) => {

    var id = req.query.id

    var result = await articleModel.find({ "_id": id })

    if (result.length > 0) {
        res.render("article/edit", {
            list: result[0]
        })
    } else {
        res.render('public/error.html', {
            redirectUrl: "/admin/welcome",
            message: "Sorry there were something wrong Please contact the system manager ￣へ￣"
        })
    }

})


router.post("/doEdit", async (req, res) => {
    
    var id = req.body._id
    var add_time = req.body.add_time
    var title = req.body.title
    var content = req.body.content

    await articleModel.updateOne({ "_id": id }, { $set: { "acontent": content, "title": title, "add_time":add_time,"edit_time": tools.getDate() } })
    res.render('public/success.html', {
        redirectUrl: "/admin/article/show",
        message: "Congratulations Successfully Submit o(*￣▽￣*)ブ"
    });
 
})

router.get("/delete", async (req, res) => {
    // console.log(req.query.id)
    var id = req.query.id
    await articleModel.deleteOne({"_id":id})
    res.render('public/success.html', {
        redirectUrl: "/admin/article/show",
        message: "Successfully Delete the data o(*￣▽￣*)ブ"
    });

})

 
module.exports = router 