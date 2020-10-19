import { baseMiddlewares } from './middlewares/base/server';
import express, {Application, Request, Response, NextFunction} from 'express';


const app = express();

app.use(baseMiddlewares)

const PORT = process.env.PORT || 5000


app.listen(PORT, () =>{
    console.info(`http://listening:${PORT} on port`)
})