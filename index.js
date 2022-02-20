var express = require("express");
var app = express();
var fileUpload = require("express-fileupload");
app.use(express.urlencoded({ 'extended': false }));
app.use(express.static("public"));
var path = require("path");

app.use(fileUpload());
var mysql = require("mysql");

app.listen(process.env.PORT || 4555);
app.listen(4555, function () {
  
    console.log("server ok started");
});
app.get("/", function (req, resp) {
    console.log("okay");
    resp.sendFile(__dirname + "/public/1project.html");
})

var akm = {
    host: "localhost",
    user: "root",
    password: "",
    database: "1project"
}
var hostconn = mysql.createConnection(akm)
hostconn.connect(function (err) {
    if (err)
        console.log(err)
    else
        console.log("Chal Peya");
})
app.post("/submit", function (req, resp) {
    console.log("data page opened");
    resp.setHeader("content-type", "text/html");
    var Noprofilepic;
    if (req.files != null) {
        var location = path.join(process.cwd(), "uploadss", req.files.photoo.name);
        Noprofilepic = req.files.photoo.name;
        req.files.photoo.mv(location, function (err) {
            if (err)
                console.log(err);
            else
                console.log("file uploaded sucessfully");
        })
    }

    var dataAry = [req.body.txtemail, req.body.txtpass, Noprofilepic, req.body.txtname, req.body.txtnum, req.body.txtadd, req.body.txtstate, req.body.txtcity];
    hostconn.query("insert into 1citizen values(?,?,?,?,?,?,?,?,CURRENT_DATE())", dataAry, function (err) {
        if (err)
            console.log(err);
        else
            resp.send("record has been saved");
    })
  
        var nodemailer = require('nodemailer');


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'helpinghandpb03@gmail.com',
                pass: '03pbhandhelp'
            }
        });

        var mailOptions = {
            from: 'helpinghandpb03@gmail.com',

            to: req.body.txtemail,
            subject: 'Welcome To Helping Hand.',
            html: '<h2>Your Email Was Used At Our Site.Do You Confirm That It Was You?</h2><br>  <h6 style="background-color:rgb(125, 243, 7);width: 370px;"><div > <a href="https://www.youtube.com/" style="margin-right: 100px;background-color: rgb(170, 170, 255);padding: 16px;padding-left: 16px;margin-left: 50px;padding-right: 16;">Yes</a><br><br><br><br><a href="https://themoviesflix.us.com/" class="btn" style="background-color:pink;margin-right: 30px;padding: 11px;padding-left: 16px;padding-right: 16px;margin-left: 280px;">No</a></div></h6>',

        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


    })
    app.post("/settings", function (req, resp) {
        console.log("settings page opened");
        resp.setHeader("content-type", "text/html");

        var dataAry = [req.body.txtpassnew,req.body.txtemaill, req.body.txtpass];
        hostconn.query("update 1citizen set password=? where email=? and password=?", dataAry, function (err) {
            if (err)
                console.log(err);
            else
                console.log("password has been changed");
        })

    })
    
    app.post("/wrkersetting", function (req, resp) {
        console.log("Worker page opened");
        resp.setHeader("content-type", "text/html");

        var dataAry = [req.body.wrkpassnew,req.body.wrkcnrmpass,req.body.wrkmail, req.body.wrkpass];
        hostconn.query("update workers set password=?,cnfrmmpass=? where email=? and password=?", dataAry, function (err) {
            if (err)
                console.log(err);
            else
                console.log("password has been changed");
        })
        var dataAry = [req.body.wrkcnrmpass,req.body.wrkmail, req.body.wrkpass];
        hostconn.query("update workers set cnfrmmpass=? where email=? and password=?", dataAry, function (err) {
            if (err)
                console.log(err);
            else
                console.log("cnfrm has been changed");
        })
        resp.sendFile(__dirname + "/public/dash-worker.html");
    })
    

    app.post("/posttsubmit", function (req, resp) {
        resp.setHeader("content-type", "text/html");

        console.log("data saved");

        var dataAry = [0, req.body.txtid, req.body.txtcategoryy, req.body.txtwhat, req.body.txtdatee, req.body.txtcityy];
        hostconn.query("insert into postrequire values(?,?,?,?,?,?,CURRENT_DATE())", dataAry, function (err) {
            if (err)
                console.log(err);
            else
                resp.send("record has been saved");
        })

    })
    app.post("/adminsubmit", function (req, resp) {
        resp.setHeader("content-type", "text/html");

        console.log("data saved");

        var dataAry = [__filename,req.body.txtadminid, req.body.adminname,req.body.txtadmindob, req.body.txtadminpass, req.body.txtadminpos,req.body.txtpasskey];
        hostconn.query("insert into Admin values(?,?,?,?,?,?,?,CURRENT_DATE())", dataAry, function (err) {
            if (err)
                console.log(err);
            else
                resp.send("record has been saved");
        })

    })
    app.post("/checkRecord", function (req, resp) {
        hostconn.query("select * from 1citizen where email=?", [req.body.email], function (err, result) {
            if (err)
                resp.send(err);
            else
                resp.send(result);
        })
    })
    app.get("/admincheck", function (req, resp) {
        console.log("hlooo");
        console.log(req.query.a);
        hostconn.query("select * from Admin where email=? and passkey=?", [req.query.a,req.query.b], function (err, result) {
            if (err)
                resp.send(err);
            else
                resp.send(result);
        })
    })

    app.get("/citizencheckk", function (req, resp) {
        console.log("kyoooo");
        console.log(req.query.c);
        hostconn.query("select * from 1citizen where email=? and password=?", [req.query.c,req.query.d], function (err, result) {
            if (err)
                resp.send(err);
            else
            console.log("fsaufgas");
                resp.send(result);
        })
    })
    
    app.get("/workerrcheck", function (req, resp) {
        console.log("kyoni");
        console.log(req.query.c);
        hostconn.query("select * from workers where email=? and password=?", [req.query.e,req.query.f], function (err, result) {
            if (err)
                resp.send(err);
            else
            console.log("fsaufgas");
                resp.send(result);
        })
    })


    app.post("/workerprofile", function (req, resp) {
        console.log("data page opened");
        resp.setHeader("content-type", "text/html");
        var Noprofilepic;
        if (req.files != null) {
            var location = path.join(process.cwd(), "public/workerupload", req.files.profilee.name);
            Noprofilepic = req.files.profilee.name;
            req.files.profilee.mv(location, function (err) {
                if (err)
                    console.log(err);
                else
                    console.log("file uploaded sucessfully");
            })
        }
        if (req.files != null) {
            var Nidddpic;
            var location = path.join(process.cwd(), "public/workerupload", req.files.proof.name);
            Nidddpic = req.files.proof.name;
            req.files.proof.mv(location, function (err) {
                if (err)
                    console.log(err);
                else
                    console.log("idproof uploaded sucessfully");
            })
        }
    
        var dataAry = [Noprofilepic,req.body.txtemaillid,req.body.txxxtpasscret,req.body.txxxtpasscnfrm, req.body.txtnammme, req.body.txttnum, req.body.txxtstate,req.body.txttcitty, req.body.txtaddd, req.body.txtcat, req.body.txtexp,req.body.txtshop,req.body.txtwrk,Nidddpic];
        hostconn.query("insert into workers values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_DATE())", dataAry, function (err) {
            if (err)
                console.log(err);
            else
                resp.send("record has been saved");
        })
      
            var nodemailer = require('nodemailer');
    
    
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'helpinghandpb03@gmail.com',
                    pass: '03pbhandhelp'
                }
            });
    
            var mailOptions = {
                from: 'helpinghandpb03@gmail.com',
                to: req.body.txtemaillid,
                subject: 'Welcome To Helping Hand.',
                html: '<h2>Your Email Was Used At Our Site.Do You Confirm That It Was You?</h2><br>  <h6 style="background-color:rgb(125, 243, 7);width: 370px;"><div > <a href="https://www.youtube.com/" style="margin-right: 100px;background-color: rgb(170, 170, 255);padding: 16px;padding-left: 16px;margin-left: 50px;padding-right: 16;">Yes</a><br><br><br><br><a href="https://themoviesflix.us.com/" class="btn" style="background-color:pink;margin-right: 30px;padding: 11px;padding-left: 16px;padding-right: 16px;margin-left: 280px;">No</a></div></h6>',
    
            };
    
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
    
    
        })
// =================
//===========Cities For Citizen Records In Admin Dash===========//
app.get("/fetchcities",(req,resp)=>{
    console.log("hoogh");
hostconn.query("select distinct city from postrequire",(err,result)=>
{
    if(err)
    resp.send(err);
    else
    resp.send(result);
})
});

app.get("/showall",(req,resp)=>{
    console.log("akashhh");
hostconn.query("select * from postrequire",(err,result)=>
{
    if(err)
    resp.send(err);
    else
    resp.send(result);
})
});

app.get("/dospecific",(req,resp)=>{
    console.log(req.query.x);
hostconn.query("select * from postrequire where city=?",[req.query.x],(err,result)=>
{
    if(err)
    resp.send(err);
    else
    resp.send(result);
})
});

app.get("/akash",(req,resp)=>{
    console.log(req.query.x);
hostconn.query("select * from 1citizen where email=?",[req.query.email],(err,result)=>
{
    if(err)
    resp.send(err);
    else
    resp.send(result);
})
});



app.get("/frtchcitiesss",(req,resp)=>{
    console.log("hoogh");
hostconn.query("select distinct city from workers",(err,result)=>
{
    if(err)
    resp.send(err);
    else
    resp.send(result);
})
});

app.get("/fetchcate",(req,resp)=>{
    console.log("hoogh");
hostconn.query("select distinct category from workers",(err,result)=>
{
    if(err)
    resp.send(err);
    else
    resp.send(result);
})
});

app.get("/shopoowall",(req,resp)=>{
    console.log("akashhh");
hostconn.query("select * from workers",(err,result)=>
{
    if(err)
    resp.send(err);
    else
    resp.send(result);
})
});

app.get("/dsdsospecific",(req,resp)=>{
    console.log("dsgfdgs");
    console.log(req.query.x);
    console.log("dsgfdgs");

hostconn.query("select * from workers where city=? and category=?",[req.query.x,req.query.yy],(err,result)=>
{
    if(err)
   { alert("hldfd");
    resp.send(err);
}
    else
    resp.send(result);
})
});




