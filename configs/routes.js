import {login, logout} from '../actions/SessionActions';
import {register} from '../actions/UserActions';

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
    postLogin: {
        path: '/login',
        method: 'post',
        page: 'postLogin',
        action: login,
        showAuthed: false,
        showUnauthed: false
    },
    postLogout: {
        path: '/logout',
        method: 'post',
        page: 'postLogout',
        action: logout,
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
    },
    postRegister: {
        path: '/register',
        method: 'post',
        page: 'postRegister',
        action: register,
        showAuthed: false,
        showUnauthed: false
    }
};
