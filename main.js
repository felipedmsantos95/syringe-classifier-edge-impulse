import express from 'express';
import axios from 'axios';
import { sendDataToTangle } from './tangle-devnet.js'
import { createNewVaccinationData, confirmVaccineStatus, freezeScreenForCapture } from './interactive-menu.js';
import { EdgeCameraClassifier } from './camera-classifier.js';


const routes = express.Router();
//Initializing Classifier
const edgeCamera = new EdgeCameraClassifier();
await edgeCamera.runClassifier();


const projectId = process.env.EDGE_IMPULSE_PROJECT_ID;
const deviceId = process.env.DEVICE_ID;
const edgeImpulseKey = process.env.EDGE_IMPULSE_API_KEY;

async function startSampling(expected) {

    let url = `https://studio.edgeimpulse.com/v1/api/${projectId}/device/${deviceId}/start-sampling`;

    let headers = { 
            headers: {
            'content-type': 'application/json',
            'x-api-key': edgeImpulseKey
            }
    };
    
    
    let payload = {
        label: expected,
        lengthMs: 0,
        category: 'training',
        intervalMs: 0,
        sensor: 'Camera'
    };
    
    try {
        const edgeImpulseResponse = await axios.post(url, payload, headers);
        return { status: edgeImpulseResponse.status, data: edgeImpulseResponse.data };
        
    } catch (error) {
        return { status: error.response.status , data: error.response.data };
    }

}

routes.post('/start-sampling', async (request, response) => {

    const sampling = await startSampling('loaded_syringe');

    response.status(sampling.status).send(sampling.data)

})



routes.post('/capture', async (request, response) => {
    
    
    const vacinnationData = await createNewVaccinationData();
    
    await freezeScreenForCapture();
    //Ready to capture photo
    let readStatus = edgeCamera.syringeStatus;
    const confirmedStatus = await confirmVaccineStatus(readStatus);

    vacinnationData.changeSyringeStatus(confirmedStatus)

    const dataToIota = await sendDataToTangle(vacinnationData)


    response.status(200)
            .send({
                    ...vacinnationData,
                    idTransaction: dataToIota.messageId 
                })

	
})


export default routes;