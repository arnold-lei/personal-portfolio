//App depencencies -----------------------------------------/
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var app = express();
require('dotenv').config({
    silent: true
});


//App middleware -------------------------------------------/
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));

//Handlebars config ---------------------------------------/
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Route config -------------------------------------------/
// var htmlRoutes = require('./controllers/routes/htmlRoutes')(app);
// var apiRoutes = require('./controllers/routes/apiRoutes')(app);

app.get('/', function(req, res){
    res.render('landing');
})

app.post("/contact", function(req, res){
    console.log("name: ", req.body.name)
    console.log("email: ", req.body.email)
    console.log( "message: ", req.body.message)
    var name = req.body.name
    var email = req.body.email
    var form_subject = req.body.subject
    var msg = req.body.msg
    var helper = require('sendgrid').mail

    from_email = new helper.Email("test@example.com")
    to_email = new helper.Email(email)
    subject = form_subject
    content = new helper.Content(msg)
    mail = new helper.Mail(from_email, subject, to_email, content)

    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });

    sg.API(request, function(error, response) {
      console.log(response.statusCode)
      console.log(response.body)
      console.log(response.headers)
    })
    res.render('landing');
})

//Database config ---------------------------------------/
// global.db = require('./models');

//Port config ---------------------------------------------------/
var PORT = process.env.PORT || 3000;

//Starting the server, syncing our models ------------------------------------/
  app.listen(PORT, function(err) {
    if (err) {
      console.error(err);
    } else {
      console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    }
  });
