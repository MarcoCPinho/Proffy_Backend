import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();

routes.post('/classes', classesControllers.create);
routes.get('/classes', classesControllers.index);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index)

export default routes;

/*
rotas:
http://localhost:3333/users
http://localhost:3333/contatos

recursos:
/users
/contatos

métodos mais utilizados:
GET: buscar ou listar uma informação
POST: criar alguma nova informação
PUT: atualizar uma informação existente
DELETE: deletar uma informação existente

parâmetros:
Corpo (Request body): Dados para criação ou atualização de um registro (request.body)
Route params: Identificar qual o recurso eu quero atualizar ou deletar (request.params)
Query params: Paginação, filtros, ordenação... (request.query)
*/