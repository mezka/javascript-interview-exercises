var request = require('request-promise');

var githubService = {
    
    getUser: function(username) {
      return request({
        "method":"GET", 
        "uri": "https://api.github.com/users/" + username,
        "json": true,
        "headers": {
          // "Authorization": "Bearer " + githubService.token,
          "User-Agent": "getLoggedUser"
        }
      });
    },

    getUserRepos:function(uri){
      
      return request({
        "method": "GET",
        "uri": uri,
        "json": true,
        "resolveWithFullResponse": true,
        "headers": {
          // "Authorization": "Bearer " + githubService.token,
          "User-Agent": "getUserRepos"
        }

      })
    },

    getUserReposUrl: function(user){
      return user.repos_url;
    }
}



module.exports = githubService;
