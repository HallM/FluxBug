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
    handleSetMessages(newMessages) {
        this.messages = newMessages;
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
            messages: this.messages,
            flashMessages: this.flashMessages
        };
    }
    rehydrate(state) {
        this.messages = state.messages;
        this.flashMessages = state.flashMessages;
    }
}

NotificationStore.storeName = 'NotificationStore';
NotificationStore.handlers = {
    'ADD_NOTIFICATIONS': 'handleAddMessages',
    'SET_NOTIFICATIONS': 'handleSetMessages',
    'ADD_FLASH_MESSAGE': 'handleAddFlashMessage',
    'NAVIGATE_SUCCESS': 'postNavigation'
};

export default NotificationStore;
