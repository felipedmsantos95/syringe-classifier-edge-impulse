import express from 'express';
import { createNewVaccinationData, confirmVaccineStatus  } from './interactive-menu.js';
import { EdgeCameraClassifier } from './camera-classifier.js';


const routes = express.Router();


//Initializing Classifier
const edgeCamera = new EdgeCameraClassifier();
await edgeCamera.runClassifier();

routes.post('/capture', async (request, response) => {
    
    
   // const vacinnationData = await createNewVaccinationData();


    response.status(200).send(edgeCamera.syringeStatus)

	
})


export default routes;