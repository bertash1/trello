import ApiError from '../exceptions/api-error';

import {Request, Response} from "express";
import {IHttpException} from "../types/types"

const errorMiddleware = (err:IHttpException, req:Request, res:Response) => {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: 'Unexpected error'})
};

export default errorMiddleware;