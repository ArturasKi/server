import { server } from "./lib/server.js";

const app = {};

app.init = () => {
    // ETAPAI, kaip pasileidinėja projektas:
    // 1.
    // sukurti pradinius folder'ius;
    // sukurti pradinius file'us;
    // 2.
    // prisijungti prie duomenų bazės;
    // paleisti mūsų serverį (perduoti DB connection ir t.t.);
    server.init();
    // 3.
    // pasikartojantys procesai:
    // - ištrinti nenaudojamus file'us;
    // - suzip'inti seną informaciją;
    // - atsinaujinti API informaciją (valiutos, orai ir t.t.);
}

app.init(); // kaskart restartavus pasileidžia funkcija;

export { app };

// PASTABOS

// module.export = app;

// Unexpected token 'export' - token programinis žodis, kuris nesupranta, kas yra export;

//  "description": "",
// "type": "module", - prirašome package.json'e, kad būtų galima naudoti modernią sintaksę export { app };
// "main": "index.js",

// serveris:
// - pages/routes
// nukreipimas į kažkokį puslapį;
// kelias (url:get) -> funkcija, kuri grąžina puslapio HTML (URL -> HTML);
// url map'inasi į funckiją;

// - static files
// - api
// - cors
// - db (mysql/Maria)
// - file upload

// settings:
// - port
// - aplinkos: dev, test, prod