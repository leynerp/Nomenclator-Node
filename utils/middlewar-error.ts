import {ErrorHandler} from "./ErrorHandler";
import { Request, Response, NextFunction } from 'express';
function dispachError(err: TypeError | ErrorHandler,
                      _req: Request,
                      res: Response,
                      _next: NextFunction){
    let customError = err;

    if (!(err instanceof ErrorHandler)) {
        customError = new ErrorHandler(
            'Ha ocurrido un error!!!!'
        );
    }
    res.status((customError as ErrorHandler).status).send(JSON.stringify(customError));
}
export default dispachError