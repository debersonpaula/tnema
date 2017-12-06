const logger = require('./compiler/logger');

// define variables
var server;

// run server first
startServer();

function startServer(){

    /*---------------------------------------------*/
    server = require('./lib/main');
    server.HttpServer.httpPort = 3000;
    server.HttpServer.AddStatic(__dirname + '/public');
    server.MongoServer.mongoURI = 'mongodb://localhost/test';
    /*---------------------------------------------*/
    logger('=== CREATE APPLICATION ===\n', 'FgCyan');
    server.Create(function(){
        logger('=== CREATE DONE ===\n\n', 'FgGreen');

        /*---------------------------------------------*/
        setTimeout(() => {
            logger('=== DESTROY APPLICATION ===\n', 'FgCyan');
            server.Destroy(function(){
                logger('=== DESTROY DONE ===\n', 'FgGreen');
            });
        }, 3000);
    });
    
}