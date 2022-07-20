import http from 'http';
import { utils } from './utils.js';

const server = {};

server.httpServer = http.createServer((request, response) => {
    
    const baseURL = `http${request.socket.encryption ? 's' : ''}://${request.headers.host}/`; // kokiame serveryje sukasi mūsų kodas;
    const parsedURL = new URL(request.url, baseURL);
    // const URL = request.url; // ko nori vartotojas (objektas);
    const httpMethod = request.method.toLowerCase(); // kaip noriu pasiielgti su objektu (užklausos intensija);

    // let trimmedPath = parsedURL.pathname.slice(1);
    // if (trimmedPath[trimmedPath.length - 1] === '/' ) {
    //     trimmedPath = trimmedPath.slice(0, -1);
    // }

    const trimmedPath = parsedURL.pathname.replace( /^\/+|\/+$/g, '');

    console.log(trimmedPath);
    /*
    Užklausų kategorijos:
    - binary failas
    - tekstiniai failas
    - api (JSON, mainai)
    - ne failas (HTML)
    */

    let responseContent = '';

    const url = parsedURL.pathname
    console.log(url);

    const textFileExtensions = ['css', 'js', 'txt'];
    const binaryFileExtensions = ['ico', 'jpg', 'png', 'webp'];

    const fileExtension = utils.fileExtension(url);
    const isBinaryFile = binaryFileExtensions.includes(fileExtension);
    const isTextFile = textFileExtensions.includes(fileExtension);
    const isAPIFile = url.slice(0, 5) === '/api/';
    const isPage = !isBinaryFile && !isTextFile && !isAPIFile;

    if (isBinaryFile) {
        responseContent = 'BINARY FILE';
    }

    if (isTextFile) {
        responseContent = 'TEXT FILE';
    }

    if (isAPIFile) {
        responseContent = 'API FILE';
    }

    if (isPage) {
        const routes = {
            '/': pageHome,
            '/services': pageServices,
            '/services/': pageServices,
            '/about': pageAbout,
            '/about/': pageAbout,
            '/404': page404
        }
        responseContent = routes[request.url] ? routes[request.url]() : routes['/404']();
    } 
        
    console.log(parsedURL.href);

    response.end(responseContent);
});

function pageHome() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="/css/main.css">
    </head>
    <body>
        HOME PAGE CONTENT
    </body>
    </html>;`
}

function pageServices() {
    return 'SERVICES PAGE';
}

function pageAbout() {
    return 'ABOUT PAGE';
}

function page404() {
    return '404 PAGE';
}

server.init = () => {
    console.clear();
    const PORT = 30000;
    console.log('pasileidžia serveris...');
    server.httpServer.listen(PORT, () => {
        console.log('Sviekinu, tavo projektas pasiekiamas')
    }); // serveris yra nuolatinėje būsenoje klausytis ateinančių užklausų iš interneto;
}

export { server };

// port nr max 2^16 = 65536;

// parefreshin'us puslapį pareina dvi užklausos: localhost (puslapį reprezentuojantis turinys) ir favicon.ico (automatiškai);

// curl "http://localhost:65535" - vienkartinės užklausos išsiuntimas terminale;