/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest';
import { app } from '../../app';
 
describe('Deve permitir criar e listar os contatos', () => {

    let token;

    beforeAll(async () => {
        
        await request(app)
        .post('/users')
        .send({ 'name': 'Varejão', 'username': 'varejao', 'password': '123456' });
      
        token = await request(app)
            .post('/login')
            .send({'username':'varejao','password': '123456'
            });    
    
  });
 
    it('Deve ser possível criar um contato', async () => {
        const contactData = {
            contacts: [
                {
                    'name': 'Srta. Isabelly Castro',
                    'cellphone': '5541959365078'
                },
                {
                    'name': 'Ana Julia da Rocha',
                    'cellphone': '5541923038062'
                }
            ]
        };    

         const response = await request(app)
            .post('/contacts')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send(contactData);       
        
             expect(response.status).toBe(200);
        expect(response.body).toEqual({ result: { 'count': contactData.contacts.length } });
         
    });
    
    it('Não é possível criar contato com nome vazio', async () => {
        const contactData = {
            contacts: [
                {
                    'name': '',
                    'cellphone': '5541959365078'
                },
                {
                    'name': 'Ana Julia da Rocha',
                    'cellphone': '5541923038062'
                }
            ]
        };    

         const response = await request(app)
            .post('/contacts')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send(contactData);       
        
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('Name is required');
 
    });

    it('Não deve permitir criar contato sem o token de autorização', async () => {
        const contactData = {
            contacts: [
                {
                    'name': 'Srta. Isabelly Castro',
                    'cellphone': '5541959365078'
                },
                {
                    'name': 'Ana Julia da Rocha',
                    'cellphone': '5541923038062'
                }
            ]
        };    

         const response = await request(app)
            .post('/contacts')
            .send(contactData);       
        
        expect(response.status).toBe(401);
        expect(response.body.message).toEqual('Token is missing');
 
    });
    
    it('Deve ser possível listar os contatos', async () => {
        
        const response = await request(app)
            .get('/contacts')
            .set('Authorization', `Bearer ${token.body.token}`);       
        
        expect(response.status).toBe(200);
        
    });

    it('Não deve permitir listar os contatos sem o token', async () => {
        
        const response = await request(app)
            .get('/contacts');       
        
        expect(response.status).toBe(401);
        expect(response.body.message).toEqual('Token is missing');
        
    });
});



describe('Deve permitir logar no sistema', () => {

    beforeAll(async () => {
        
        await request(app)
        .post('/users')
        .send({ 'name': 'Varejão', 'username': 'varejao', 'password': '123456' });   
    
    });

    it('Deve ser possível logar no sistema e pegar um token', async () => {
        const usuario = {
            'username':'varejao',
            'password': '123456'
        };    

         const response = await request(app)
            .post('/login')
            .send(usuario);       
        
             expect(response.status).toBe(200);
    });

    it('Não deve ser possível logar com um usuário inexistente', async () => {
        const usuario = {
            'username':'naoexite',
            'password': '123456'
        };    

         const response = await request(app)
            .post('/login')
            .send(usuario);       
        
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('User or password incorrect!');
         
    });

    it('Não deve ser possível logar com a senha incorreta', async () => {
        const usuario = {
            'username':'varejao',
            'password': 'senhaerrada'
        };    

         const response = await request(app)
            .post('/login')
            .send(usuario); 

        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('User or password incorrect!');
         
    });

 });