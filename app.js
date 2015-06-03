import Fluxible from 'fluxible';
import Application from './components/Application';

import ApplicationStore from './stores/ApplicationStore';
import RouteStore from './stores/RouteStore';
import NotificationStore from './stores/NotificationStore';
import SessionStore from './stores/SessionStore';

// create new fluxible instance
const app = new Fluxible({
    component: Application
});

// register stores
app.registerStore(RouteStore);
app.registerStore(ApplicationStore);
app.registerStore(NotificationStore);
app.registerStore(SessionStore);

module.exports = app;
