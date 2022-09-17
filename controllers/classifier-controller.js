import { sendDataToTangle } from '../services/tangle-devnet.js'
import { createNewVaccinationData, confirmVaccineStatus, freezeScreenForCapture } from '../services/interactive-menu.js';
import { sendImageToDataset, datasetIncrease } from '../services/send-image.js';
import { EdgeCameraClassifier } from '../models/camera-classifier.js';



//Initializing Classifier
const edgeCamera = new EdgeCameraClassifier();
await edgeCamera.runClassifier();

const startSampling = async (request, response) => {

    const status = request.body.status;

    const sampling = await sendImageToDataset(status);

    response.status(sampling.status).send(sampling.data)

}

const startVaccination = async (request, response) => {

    const vacinnationData = await createNewVaccinationData();
    
    await freezeScreenForCapture();
    //Ready to capture photo
    let readStatus = edgeCamera.syringeStatus;
    const confirmedStatus = await confirmVaccineStatus(readStatus);
    const sendingImageToDataset = await datasetIncrease(confirmedStatus);

    vacinnationData.changeSyringeStatus(confirmedStatus)
    vacinnationData.changePhotoSentStatus(sendingImageToDataset.status)

    const dataToIota = await sendDataToTangle(vacinnationData)


    response.status(200)
            .send({
                ...vacinnationData,
                idTransaction: dataToIota.messageId,
                trainingDataset: sendingImageToDataset.msg
            })


}

export default { startSampling, startVaccination }