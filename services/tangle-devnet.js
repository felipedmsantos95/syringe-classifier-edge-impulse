import 'dotenv/config'
import { ClientBuilder } from '@iota/client';

const client = new ClientBuilder()
    .node('https://api.lb-0.h.chrysalis-devnet.iota.cafe')
    .build()

const tangleIndex = process.env.DEVNET_INDEX || '@test';

console.log('[TANGLE DEVNET] Checking IOTA node connection...')
try{
    const status = await client.getInfo()
    console.log(`[TANGLE DEVNET] IOTA node connected, received ${status.nodeinfo.messagesPerSecond} messages per second.\n Check data in https://explorer.iota.org/devnet/indexed/${tangleIndex}`)
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

    console.log(`[TANGLE DEVNET] Data sent successfully!\nCheck it in https://explorer.iota.org/devnet/message/${message.messageId}`)

    return message;
}

export { sendDataToTangle }