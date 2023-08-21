import express from 'express';
import { createUser, deleteUser, getUserById, showAll, updateUser } from '../controllers/UserController.js'

const route = express.Router();

route.get('/user', showAll)
route.get('/user/:id', getUserById)
route.post('/user', createUser)
route.patch('/user/:id', updateUser)
route.delete('/user/:id', deleteUser)

export default route;