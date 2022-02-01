import { Request, Response } from 'express';
import { CreateContactUseCase } from './CreateContactUseCase';
import { formatCellphone } from '../../../../utils/formatCellphone';
import { formatName } from '../../../../utils/formatName';

export class CreateContactController {
  async handle(request: Request, response: Response) {
    const data = request.body.contacts; 
    const client = 'varejao';
    // const client = 'macapa';    
    
    const contacts = data.map((contact) => ({
        nome: formatName(contact.name,client),
        celular: formatCellphone(contact.cellphone, client)
    })); 

    const createContactUseCase = new CreateContactUseCase();

    const result = await createContactUseCase.execute({
      contacts
    }, client);

    return response.json({result});
  }
}