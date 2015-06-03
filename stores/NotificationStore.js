import BaseStore from 'fluxible/addons/BaseStore';

class NotificationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.messages = [];
    }
    handleAddMessages(newMessages) {
        this.messages = this.messages.concat(newMessages);
        console.log(newMessages);
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
    'ADD_NOTIFICATIONS': 'handleAddMessages'
};

export default NotificationStore;
