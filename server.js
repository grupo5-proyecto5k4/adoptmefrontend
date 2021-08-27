const express = require('express');
const app = express();
const path = require('path');
const cloudinary = require('cloudinary');

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist/adoptmefrontend'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);
// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function() {
    return function (req, res, next) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(
         ['https://', req.get('Host'), req.url].join('')
        );
      }
      next();
    }
  }
  
  // Instruct the app
  // to use the forceSSL
  // middleware
  app.use(forceSSL());
  // For all GET requests, send back index.html
  // so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/adoptmefrontend/index.html'));
  });
  
cloudinary.config({
  cloud_name:'dsfz7jmoi',
  api_key: '281974651216952',
  api_secret: 'RKGzfGl_WhyjnoOevR6MZTLl-mc'
});



  