


const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
// make a new express app
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine',hbs); //setting various express related configurations
//we pass it key-value pair where the key is the thing you want to set
//value is the value you want to use
//telling express which view engine we want to use.

app.use(express.static(__dirname + '/public')); //express static
//setting up all of our http route handlers.

app.use((req,res,next) =>{
  //next exists so you can tell express when your middleware function
  //is done
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) =>{
    if(err){
      console.log('Unable to append to server.log.');
    }
  }); //we want to move on to the next line after
  //every single request gets logged
  next();
});

//app.use((req,res,next) =>{
//  res.render('maintenance.hbs');
//});
hbs.registerHelper('getCurrentYear',() =>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});
app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about',(req,res) =>{
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  })
})
//the app not listening yet
app.listen(3000,() =>{
  console.log('Server is up on port 3000');
});
