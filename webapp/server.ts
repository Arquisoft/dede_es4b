import express,{Application} from 'express'; 
import https from "https";
import path from 'path';

//for using an import here we need to configure the tsconfig.json
//setting the option module to commonjs
require('dotenv').config();

var app: Application = express()

let credentials = {key: process.env.HTTPS_PRIVATEKEY, cert: process.env.HTTPS_CERTIFICATE};

let httpsServer = https.createServer(credentials, app);

httpsServer.listen(3000, function() {
    console.log("Servidor HTTPS escuchando en puerto 4000")
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});