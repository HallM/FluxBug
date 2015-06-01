export default {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        title: 'Home',
        handler: require('../components/Home')
    },
    about: {
        path: '/about',
        method: 'get',
        page: 'about',
        title: 'About',
        handler: require('../components/About')
    },
    login: {
        path: '/login',
        method: 'get',
        page: 'login',
        title: 'Login',
        handler: require('../components/Login')
    },
    register: {
        path: '/register',
        method: 'get',
        page: 'register',
        title: 'Register',
        handler: require('../components/Register')
    }
};
