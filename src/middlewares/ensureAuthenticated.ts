import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { parseJWT } from '../utils/parseJWT';

export function ensureAuthenticated(request:Request, response:Response, next:NextFunction){
    const authToken = request.headers.authorization;
    const { SECRET_KEY_MACAPA, SECRET_KEY_VAREJA0 } = process.env;
    let secretKey: string;

    if(!authToken) {
        return response.status(401).json({
            message: 'Token is missing'
        });
    }

    const [, token] = authToken.split(' '); 
    
    if(!token) {
        return response.status(401).json({
            message: 'Token is missing'
        });
    }
    
    const username = parseJWT(token);

    if (username === 'varejao') {
        secretKey = SECRET_KEY_VAREJA0;
    } else if(username === 'macapa') {
        secretKey = SECRET_KEY_MACAPA;
    }

    try {
        verify(token, secretKey);

        request.username = username;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: 'Token invalid'
    });
  }

  

}