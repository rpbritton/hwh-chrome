var manifest = chrome.runtime.getManifest();
var oauthUrl = "https://accounts.google.com/o/oauth2/auth?response_type=token";
oauthUrl += "&client_id=" +encodeURIComponent(manifest.oauth2.client_id);
oauthUrl += "&scope=" +encodeURIComponent(manifest.oauth2.scopes.join(" "));
oauthUrl += "&redirect_uri=" +chrome.identity.getRedirectURL("oauth2");

function addAccount() {
	chrome.identity.launchWebAuthFlow({"url": oauthUrl +"&prompt=select_account", "interactive": true}, function(promise) {
		if (chrome.runtime.lastError) {
			console.log(chrome.runtime.lastError.message);
		}
		else {
			var token = parseToken(promise);
			useToken("https://www.googleapis.com/oauth2/v1/userinfo", "?access_token=", token, function(newAccount) {
				newAccount.token = token;
				if (!data.accounts || data.accounts.length == 0) {
					data.accounts = [];
					data.accounts.push(newAccount);
					saveData();
					createUser(newAccount);
					userAdd.style.top = (data.accounts.length*68) +"px";
				}
				else {
					var duplicate = false;
					data.accounts.forEach(function(account, x) {
						if (account.id == newAccount.id) {
							duplicate = true;
						}
						if (x+1 == data.accounts.length && !duplicate) {
							data.accounts.push(newAccount);
							saveData();
							createUser(newAccount);
						}
					});
				}
			});
		}
	});
}

function deleteAccount(selAccount, callback) {
	data.accounts.forEach(function (account, x) {
		if (selAccount.id == account.id) {
			getScope("https://accounts.google.com/o/oauth2/revoke", "?token=", x, function() {
				data.accounts.splice(x, 1);
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
/*		switch (response) {
			case 400:
			case 401:		// Must get new token
				getToken(data.accounts[accNum].id, function(token) {
					switch (token) {
						case 400:
						case 401:		// Must grant access
							break;
						default:		// New token retrieved & scope retrieved
							data.accounts[accNum].token = token;
							saveData();
							useToken(scope, tokenArg, data.accounts[accNum].token, callback);
					}
				});
				break;
			default:		// Scope retrieved
				callback(response);
		}
*/		callback(response);
	});
}

function useToken(scope, tokenArg, token, callback) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			callback(JSON.parse(this.responseText));
		}
	};

	request.open("GET", scope +tokenArg +token, true);
	request.send();
}

function getToken(userId, callback) {
	chrome.identity.launchWebAuthFlow({"url": oauthUrl +"&login_hint=" +userId, "interactive": false}, function(promise) {
		if (chrome.runtime.lastError) {
			console.log(chrome.runtime.lastError.message);
		}
		else {
			callback(parseToken(promise));
		}
	});
}

function parseToken(promise) {
	return promise.substring(promise.indexOf("#access_token=") +14, promise.indexOf("&token_type="));
}
