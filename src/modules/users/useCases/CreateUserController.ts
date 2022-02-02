import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {

  async handle(request: Request, response: Response) {
      const { name, username, password } = request.body;
      
        if (!name.trim() || !username.trim() || !password.trim()) {
            throw new Error('All fields are required');
        }

        const createUserUseCase = new CreateUserUseCase();

        const user = await createUserUseCase.execute({
            name,
            username,
            password,
        });

        return response.json(user);
    }
}