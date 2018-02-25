import { autorun, action, computed, observable, useStrict, runInAction } from 'mobx';
import Config from '../config/api.settings';

//useStrict(true);

class Store {
	@observable site = 'news';
	@observable listing = new observable.map();
	@observable topic = '';
	@observable location = '';
	@observable byline = '';

	@observable page = 1;
	@observable loading = false;
	@observable refreshing = false;
	@observable errorMsg = '';


	@computed get completeURL(): string {
	    return `https://${this.site}.mongabay.com/${Config.mongabay.wp_api}/${Config.mongabay.posts_route}?_embed&per_page=${Config.mongabay.per_page}&page=${this.page}`;
	}	

	@action changeSite(site) {
		this.site = site
	}

	@computed get handleRefresh() {
        this.page = 1,
        this.refreshing = true,
        this.fetchData
  	}

  	@computed get handleLoadMore() {
        this.page = this.page + 1,
        this.fetchData
  	}
  	

  	@action fetchData = async () => {
  		const url = this.completeURL;
  		fetch(url)
			.then(fetch.throwErrors)
			.then(res => res.json())
			.then(json => {this.listing.set(json.data.id, json.data)})
			.catch(err => console.log('ERROR', err.message, err))


    // const url = `${this.completeURL}${this.page}`;
    // this.loading.set({ loading: true });

    // fetch(url)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     this.set({
    //       listing: page === 1 ? res : [...this.listing.data.slice(), ...res],
    //       loading: false,
    //       refreshing: false,
    //     });
    //   })
    //   .catch(error => {
    //     this.set({ error, loading: false });
    //   });

  //    
  //     .catch(error => {
  //       this.setState({ error, loading: false });
  //     });




  // 		try {
		// 	if(this.refreshing) this.page = 1;
		// 	const url = this.completeURL();

		// 	const params = {
		// 		page: this.page
		// 	}


		// 	const responseData = await get(url).then(res => res.json());

		// 	const {page, listing} = responseData;

		// 	runInAction(() => {

		// 		this.refreshing = false;
		// 		this.errorMsg = '';

		// 		if(this.page == 1){
  //                   this.data.replace(listing);
  //               } else {
  //                   this.data.splice(this.data.length, ...listing);


  //               }

		// 	})
		// }catch(error){
		// 	if(error.msg) {
  //               this.errorMsg = error.msg;
  //           }else {
  //               this.errorMsg = error;
  //           }
		// }

	}
}
var list = window.location = new Store;

export default new Store();

autorun(()=>{
	console.log('LISTING:', list.listing)
})
