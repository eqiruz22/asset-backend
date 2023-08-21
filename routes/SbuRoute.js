import express from 'express'
import { createSbu, destroySbu, getAllSbu, getSbuById, updateSbu } from '../controllers/SbuController.js'

const route = express.Router()

route.get('/sbu', getAllSbu)
route.get('/sbu/:id', getSbuById)
route.post('/sbu', createSbu)
route.patch('/sbu/:id', updateSbu)
route.delete('/sbu/:id', destroySbu)

export default route