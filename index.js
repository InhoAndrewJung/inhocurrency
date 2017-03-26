var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fx = require("money");
var fixer = require('node-fixer-io');
var app = express();


app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({extend:false}));


app.get('/endq', function (req,res){
  var amount = req.query.amount;
  var firstc = req.query.firstc;
  var secondc = req.query.secondc;
  res.send(amount +firstc +secondc);

});

app.post('/result', function (req,res){
   amount = req.body.amount;
   firstc = req.body.firstc;
   secondc = req.body.secondc;
   newAmount = 'init';


   fixer.get(function (err, res, body) {
    console.log(err?err:body);
    console.log(fixer.allowedRates());

         var rates = fixer.allowedRates();
            fromCurrency = firstc;
            toCurrency = secondc;
            oldAmount = amount;
            fresult = fixer.convert(fromCurrency, toCurrency, oldAmount);
            var ads =   '<div name="rlt" id="convert" class="ui red massive message" style="text-align: center">'+fresult+'</div>';
            $('#convert').html(ads);
        console.log(fromCurrency, "->", toCurrency, ":", oldAmount, "->", fresult);

});
// ss = fresult;
//res.send(ss);
//.setHeader('Content-Type', 'text/plain');




  //res.render('my_first_result');
});

app.get('/', function (req,res){
  res.render('my_first_ejs');
});
app.listen(3000, function(){
  console.log('Server On!');
});
