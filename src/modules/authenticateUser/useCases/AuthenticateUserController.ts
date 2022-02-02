import { Request, Response } from 'express';
import { AuthenticateUserUserCase } from './AuthenticateUserUseCase';


export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateUserUserCase = new AuthenticateUserUserCase();

    const token = await authenticateUserUserCase.execute({
      username, 
      password
    });
      
      if (response.status(200).statusCode) {
          request.username = username;
      }      

    return response.json(token);
  }
}