var data;
//*
getData(function(storage) {
	data = storage;
//	getScope("https://www.googleapis.com/oauth2/v1/userinfo", 0, function(response) {
//		console.log(response);
//	});
	data.accounts.forEach(function(account, x) {
		createUser(account, x);
	});
});
//*/
//clearData();
