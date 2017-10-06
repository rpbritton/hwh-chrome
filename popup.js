var data;
//clearData();
//*
getData(function(storage) {
	data = storage;
//	getScope("https://www.googleapis.com/oauth2/v1/userinfo", 0, function(response) {
//		console.log(response);
//	});
	if (data.accounts) {
		data.accounts.forEach(function(account, accNum) {
			createUser(account, accNum, function(user) {});
		});
	}
});
//*/
