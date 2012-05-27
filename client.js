var https = require("https");
var fs = require("fs");

// NOTE: default agent does not work with client authentication
var agent = new https.Agent({
    ca: fs.readFileSync("ssl/ca-cert.pem"),
    pfx: fs.readFileSync("ssl/client.pfx"),
//    cert: fs.readFileSync("ssl/client-cert.pem"),
//    key: fs.readFileSync("ssl/client-key.pem"),
    passphrase: "foobar",
});

var requestOptions = {
    host: "localhost",
    port: 1443,
    path: "/",
    agent: agent
};

var req = https.request(requestOptions, function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);

    res.on("data", function(d) {
	process.stdout.write(d);
    });
    res.on("end", function() {
	process.stdout.write("\n");
    });
});
req.end();

req.on("error", function(e) {
    console.log(e);
});
