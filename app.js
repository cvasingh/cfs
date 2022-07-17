var createError = require('http-errors');
var express = require('express');
const bodyparser = require('body-parser');
var path = require('path');
var cors = require('cors');
const PORT = process.env.PORT || 3000
var app = express();

var usersRouter = require('./routes/users');
var resRouter = require('./routes/response');
var deviceRouter = require('./routes/device');


app.use(cors());
app.use(express.json());

//Middleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use(express.static(path.join(__dirname, 'build')));
//different-different router
app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/build/index.html");
})


app.use('/users',usersRouter);
app.use('/response',resRouter);
app.use('/device',deviceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.sendFile(__dirname+"/build/index.html")
  // next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
    console.log(`App running on ${PORT}`)
})