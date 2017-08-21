const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');

const config=require('./config/database');

//database connection
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected',()=>{
    console.log('Connected to data base successfully'+config.database);
});

//on database error
mongoose.connection.on('error',(eror)=>{
    console.log('Database eror'+eror);t
});

const app =express();

const port=3000;


const users=require('./routes/users');
//cors middle ware
app.use(cors());

//body parser middleware
app.use(bodyParser.json());


//body parser middleware

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
// set static folder
app.use(express.static(path.join(__dirname,'public')));

app.use('/users',users);
//index Route
app.get('/',(req,res)=>{
    res.send('lij');
});

//start server
app.listen(port,()=>{
    console.log('server started on port '+port);
});