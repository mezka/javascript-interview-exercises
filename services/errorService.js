var errorService = {
    pipeError: function(githubError){
        res.status(githubError.statusCode).send(githubError);
    }
}

module.exports = errorService;