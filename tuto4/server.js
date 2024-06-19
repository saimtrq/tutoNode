var http = require("http");
var fs = require("fs");
var mime = require('mime-types');
var serviceMail = require(__dirname + "/get-mail.js");
var bodyParser = require("body-parser")
var express = require("express");

//middleware
var logger = require("morgan");
var serveStatic = require("serve-static");
var favicon = require("serve-favicon");


var PORT = 80;

serviceMail.genererMails();

var app = express();

app.use(favicon(__dirname + "/app/favicon.ico"));
app.use(logger(":method :url"));
app.use(serveStatic(__dirname + "/app"));



//API

var api = express();

//RECUPERER LA LISTE DES DOSSIER
api.get("/dossiers",serviceMail.getDossiers);



//RECUPERER UN DOSSIER
api.get("/dossiers/:idDossier",serviceMail.getDossier);



//RECUPERER UN MAIL
api.get("/dossiers/:idDossier/:idMail", serviceMail.getMail);

app.use(bodyParser.json());

//ENVOYER UN MAIL
//POST /api/envoi
api.post("/api/envoi",serviceMail.envoieMail);

app.use("/api" , api);

http.createServer(app).listen(PORT);
console.log("Serveur démarré sur le port" + PORT)