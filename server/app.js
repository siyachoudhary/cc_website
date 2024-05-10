const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const dbConnect = require("./db/dbConnect");

const User = require("./db/userModel");

const auth = require("./auth");

dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// body parser configuration
app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "CONANT CONNECT PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Conant Connect</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Conant Connect Team</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Conant Connect</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}

function sendUpdate({ recipient_email}) {
  console.log(recipient_email)
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "CONANT CONNECT MENTOR UPDATE",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>Conant Connect Mentor Update</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Conant Connect</a>
    </div>
    <p style="font-size:1.1em">Hello,</p>
    <p>There has been an update in your mentors. Check your profile to view this update.</p>
    <a href="http://localhost:3001/conantconnect/home" target="_blank">OPEN YOUR PROFILE</a>
    <p style="font-size:0.9em;">Regards,<br />Conant Connect Team</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Conant Connect</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}


function sendRequest({ recipient_email}) {
  console.log(recipient_email)
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "CONANT CONNECT MENTOR REQUEST UPDATE",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>Conant Connect Mentor Update</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Conant Connect</a>
    </div>
    <p style="font-size:1.1em">Hello,</p>
    <p>There has been an update in your student requests. Check your profile to view this update.</p>
    <a href="http://localhost:3001/home" target="_blank">OPEN YOUR PROFILE</a>
    <p style="font-size:0.9em;">Regards,<br />Conant Connect Team</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Conant Connect</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}

app.post("/send_recovery_email", (req, res) => {
  User.findOne({ email: req.body.recipient_email })
  .then((user)=>{
    if(user==null){
      res.status(500).send({
        message: error.message
      });
    }else{
      sendEmail(req.body)
      .then((response) => res.send(response.message))
      .catch((error) => res.status(500).send(error.message));
    }
  })
  .catch((error)=>{
    res.status(500).send({
      message: error.message
    });
  })
  
});

// reset password endpoint
app.post("/resetPassword", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      User.updateOne({ email: request.body.email }, { "$set":{"password": hashedPassword}})
        // return success if the new user is added to the database successfully
        
        .then((user) => {

          User.findOne({ email: request.body.email }) 
          .then((user) => {
            if(user.user_type=="student"){
              response.status(201).send({
                email: user.email,
                first: user.first,
                last: user.last,
                user_type: user.user_type,
                _id: user._id,
                grade:user.grade
              });
            }else{
              response.status(201).send({
                email: user.email,
                first: user.first,
                last: user.last,
                user_type: user.user_type,
                _id: user._id
              });
            }
        })
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: error.message
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// register endpoint
app.post("/registerstudent", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        email: request.body.email,
        first: request.body.first,
        last: request.body.last,
        password: hashedPassword,
        grade: request.body.grade,
        user_type: request.body.type,
        complete: request.body.complete,
        bio: "",
        interest: []
      });

      // save the new user
      user.save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            email: request.body.email,
            first: request.body.first,
            last: request.body.last,
            user_type: request.body.type,
            _id: result._id,
            grade: result.grade,
            bio: result.bio,
            complete: request.body.complete,
            interest: result.interest,
            pending: user.pending,
            accepted: user.accepted
            
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: error.message
          });
        });
});

})


// register endpoint
app.post("/registermentor", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        email: request.body.email,
        first: request.body.first,
        last: request.body.last,
        password: hashedPassword,
        user_type: request.body.type,
        complete: request.body.complete,
        college: "",
        major: "",
        bio: "",
        pending: user.pending,
        accepted: user.accepted,
        interest: []
      });

      // save the new user
      user.save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            email: request.body.email,
            first: request.body.first,
            last: request.body.last,
            user_type: request.body.type,
            _id: result._id,
            complete: request.body.complete,
            college: result.college,
            major: result.major,
            bio: result.bio,
            pending: user.pending,
            accepted: user.accepted,
            interest: result.interest
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: error.message
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// login endpoint
app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })
    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)
        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if(!passwordCheck) {
            return response.status(400).send({
              message: "Password does not match",
              error,
            });
          }
          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          if(user.user_type=="mentor"){
            //   return success response for mentor
            response.status(200).send({
              email: user.email,
              first: user.first,
              last: user.last,
              _id: user._id,
              user_type: user.user_type,
              complete: user.complete,
              college: user.college,
              major: user.major,
              bio: user.bio,
              interest: user.interest,
              pending: user.pending,
              accepted: user.accepted,
              token,
            });
          }else{
            //   return success response for student
            response.status(200).send({
              email: user.email,
              first: user.first,
              last: user.last,
              _id: user._id,
              grade: user.grade,
              user_type: user.user_type,
              complete: user.complete,
              interest: user.interest,
              pending: user.pending,
              accepted: user.accepted,
              token,
            });
          }
          
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});


// edit mentor endpoint
app.post("/editmentor", (request, response) => {
      // create a new user instance and collect the data
    User.updateOne({ email: request.body.email }, { "$set":{"first": request.body.first, "last":request.body.last, "college":request.body.college, "major":request.body.major, "bio":request.body.bio, "complete":request.body.complete, "interest": request.body.interest}}, {runValidators:true,new:true}) 
    .then((result) => {
    User.findOne({ email: request.body.email })
      .then((user) =>{
        // return success if the new user is edited to the database successfully
          response.status(201).send({
            email: request.body.email,
            first: request.body.first,
            last: request.body.last,
            user_type: user.user_type,
            _id: user._id,
            complete: request.body.complete,
            college: request.body.college,
            major: request.body.major,
            bio: request.body.bio,
            interest: request.body.interest,
            pending: user.pending,
            accepted: user.accepted
          });
        })
      })
        // catch error if the new user wasn't edited successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: error.message
          });
        });
});

// edit student endpoint
app.post("/editstudent", (request, response) => {
  // create a new user instance and collect the data
  User.updateOne({ email: request.body.email }, { "$set":{"first": request.body.first, "last":request.body.last, "grade":request.body.grade, "bio":request.body.bio, "complete":request.body.complete, "interest": request.body.interest}}, {runValidators:true,new:true}) 

    // return success if the new user is edited to the database successfully
    .then((result) => {

      User.findOne({ email: request.body.email })
      .then((user) =>{
        console.log(user)
        response.status(201).send({
          email: request.body.email,
          first: request.body.first,
          last: request.body.last,
          user_type: user.user_type,
          _id: user._id,
          complete: request.body.complete,
          grade: request.body.grade,
          bio: request.body.bio,
          interest: request.body.interest,
          pending: user.pending,
          accepted: user.accepted
        });
      })
      
    })
    // catch error if the new user wasn't added edited to the database
    .catch((error) => {
      response.status(500).send({
        message: error.message
      });
    });
});

// delete endpoint
app.post("/deleteUser", (request, response) => {
  // check if email exists
  User.deleteOne({ email: request.body.email }) 
    .then(() => {
      User.updateMany({pending:request.body._id},{$pull:{pending:request.body._id}})

    .then(() => {
      User.updateMany({accepted:request.body._id},{$pull:{accepted:request.body._id}})

    .then(() => {
      
      response.status(200).send({
        message: "user deleted successfully",
      });
    })
    .catch((e) => {
      console.log(e)
      response.status(404).send({
        message: "Could not delete user",
        e,
      });
    });
    })
    .catch((e) => {
      console.log(e)
      response.status(404).send({
        message: "Could not delete user",
        e,
      });
    });
    })
    .catch((e) => {
      console.log(e)
      response.status(404).send({
        message: "Could not delete user",
        e,
      });
    });
});

app.post("/findmentors", (request, response) => {
  console.log(request.body.interest.length )
  if(request.body.interest.length == 0){
    User.find({ user_type: "mentor"}) 
    .then((users) => {
      // console.log(users)
      response.status(200).send({
        users
      });
    })
    .catch((e) => {
      console.log(e)
      response.status(404).send({
        message: "user not found, proceed",
        e,
      });
    });
  }else{
    User.find({
      interest: { $in: request.body.interest },
      user_type: "mentor"
    }).then((users)=>{
      response.status(200).send({
        users
      });
    })
    .catch((e) => {
      console.log(e)
      response.status(404).send({
        message: "user not found, proceed",
        e,
      });
    });
  }
  
});

app.get("/findonementor/:_id", (request, response) => { 
  console.log(request.params)
  User.findOne({ _id: request.params._id}) 
    .then((user) => {
      // console.log(user)
      response.status(200).send({
        user
      });
    })
    .catch((e) => {
      console.log(e)
      response.status(404).send({
        message: "user not found, proceed",
        e,
      });
    });
});

app.get("/findStats", (request, response) => {
  var totalStudents = 0
  var totalMentors = 0
  User.find({ user_type: "mentor"}) 
    .then((users) => {
      totalMentors=users.length
      User.find({ user_type: "student"}) 
      .then((users) => {
        totalStudents=users.length
        response.status(200).send({
          totalStudents,
          totalMentors
        });
      })
      .catch((e) => {
        console.log(e)
        response.status(404).send({
          message: "user not found, proceed",
          e,
        });
      });
    })
    .catch((e) => {
      console.log(e)
      response.status(404).send({
        message: "user not found, proceed",
        e,
      });
    });
});

// send request
app.post("/sendRequest", (request, response) => {
  // check if email exists
  User.updateOne({ _id: request.body.params.mentorId}, { "$push":{pending: request.body.params.myId}}) 
    .then(() => {
      User.updateOne({ _id: request.body.params.myId }, { "$push":{pending: request.body.params.mentorId}}) 
    .then(() => {
      User.findOne({ _id: request.body.params.myId}) 
    .then((user) => {
      // console.log(user)
      sendRequest({recipient_email: request.body.params.mentorEmail})
      response.status(200).send({
        user
      });
    })
    .catch((e) => {
      console.log(e)
      response.status(404).send({
        message: "user not found, proceed",
        e,
      });
    });
    })
    .catch((e) => {
      console.log(e)
      response.status(404).send({
        message: "Could not update user",
        e,
      });
    });
    })
    .catch((e) => {
      console.log(e)
      response.status(404).send({
        message: "Could not update user",
        e,
      });
    });
});


// send request
app.post("/acceptRequest", (request, response) => {
  // check if email exists
  User.updateOne({ _id: request.body.params.mentorId}, {"$push":{accepted: request.body.params.studentId},  "$pull":{pending: request.body.params.studentId}}) 
    .then(() => {
      User.updateOne({ _id: request.body.params.studentId }, { "$push":{accepted: request.body.params.mentorId}, "$pull":{pending: request.body.params.mentorId}}) 
    .then(() => {
      User.findOne({ _id: request.body.params.mentorId}) 
    .then((user) => {
      sendUpdate({recipient_email: request.body.params.studentEmail})
      console.log(request.body.params.studentEmail)
      response.status(200).send({
        user
      });
    })
    .catch((e) => {
      console.log(e)
      response.status(404).send({
        message: "user not found, proceed",
        e,
      });
    });
    })
    .catch((e) => {
      console.log(e)
      response.status(404).send({
        message: "Could not update user",
        e,
      });
    });
    })
    .catch((e) => {
      console.log(e)
      response.status(404).send({
        message: "Could not update user",
        e,
      });
    });
});


// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});


module.exports = app;
