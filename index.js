const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./Server/models/users');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.use('/api/users', users);

// connection to mongoose
const db = 'mongodb://localhost:27017/userlist';
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(console.log('MongoDB connected'))
  .catch(err => console.log(err)); //return code 500 can come

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  const host = server.address().address;
  // const port = server.address().port;
  console.log(`server runs on host ${host}, port ${PORT}`);
});