export default {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        title: 'Home',
        handler: require('../components/Home'),
        showAuthed: true,
        showUnauthed: true
    },
    about: {
        path: '/about',
        method: 'get',
        page: 'about',
        title: 'About',
        handler: require('../components/About'),
        showAuthed: true,
        showUnauthed: true
    },
    login: {
        path: '/login',
        method: 'get',
        page: 'login',
        title: 'Login',
        handler: require('../components/Login'),
        showAuthed: false,
        showUnauthed: false
    },
    register: {
        path: '/register',
        method: 'get',
        page: 'register',
        title: 'Register',
        handler: require('../components/Register'),
        showAuthed: false,
        showUnauthed: false
    }
};
