/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { CreateContactUseCase } from '../../modules/contacts/useCases/createContact/CreateContactUseCase';

 describe('Create user', () => {
 
     let createContactUseCase: CreateContactUseCase;
 
     beforeAll(() => {
         createContactUseCase = new CreateContactUseCase();
     });
    
     it('It should allow creating a new contact', async () => {
 
        const contactData = {
            contacts: [
              { nome: 'MARINA RODRIGUES', celular: '5541996941919' },
              { nome: 'NICOLAS RODRIGUES', celular: '5541954122723' }
            ]
        };
 
         const contact = await createContactUseCase.execute(contactData, 'varejao');
 
         expect(contact).toHaveProperty('count');
         expect(contact).toEqual({ 'count': contactData.contacts.length });
     });     
 });