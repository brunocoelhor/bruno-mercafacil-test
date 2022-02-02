import { prismaPg, prismaMysql } from '../../../../database/prismaClient';

export class FindAllContactUseCase {
    async execute(client) {
        let contacts;

        if (client === 'macapa') {
            contacts = await prismaMysql.contacts.findMany();    
      
            return contacts;
        } 

        contacts = await prismaPg.contacts.findMany();

        return contacts;
    }
}