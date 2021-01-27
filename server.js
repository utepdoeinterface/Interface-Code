const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const methodOverride  = require('method-override');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

/** Seting up server to accept cross-origin browser requests */
app.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(function (err, req, res, next) {
  console.log('This is the invalid field ->', err.field)
  next(err)
})

const imageRouter = require('./routes/file');
const usersRouter = require('./routes/users');
const videoRouter = require('./routes/videos')

app.use('/images', imageRouter);
app.use('/users', usersRouter);
app.use('/videos', videoRouter)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});