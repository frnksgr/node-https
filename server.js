var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('ssl/server-key.pem'),
    passphrase: "foobar",
    cert: fs.readFileSync('ssl/server-cert.pem'),
    // ca is required in order to check client certificates
    ca: fs.readFileSync('ssl/ca-cert.pem'),
    // request client to authenticate
    requestCert: true,
    // do not reject automatically
    rejectUnauthorized: true
};

https.createServer(options, function(req, res) {
    if (req.client.authorized) {
	res.writeHead(200, {"Content-Type": "application/json"});
	res.end('{"status":"approved"}');
    } else {
	res.writeHead(401, {"Content-Type": "application/json"});
	res.end('{"status":"denied"}');
    }
}).listen(1443, function() {
    console.log("server running on https://localhost:1443/");
});

