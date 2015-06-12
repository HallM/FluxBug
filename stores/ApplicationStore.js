import BaseStore from 'fluxible/addons/BaseStore';
import routesConfig from '../configs/routes';
import RouteStore from './RouteStore';

class ApplicationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.currentPageName = null;
        this.currentPage = null;
        this.pages = routesConfig;
        this.pageTitle = '';
        this.csrf = '';
    }
    handlePageTitle(currentRoute) {
        var self = this;
        this.dispatcher.waitFor(RouteStore, function () {
            if (currentRoute && currentRoute.get('title')) {
                self.pageTitle = currentRoute.get('title');
                self.currentPageName = currentRoute.get('page');
                self.emitChange();
            }
        });
    }
    setCsrfToken(token) {
        this.csrf = token;
    }
    getCurrentPageName() {
        return this.currentPageName;
    }
    getPageTitle() {
        return this.pageTitle;
    }
    getPages() {
        return this.pages;
    }
    getCsrf() {
        return this.csrf;
    }
    dehydrate() {
        return {
            currentPageName: this.currentPageName,
            currentPage: this.currentPage,
            pages: this.pages,
            pageTitle: this.pageTitle,
            csrf: this.csrf
        };
    }
    rehydrate(state) {
        this.currentPageName = state.currentPageName;
        this.currentPage = state.currentPage;
        this.pages = state.pages;
        this.pageTitle = state.pageTitle;
        this.csrf = state.csrf;
    }
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
    'NAVIGATE_SUCCESS': 'handlePageTitle',
    'SETCSRF_TOKEN': 'setCsrfToken'
};

export default ApplicationStore;
