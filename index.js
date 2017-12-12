var express = require('express');
var bodyParser = require('body-parser');

var app = module.exports = express();
var port = 59876;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


var githubService = require('./services/githubService.js');
var errorService = require('./services/errorService.js');


app.get('/api/github/:user', function(req, res){

    //ejemplo de juntar varias calls API con promises y manejar los errores que pueden ocurrir en varias partes de la cadena de calls

    githubService.getUser(req.params.username)
    .then(githubService.getUserReposUrl)
    .catch(errorService.pipeError)
    .then(githubService.getUserRepos)
    .catch(errorService.pipeError)
    .then(function(userRepos){
        res.status(200).send(userRepos);
    }).catch(errorService.pipeError)
});

app.listen(port, function() {
    console.log('Listening on port: ', port, '\n');
});