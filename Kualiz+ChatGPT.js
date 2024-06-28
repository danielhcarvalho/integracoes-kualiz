async function KualizAPI(path, method, body)
{
    const endpoint = `https://testeskualiz.atenderbem.com/${path}`;


    const result = await fetch(endpoint, 
        {
            method: method,

            headers:
            {
                Accept: 'application/json'
            },

            body: JSON.stringify(body)
        })
        .then(res => {
            return res.json()
        })
        .then(data => {

            return data
        })
        .catch(error => console.log(error))

    return result

}


async function OpenChat(queueId, apiKey, number, country, markerId, message)
{
    const body = {
        'queueId': queueId,
        'apiKey': apiKey,
        'number': number,
        'country': country,
        'markerId': markerId,
        'message': message
    }
    const atendimento = await KualizAPI('int/openChat', 'POST', body)

    return atendimento
}

async function SendMessageToChat(queueId, apiKey, chatId, text, fileId, info)
{
    const body = {
        "queueId": queueId,
        "apiKey": apiKey,
        "chatId": chatId,
        "text": text,
        "fileId": fileId,
        "info": info,
    }

    const enviarMensagem = await KualizAPI('int/sendMessageToChat', 'POST', body)

    return enviarMensagem
}

async function GetChatMessages(chatId)
{
    const body = 
    {
        'queueId': 10, 
        'apiKey': 'zltecnologia',
        'chatId': chatId
    }

    const getChatMessages = await KualizAPI('int/getChatMessages', 'POST', body)
    return getChatMessages
}

async function GetAllOpenChats()
{
    const body =
    {
        'queueId': 10, 
        'apiKey': 'zltecnologia'
    }

    const buscarAtendimentos = await KualizAPI('int/getAllOpenChats', 'POST', body)

    return buscarAtendimentos
}

async function RespondendoClientes(chatId, index)
{
    try
    {
        const buscarAtendimentos = await GetAllOpenChats()
        let getChatMessages, mensagem, direction

        for (let i = 0; i < buscarAtendimentos.openChats; i++) 
        {   
            getChatMessages = await GetChatMessages(buscarAtendimentos.chats[i].chatId)        
            mensagem = getChatMessages.messages[(getChatMessages.messages.length) - 1].message,
            direction = getChatMessages.messages[(getChatMessages.messages.length) - 1].direction

            if (buscarAtendimentos.chats[i].onIvr && direction == 1)
            {    
                let resposta = (await OpenAiAPI(mensagem)).choices[0].message.content
                SendMessageToChat(10, 'zltecnologia', buscarAtendimentos.chats[i].chatId, resposta)
                console.log(resposta)
                console.log(buscarAtendimentos.chats[i].chatId)

            } 
        }
    } catch (error)
    {
        
    }
}

async function StartServer()
{
    const http = require('http')
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello, World!\n');
    });

    const port = 3000;
    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });

    console.log('Press Ctrl+C to stop the server');

    // Check for new messages every 10 seconds
    setInterval(RespondendoClientes, 10000);
    
}

StartServer()