// mongodb+srv://project_web:puvi1995@S@cluster0-65yon.mongodb.net/test?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose=require('mongoose')


// const loginRoute=require('./routes/login.js')
// const signupRoute=require('./routes/signup.js')
const userRoutes=require('./routes/user.js')
const listeRoutes = require("./routes/lists.js");
const taskRoutes = require("./routes/tasks");
const stepsRoutes = require("./routes/steps");


const app = express()

mongoose.connect('mongodb+srv://project_web:S8OOElAJtq7kQh6J@cluster0-65yon.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true })
    .then(()=>{
        console.log('mongoose is connected ##')
    })
    .catch((err)=>{
        console.log('mongoose connection erreur')
        console.error(err)
    })

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())


app.use((req, res, next) => {//CORS erreur
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use((req, res, next) => {
    
    console.log('request received')
    console.log(req.headers)
    next()
})



app.use((req, res,next) => {
    console.log('response sent suucessfully')
    next()
})






// app.use("/login",loginRoute);
// app.use("/signup",signupRoute);
app.use("/user",userRoutes);

app.use("/lists", listeRoutes);
app.use("/tasks", taskRoutes);
app.use("/steps", stepsRoutes);



module.exports = app


