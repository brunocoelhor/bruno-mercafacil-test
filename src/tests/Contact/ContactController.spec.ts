/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest';
import { app } from '../../app';
 
describe('Create Contact Controller', () => {
 
    it('Should be able to create a new contact', async () => {
        const contactData = {
            contacts: [
                {
					'name': 'Marina Rodrigues',
					'cellphone': '(55) 41 99694-1919'
			    },
			    {
					'name': 'Nicolas Rodrigues',
					'cellphone': '5541954122723'
			    }
            ]
        };

         const response = await request(app)
             .post('/contacts')
             .send(contactData);       
        
             expect(response.status).toBe(200);
        expect(response.body).toEqual({ result: { 'count': contactData.contacts.length } });
         
     });
});