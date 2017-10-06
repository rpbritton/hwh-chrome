var manifest = chrome.runtime.getManifest();
var oauthUrl = "https://accounts.google.com/o/oauth2/auth?response_type=token";
oauthUrl += "&client_id=" +encodeURIComponent(manifest.oauth2.client_id);
oauthUrl += "&scope=" +encodeURIComponent(manifest.oauth2.scopes.join(" "));
oauthUrl += "&redirect_uri=" +chrome.identity.getRedirectURL("oauth2");

function addAccount() {
	function accountGood(account) {
		data.accounts.push(account);
		getScope("https://www.googleapis.com/calendar/v3/users/me/calendarList", "?access_token=", data.accounts.length-1, function(calendarList) {
			console.log(calendarList);
			saveData();
			createUser(account, data.accounts.length-1);
		});
	}

	chrome.identity.launchWebAuthFlow({"url": oauthUrl +"&prompt=select_account", "interactive": true}, function(promise) {
		if (chrome.runtime.lastError) {
			console.log(chrome.runtime.lastError.message);
		}
		else {
			var token = parseToken(promise);
			useToken("https://www.googleapis.com/oauth2/v1/userinfo", "?access_token=", token, function(account) {
				account.token = token;
				if (!data.accounts || data.accounts.length == 0) {
					data.accounts = [];
					accountGood(account);
				}
				else {
					var duplicate = false;
					data.accounts.forEach(function(selAccount, accNum) {
						if (selAccount.id == account.id) {
							duplicate = true;
						}
						if (accNum+1 == data.accounts.length && !duplicate) {
							accountGood(account);
						}
					});
				}
			});
		}
	});
}

function deleteAccount(id, callback) {
	data.accounts.forEach(function(account, accNum) {
		if (account.id == id) {
			getScope("https://accounts.google.com/o/oauth2/revoke", "?token=", accNum, function() {
				data.accounts.splice(accNum, 1);
				saveData();
				callback();
			});
		}
	});
}
/*
function refreshAccount(account, callback) {
	getScope("https://www.googleapis.com/oauth2/v1/userinfo", account.id, callback);
}
*/
function getScope(scope, tokenArg, accNum, callback) {
	useToken(scope, tokenArg, data.accounts[accNum].token, function(response) {
		switch (response) {
			case 400:
			case 401:		// Must get new token
				getToken(data.accounts[accNum].id, function(token) {
//					console.log(token);
//					switch (token) {
//						case "User interaction required.":		// Must grant access
//							break;
//						default:		// New token retrieved & scope retrieved
							data.accounts[accNum].token = token;
							saveData();
							useToken(scope, tokenArg, data.accounts[accNum].token, callback);
//					}
				});
				break;
			default:		// Scope retrieved
				callback(response);
		}
	});
}

function useToken(scope, tokenArg, token, callback) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			callback(JSON.parse(this.responseText));
		}
		if (this.readyState == 4 && this.status >= 400) {
			callback(this.status);
		}
	};

	request.open("GET", scope +tokenArg +token, true);
	request.send();
}

function getToken(userId, callback) {
	chrome.identity.launchWebAuthFlow({"url": oauthUrl +"&login_hint=" +userId, "interactive": false}, function(promise) {
		if (chrome.runtime.lastError) {
//			console.log(chrome.runtime.lastError.message);
			callback(chrome.runtime.lastError);
		}
		else {
			callback(parseToken(promise));
		}
	});
}

function parseToken(promise) {
	return promise.substring(promise.indexOf("#access_token=") +14, promise.indexOf("&token_type="));
}
