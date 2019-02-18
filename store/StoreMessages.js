import { action, computed, observable } from 'mobx';

class StoreMessages {

    @observable showmessage = false;
    @observable message = '';

    @action showMsg() {
        this.showmessage = true;
        setTimeout(()=>{this.showmessage = false}, 3000);
    }

    @action messageText(text) {
        this.message = text;
    }

}

export default new StoreMessages();