/*
* httpServer
* descr: creates basic server with Node + Express + BodyParser
* scope: only server
* author: dpaula
* https://github.com/debersonpaula
*/

// ===================================================
// === imports =======================================
import { TObject } from './tobjectlist';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as http from 'http';
// ===================================================
// === classes =======================================
class THttpServer extends TObject {
    // components
    protected app: express.Application;
    protected server: http.Server;
    public httpPort: number;

    // constructor
    constructor() {
        super();
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.server = http.createServer(this.app);
    }

    // add static route
    public AddStatic(path: string) {
        this.app.use(express.static(path));
    }

    // add route to specific file
    public AddRouteToFile(uri: string, filename: string) {
        this.app.get(uri, function(req, res){
            res.sendFile(filename);
        });
    }

    // add router handler
    public AddRouter(uri: string): express.IRoute {
        return this.app.route(uri);
    }

    // add router use direct to handler
    public AddUse(uri: string,  handler: any): void {
        this.app.use(uri, handler);
    }

    // add router use Router handler
    public AddUseRouter(uri: string): express.Router {
        const router: express.Router = express.Router();
        this.app.use(uri, router);
        return router;
    }

    // start server
    public Create(fn?: Function) {
        //DebugLog('TObj1/Create','35');
        

        let ListenPort = 3000;
        const self = this;
        if (!this.httpPort) {
            console.log('HTTP Port was not been assigned to options');
        }else {
            ListenPort = this.httpPort || ListenPort;
            // listen to the port
            this.server.listen(ListenPort, function(err: any) {
                if (err) {
                    console.log(`HTTP Server can't be active on port ${ListenPort}`);
                    throw err;
                }else {
                    console.log(`HTTP Server active on port ${ListenPort}`);
                    //self.super.Create(fn);
                    
                    
                }
            });
        }

    }
}
// ===================================================
// === exports =======================================
export { THttpServer };