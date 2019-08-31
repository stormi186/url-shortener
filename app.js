const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const shortUrl = require('./models/shortUrl');
var dotenv = require('dotenv');
dotenv.config();
var url = process.env.MONGODB_URI;

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(url, { useNewUrlParser: true });

app.use(express.static(__dirname + '/public'));

app.get('/new/:urlToShorten(*)', (req, res, next) => {
  var { urlToShorten } = req.params;
  var regex =/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

if(regex.test(urlToShorten) === true) {
  var short = Math.floor(Math.random()*100000).toString();
  var data = new shortUrl({
    originalUrl: urlToShorten,
    shorterUrl: short
  });

  data.save(err=> {
    if(err) {
      return res.send('Error saving to database');
    }
  });

  return res.json({original_url: data.originalUrl, "short_url": data.shorterUrl});
}
  
  return res.json({"error": "invalid URL"});
});

app.get('/:urlToForward', (req, res, next) => {
  var shorterUrl = req.params.urlToForward;

  shortUrl.findOne({'shorterUrl': shorterUrl}, (err, data) => {
    if (err) return res.send('Error reading database');
    else {
      if(data) {
        var httpRegex = new RegExp("^(http|https)://", "i");
        var urlToCheck = data.originalUrl;
        if (httpRegex.test(urlToCheck)) {
          res.redirect(301, urlToCheck);
        }
        else {
          res.redirect(301, 'https://' + urlToCheck);
        }
      }
      else {
        return res.json({"error": "No url found for given input"});
      }
    }
  });

});

app.listen(process.env.PORT || 3000);