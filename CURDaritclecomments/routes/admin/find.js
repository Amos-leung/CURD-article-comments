const express = require("express");
const articleModel = require("../../model/article.js");
const router = express.Router()


router.get("/allshow", async (req, res) => {

    let result = await articleModel.aggregate([
        {
            $lookup: {
                from: "comment",
                localField: "title",
                foreignField: "articletitle",
                as: "sum"
            }

        }
    ]).sort({ "username": 1 })

    res.render("show/allshow.html", {
        list: result
    })
})

router.get("/accuratelyfind", (req, res) => {
    res.render("show/find.html", {})
})

router.post("/doFind", async (req, res) => {
    var username = req.body.username;
    var atitle = req.body.atitle;
    if (username == "" && atitle == "") {
        res.render('public/error.html', {
            redirectUrl: "/admin/comment/find",
            message: "Username and atitle could not be null at same time (●'◡'●)"
        });
        return;
        // find comment by atitle
    } else if (username == "") {
        let result = await articleModel.aggregate([
            {
                $lookup: {
                    from: "comment",
                    localField: "title",
                    foreignField: "articletitle",
                    as: "sum"
                }
            },
            {
                $match: {
                    title: atitle
                }
            }
        ])
     
        res.render("show/accuratelyshow", {
            list: result 
        })  
        
        // find comment by username
    } else if (atitle == "") {
        let result = await articleModel.aggregate([
            {
                $lookup: {
                    from: "comment",
                    localField: "title",
                    foreignField: "articletitle",
                    as: "sum"
                }
            }, 
            {
                $match: {
                    username: username
                }
            }
        ])
     
        res.render("show/accuratelyshow", {
            list: result
        })
        
        // username atitle !=null; find comment by username & atitle
    } else {
        let result = await articleModel.aggregate([
            {
                $lookup: {
                    from: "comment",
                    localField: "title",
                    foreignField: "articletitle",
                    as: "sum"
                }
            },
            {
                $match: {
                    username: username,
                    title: atitle
                }
            }
        ])
       
        res.render("show/accuratelyshow", {
            list: result
        })
    }
})

module.exports=router