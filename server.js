var express = require('express');
var multer  = require('multer');
var fs = require('fs');

var app = express();

var upload = multer({ dest: 'uploads/' });
var port = process.env.PORT || 8080;

app.post('/get-file-info', upload.single('datafile'), function (req, res, next) {
  var fl = req.file;
  
  return res.send({ "name": fl.originalname, "size": fl.size});
});

app.get('/', function (req, res) {
    fs.readFile('input-form.html', function (err, data) {
        if(err !== null) console.log("ERROR Uploading");
        
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });    
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});