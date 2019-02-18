import { action, computed, observable } from 'mobx';
import { AsyncStorage } from 'react-native';

class StoreSettings {

	@observable site = 'news.mongabay.com';
	@observable mainfontsize = 15;
	@observable fontstyle = true;
	@observable notify = true;
	@observable donate = false;
	@observable langcode;
	@observable pageAbout;
	@observable pageContact;
	@observable pageTerms;
	@observable pagePrivacy;

	constructor() {

		//AsyncStorage.removeItem('site');

		this.currentSite();

		AsyncStorage.getItem('mainfontsize').then(action((result) => {
			if(result) this.mainfontsize = JSON.parse(result);
		}));

		AsyncStorage.getItem('fontstyle').then(action((result) => {
			if(result) this.fontstyle = JSON.parse(result);
		}));

		AsyncStorage.getItem('notify').then(action((result) => {
			if(result) {
				this.notify = JSON.parse(result)
			}else{
				AsyncStorage.setItem('notify', JSON.stringify(this.notify));
			}
		}))

		AsyncStorage.getItem('donate').then(action((result) => {
			if(result) {
				this.donate = JSON.parse(result)
			}else{
				AsyncStorage.setItem('donate', JSON.stringify(this.notify));
			}
		}))
	}

	@action async currentSite() {
		//this.site = 'es.mongabay.com';//TODO query site correctly
		console.log('Site before: ', this.site)
		await AsyncStorage.getItem('site')
			.then(action((result) => {
	    	if(result) {
					this.site = JSON.parse(result);
					switch(this.site) {
						case 'news.mongabay.com':
							this.langcode = 'en';
							this.pageAbout = 13473;
							this.pageContact = 250;
							this.pageTerms = 12718;
							this.pagePrivacy = 12723;
						break;
						case 'india.mongabay.com':
							this.langcode = 'en';
							this.pageAbout = 178;
							//TODO get real page numbers
							this.pageContact = 250;
							this.pageTerms = 12718;
							this.pagePrivacy = 12723;
						break;
						case 'es.mongabay.com':
							this.langcode = 'es';
							this.pageAbout = 171437;
							//TODO get real page numbers
							this.pageContact = 250;
							this.pageTerms = 12718;
							this.pagePrivacy = 12723;
						break;
						case 'www.mongabay.co.id':
							this.langcode = 'id';
							this.pageAbout = 5;
							//TODO get real page numbers
							this.pageContact = 250;
							this.pageTerms = 12718;
							this.pagePrivacy = 12723;
						break;
					}
					console.log('Site after: ', this.site)
	    	} else {
	    		this.site = 'news.mongabay.com';
	    		AsyncStorage.setItem('site', JSON.stringify(this.site));
	    		this.langcode = 'en';
					this.pageAbout =  13473;
					this.pageContact = 250;
					this.pageTerms = 12718;
					this.pagePrivacy = 12723;
	    	}
	    }))
	}

	@action langCode(site) {
		
		switch(site) {
			case 'news.mongabay.com':
			this.langcode = 'en';
			this.pageAbout = 13473;
			break;

			case 'india.mongabay.com':
			this.langcode = 'en';
			this.pageAbout = 178;
			break;

			case 'es.mongabay.com':
			this.langcode = 'es';
			this.pageAbout =  171437;
			break;

			case 'www.mongabay.co.id':
			this.langcode = 'id';
			this.pageAbout =  5;
			break;
		}

	}

	@computed get fontstyleName() {
	    if(this.fontstyle) {
	      return `System`
	    } else {
	      return `Vollkorn-Regular`
	    }
	}

	@computed get bylineRepos() {
    return this.site === 'www.mongabay.co.id' ? 2 : 5;
  }

  @computed get topicRepos() {
    return this.site === 'www.mongabay.co.id' ? 1 : 4;
  }

}

export default new StoreSettings();