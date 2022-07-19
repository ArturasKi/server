import http from 'http';

const server = {};

server.httpServer = http.createServer((request, response) => {
    console.log('gavau užklausą...');

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
    return 'HOME PAGE';
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