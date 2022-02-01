import { Router } from 'express';
import { CreateContactController } from '../modules/contacts/useCases/createContact/CreateContactController';
// import { FindAllContactController } from '../modules/contacts/useCases/findAllContact/FindAllContactController';

const routes = Router();

// const findAllContactController = new FindAllContactController();
const createContactController = new CreateContactController();

routes.get('/', (request, response) => response.json({ 'msg': 'Teste' }));

// routes.get('/contact', findAllContactController.handle);
routes.post('/contacts', createContactController.handle);

export { routes };