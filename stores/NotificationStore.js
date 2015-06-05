import BaseStore from 'fluxible/addons/BaseStore';

class NotificationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.messages = [];
        this.flashMessages = [];
    }
    handleAddMessages(newMessages) {
        this.messages = this.messages.concat(newMessages);
        this.emitChange();
    }
    handleAddFlashMessage(newMessages) {
        this.flashMessages = this.flashMessages.concat(newMessages);
        this.emitChange();
    }
    postNavigation() {
        this.messages = this.flashMessages;
        this.flashMessages = [];
        this.emitChange();
    }
    getCurrentMessages() {
        return this.messages;
    }
    dehydrate() {
        return {
            messages: this.messages
        };
    }
    rehydrate(state) {
        this.messages = state.messages;
    }
}

NotificationStore.storeName = 'NotificationStore';
NotificationStore.handlers = {
    'ADD_NOTIFICATIONS': 'handleAddMessages',
    'ADD_FLASH_MESSAGE': 'handleAddFlashMessage',
    'NAVIGATE_SUCCESS': 'postNavigation'
};

export default NotificationStore;
