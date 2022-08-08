import express from 'express';
import { sendDataToTangle } from './tangle-devnet.js'
import { createNewVaccinationData, confirmVaccineStatus, freezeScreenForCapture } from './interactive-menu.js';
import { startSampling } from './start-sampling.js';
import { EdgeCameraClassifier } from './camera-classifier.js';


const routes = express.Router();
//Initializing Classifier
const edgeCamera = new EdgeCameraClassifier();
await edgeCamera.runClassifier();




routes.post('/start-sampling', async (request, response) => {

    const status = request.body.status;

    const sampling = await startSampling(status);

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