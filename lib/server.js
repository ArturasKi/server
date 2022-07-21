import http from 'http';
import { file } from './file.js';
import { utils } from './utils.js';

const server = {};

server.httpServer = http.createServer(async (req, res) => {

    const baseURL = `http${req.socket.encryption ? 's' : ''}://${req.headers.host}/`; // kokiame serveryje sukasi mūsų kodas;
    const parsedURL = new URL(req.url, baseURL);
    const httpMethod = req.method.toLowerCase(); // kaip noriu pasiielgti su objektu (užklausos intensija);
    const trimmedPath = parsedURL.pathname.replace(/^\/+|\/+$/g, '');

    /*
    Užklausų kategorijos:
    - binary failas
    - tekstiniai failas
    - api (JSON, mainai)
    - ne failas (HTML)
    */

    let responseContent = '';

    const binaryFileExtensions = ['ico', 'jpg', 'png'];
    const textFileExtensions = ['css', 'js', 'svg'];

    const fileExtension = utils.fileExtension(trimmedPath);
    const isBinaryFile = binaryFileExtensions.includes(fileExtension);
    const isTextFile = textFileExtensions.includes(fileExtension);
    const isAPI = trimmedPath.slice(0, 5) === '/api/';
    const isPage = !isBinaryFile && !isTextFile && !isAPI;

    if (isBinaryFile) {
        responseContent = 'BINARY FILE';
    }

    if (isTextFile) {
        responseContent = 'TEXT FILE';
    }

    if (isAPI) {
        responseContent = 'API RESPONSE';
    }

    if (isPage) {
        const routes = {
            '': pageHome,
            'services': pageServices,
            'about': pageAbout,
            '404': page404,
        }

        responseContent = routes[trimmedPath] ? routes[trimmedPath]() : routes['404']();
    }

    res.end(responseContent);
});

function pageHome() {
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
                <link rel="stylesheet" href="/css/main.css">
                <link rel="stylesheet" href="/css/demo.css">
            </head>
            <body>
                HOME PAGE CONTENT
            </body>
            </html>`;
}

function pageAbout() {
    return 'ABOUT PAGE';
}

function pageServices() {
    return 'SERVICES PAGE';
}

function page404() {
    return '404 PAGE';
}

server.init = () => {
    const PORT = 65535;
    server.httpServer.listen(PORT, () => {
        console.log(`Sveikinu, tavo projektas pasiekiamas per http://localhost:${PORT}`);
    }); // serveris yra nuolatinėje būsenoje klausytis ateinančių užklausų iš interneto;
}

export { server };

(async () => {
    const user = {
        name: 'Chuck',
        age: Infinity,
        age2: NaN,
        age3: 77,
        kick: 'round'
    };
    const fileName = 'chuck-norris.json';
    const folder = 'accounts';

    const [createErr, createMsg] = await file.create(folder, fileName, user);
    if (createErr) {
        console.log(createMsg);
        return;
    }

    const [read1Err, read1Msg] = await file.read(folder, fileName);
    if (read1Err) {
        console.log(read1Msg);
        return;
    }

    const [updateErr, updateMsg] = await file.update(folder, fileName, {
        ...user,
        update: true
    })
    if (updateErr) {
        console.log(updateMsg);
        return;
    }

    const [read2Err, read2Msg] = await file.read(folder, fileName);
    if (read2Err) {
        console.log(read2Msg);
        return;
    }

    const [delete2Err, delete2Msg] = await file.delete(folder, fileName);
    if (delete2Err) {
        console.log(delete2Msg);
        return;
    }

    const [read3Err, read3Msg] = await file.read(folder, fileName);
    if (read3Err) {
        console.log(read3Msg);
        return;
    }

    console.log(read3Msg);
})()

// port nr max 2^16 = 65536;

// parefreshin'us puslapį pareina dvi užklausos: localhost (puslapį reprezentuojantis turinys) ir favicon.ico (automatiškai);

// curl "http://localhost:65535" - vienkartinės užklausos išsiuntimas terminale;