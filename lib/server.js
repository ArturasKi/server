import http from 'http';

const server = {};

server.httpServer = http.createServer((request, response) => {
    
    const baseURL = `http${request.socket.encryption ? 's' : ''}://${request.headers.host}/`;
    const parsedURL = new URL(request.url, baseURL);
    // const URL = request.url; // ko nori vartotojas (objektas);
    const httpMethod = request.method.toLowerCase(); // kaip noriu pasiielgti su objektu (užklausos intensija);

    console.log(parsedURL);

    const routes = {
        '/': pageHome,
        '/services': pageServices,
        '/about': pageAbout,
        '/404': page404
    }

    let responseContent = routes[request.url] ? routes[request.url]() : routes['/404']();

    // let responseContent = '';

    // for (const route in routes) {
    //     if (route === request.url) {
    //         responseContent = routes[route](); // dinamiškai ištraukiama kintama dalis [route];
    //         break; 
    //     } else {
    //         responseContent = routes['/404']();
    //     }
    // }

    // switch (request.url) {
    //     case '/':
    //         responseContent = pageHome();
    //         break;

    //     case '/services':
    //         responseContent = pageServices();
    //         break;

    //     case '/about':
    //         responseContent = pageAbout();
    //         break;
    
    //     default:
    //         responseContent = page404();
    //         break;
    // }

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
    console.log('pasileidžia serveris...');
    server.httpServer.listen(65535); // serveris yra nuolatinėje būsenoje klausytis ateinančių užklausų iš interneto;
}

export { server };

// port nr max 2^16 = 65536;

// parefreshin'us puslapį pareina dvi užklausos: localhost (puslapį reprezentuojantis turinys) ir favicon.ico (automatiškai);

// curl "http://localhost:65535" - vienkartinės užklausos išsiuntimas terminale;