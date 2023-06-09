const express = require('express');
const pool = require('./db');
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors');
const jwtgenerator = require('./utils/jwtGenerator');
//middleware
app.use(cors());
app.use(express.json());

//ROUTES//


//register into db//
app.use("/auth", require("./routes/jwtAuth"));


//log in//
app.use("/home", require("./routes/home"));

app.use("/round", require("./routes/round"));

app.use("/user", require("./routes/user"));

app.use("/displayMonth", require("./routes/displayMonth"));

//update the db//


//delete from db//



app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

