import { Request, Response } from 'express';
import { FindAllContactUseCase } from './FindAllContactUseCase';

export class FindAllContactController {
    async handle(request: Request, response: Response) {
        const client = 'varejao';

        const findAllContactUseCase = new FindAllContactUseCase();

        const contacts = await findAllContactUseCase.execute(client);

        return response.json(contacts);
    }
}