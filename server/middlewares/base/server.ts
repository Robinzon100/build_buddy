import morgan from "morgan";
import bodyParser from 'body-parser'
import express, { Application, Request, Response, NextFunction } from 'express'
import helmet from "helmet"
const compression = require('compression');


// TODO: remove body parse from npm

export const baseMiddlewares = (app: Application) => {
    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.json()) // for parsing application/json
    app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


    app.use(morgan('dev'))
    app.use(compression());
    app.use(helmet())

    app.use((req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Access-Control-Allow-Origin', `*`);
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        next();
    });
}



