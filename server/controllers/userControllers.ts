import {Request, Response} from 'express';



export const login = async (_req: Request, _res: Response) =>{
//TODO: implement login
console.log("inside login", _req.body);
_res.send("inside login");
}

export const register = async (_req: Request, _res: Response) =>{
//TODO: implement register
console.log("inside register", _req.body);
_res.send("inside register");
}

