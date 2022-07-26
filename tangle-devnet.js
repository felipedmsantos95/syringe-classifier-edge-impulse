import 'dotenv/config'
import { ClientBuilder } from '@iota/client';

const client = new ClientBuilder()
    .node('https://api.lb-0.h.chrysalis-devnet.iota.cafe')
    .build()

const tangleIndex = process.env.DEVNET_INDEX || '@test';


//You can uncomment the line below to check IOTA node connection
console.log('[TANGLE DEVNET] Checking IOTA node connection...')
try{
    const status = await client.getInfo()
    console.log(`[TANGLE DEVNET] IOTA node connected received ${status.nodeinfo.messagesPerSecond} messages per second.\nAvailable in ${status.url}`)
}
catch(error){
    console.log(error)
}




const sendDataToTangle = async (data) => {

    console.log('[TANGLE DEVNET] Sending vaccination data to IOTA Tangle Devnet...')

    const message = await client.message()
        .index(tangleIndex)
        .data(JSON.stringify(data))
        .submit();

    return message;
}



export { sendDataToTangle }