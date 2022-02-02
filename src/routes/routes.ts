import { Router } from 'express';
import { CreateUserController } from '../modules/users/useCases/CreateUserController';
import { CreateContactController } from '../modules/contacts/useCases/createContact/CreateContactController';
import { FindAllContactController } from '../modules/contacts/useCases/findAllContact/FindAllContactController';
import { AuthenticateUserController } from '../modules/authenticateUser/useCases/AuthenticateUserController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const routes = Router();

const findAllContactController = new FindAllContactController();
const createContactController = new CreateContactController();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

routes.get('/', (request, response) => response.json({ 'msg': 'Teste' }));

routes.get('/contacts', ensureAuthenticated, findAllContactController.handle);
routes.post('/contacts', ensureAuthenticated, createContactController.handle);

routes.post('/users', createUserController.handle);
routes.post('/login', authenticateUserController.handle);

export { routes };