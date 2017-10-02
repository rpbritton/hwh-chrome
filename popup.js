getData(function(data) {
	getToken(data.accounts[0].id, function(token) {
		console.log(token);
	});

});
