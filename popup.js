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
			createUser(account, accNum, function(user) {
//				users.push(user);
//				if (users.length == data.accounts.length) {
//					organizeUsers();
//				}
			});
//			users.push(createUser(account, accNum));
//			pageUser.append(users[users.length-1]);
//			if (accNum = users.length-1) {
//				organizeUsers();
//			}
		});
//		userAdd.style.top = (data.accounts.length*68) +"px";
	}
});
//*/
