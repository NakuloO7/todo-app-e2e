import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/jwt";

export interface AuthRequest extends Request{
    userId? : string;
}


export const authMiddleware = async(req : AuthRequest , res: Response, next : NextFunction) =>{
    const token = req.cookies?.token;
    if(!token){
        return res.status(401).json({message : "Unauthorized"});
    }

    try {
        const payload = verifyJWT(token);
        req.userId = payload.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            message : "Invalid Token!"
        })
    }
}