import nconf from 'nconf';

nconf.argv().env();
nconf.defaults({
    PORT: 3000,
    IP: '0.0.0.0',
    SESSION_SECRET: 'keyboard! cat 123'
});

export default nconf.get();
