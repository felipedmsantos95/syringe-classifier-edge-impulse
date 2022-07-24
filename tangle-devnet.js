import { ClientBuilder } from '@iota/client';

const client = new ClientBuilder()
    .node('https://api.lb-0.h.chrysalis-devnet.iota.cafe')
    .build()

//You can uncomment the line below to check IOTA node connection
//client.getInfo().then(console.log).catch(console.error)


//You can edit this object to send data as you want
const content = {
    test: 'test'
}

async function run() {

    const message = await client.message()
        .index('@felipedmsantos95') //This is the messages label
        .data(JSON.stringify(content))
        .submit();

    console.log(message);
}

run()