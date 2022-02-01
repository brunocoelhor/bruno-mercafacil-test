import { prismaPg, prismaMysql } from '../../../../database/prismaClient';

export class CreateContactUseCase {
  async execute(contacts, client) {
    let contact; 

    if (client === 'macapa') {
      contact = await prismaMysql.contacts.createMany({
        data: contacts.contacts,
        skipDuplicates: true
      });

      return contact;
    } 
    
    contact = await prismaPg.contacts.createMany({
      data: contacts.contacts,
      skipDuplicates: true
    });
    
    return contact;
  }
}