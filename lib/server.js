import http from 'http';

const server = {};

server.httpServer = http.createServer((request, response) => {
    console.log('gavau užklausą...');

    response.end('STAI TAU SERVERIO ATSAKYMAS...');
});

server.init = () => {
    console.log('pasileidžia serveris...');
    server.httpServer.listen(65535); // serveris yra nuolatinėje būsenoje klausytis ateinančių užklausų iš interneto;
}

export { server };

// port nr max 2^16 = 65536;

// parefreshin'us puslapį pareina dvi užklausos: localhost (puslapį reprezentuojantis turinys) ir favicon.ico (automatiškai);

// curl "http://localhost:65535" - vienkartinės užklausos išsiuntimas terminale;