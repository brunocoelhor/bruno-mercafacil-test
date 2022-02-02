import { Request, Response } from 'express';
import { CreateContactUseCase } from './CreateContactUseCase';
import { formatCellphone } from '../../../../utils/formatCellphone';
import { formatName } from '../../../../utils/formatName';

export class CreateContactController {
  async handle(request: Request, response: Response) {
    const data = request.body.contacts;
    const {username} = request;

    Object.keys(data).forEach((k) => {
        if (data[k].name.trim().length === 0) {
            throw new Error('Name is required');
        }
    });
    
    const contacts = data.map((contact) => ({
        nome: formatName(contact.name,username),
        celular: formatCellphone(contact.cellphone, username)
    })); 

    const createContactUseCase = new CreateContactUseCase();

    const result = await createContactUseCase.execute({
        contacts
    }, username);

    return response.json({result});
  }
}