const express = require("express");
const bodyParser = require('body-parser')
const ejs = require("ejs");

//Introduction of external modules
const admin = require("./routes/admin");

const app = express()
//Configure template engine
//Configure static web directory 
app.use(express.static("static"))
app.engine("html", ejs.__express)
app.set("view engine", "html")


// Configure third-party Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use("/admin", admin)
 


app.listen(3030)

