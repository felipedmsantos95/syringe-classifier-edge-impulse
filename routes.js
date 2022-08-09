import express from 'express';
import ClassifierController from './controllers/classifier-controller.js'


const routes = express.Router();


routes.post('/start-sampling', ClassifierController.startSampling)


routes.post('/capture', ClassifierController.startVaccination)


export default routes;