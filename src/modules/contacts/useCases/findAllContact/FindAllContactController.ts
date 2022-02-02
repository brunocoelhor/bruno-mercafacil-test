import { Request, Response } from 'express';
import { FindAllContactUseCase } from './FindAllContactUseCase';

export class FindAllContactController {
    async handle(request: Request, response: Response) {
        const {username} = request;

        const findAllContactUseCase = new FindAllContactUseCase();

        const contacts = await findAllContactUseCase.execute(username);

        return response.json(contacts);
    }
}