import { action, observable, useStrict } from 'mobx';
import { AsyncStorage } from 'react-native';

useStrict(true);

class StoreSettings {

	@observable mainfontsize;
	@observable notify;

	constructor() {
	    this.mainfontsize = 15;
	    this.notify = true;
	    AsyncStorage.getItem('mainfontsize').then(action((result) => {
	    	if(result) this.mainfontsize = JSON.parse(result);
	    }));
	    
	    AsyncStorage.getItem('notify').then(action((result) => {
	      if(result) this.notify = JSON.parse(result);
	    }))
	}
	
}

export default new StoreSettings();