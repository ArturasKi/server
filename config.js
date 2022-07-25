const environments = {};

environments.dev = {
    port: 65535,
    auth: {
        minPasswordLenght: 4,
        verifyEmail: false,
    },
    db: {
        user: 'root',
        pass: 'fagdsxc',
        port: 1234,
    }
}

environments.test = {
    port: 7331,
    auth: {
        minPasswordLenght: 8,
        verifyEmail: true,
    },
    db: {
        user: 'root-test',
        pass: 'fagdsxsdasfaac',
        port: 1234,
    }
}

environments.prod = {
    port: 3000,
    auth: {
        minPasswordLenght: 12,
        verifyEmail: true,
    },
    db: {
        user: 'root',
        pass: 'fagdsxcqfsavzvxvzsadad',
        port: 1234,
    }
}

let env = process.env.NODE_ENV;
env = env ? env : 'dev';
let config = environments[env];
config = config ? config : environments.dev;

export default config;