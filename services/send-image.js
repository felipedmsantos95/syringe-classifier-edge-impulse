import axios from 'axios';


const projectId = process.env.EDGE_IMPULSE_PROJECT_ID;
const deviceId = process.env.DEVICE_ID;
const edgeImpulseKey = process.env.EDGE_IMPULSE_API_KEY;


const sendImageToDataset = async (expected) => {

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
        sensor: 'Camera (640x480)'
    };
    
    try {
        const edgeImpulseResponse = await axios.post(url, payload, headers);
        return { status: edgeImpulseResponse.status, data: edgeImpulseResponse.data };
        
    } catch (error) {
        return { status: error.response.status , data: error.response.data };
    }

}


const datasetIncrease = async (expected) => {

    const sampling = await sendImageToDataset(expected);

    const isSuccess = sampling.data.success;

    const messageStatus = isSuccess ? 'Image sent to training dataset' : `Image didn\'t send to training dataset. Reason: ${sampling.data.error}`

    return { status: isSuccess, msg: messageStatus }

}


export { sendImageToDataset, datasetIncrease }
