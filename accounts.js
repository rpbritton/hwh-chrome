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
			useToken("https://www.googleapis.com/oauth2/v1/userinfo", token, function(account) {
				account.token = token;
				if (!data.accounts) {
					data.accounts = [];
					data.accounts.push(account);
					saveData(data);
				}
				else {
					var duplicate = false;
					for (var x = 0; x < data.accounts.length; x++) {
						if (data.accounts[x].id == account.id) {
							duplicate = true;
						}
						if (x+1 == data.accounts.length && !duplicate) {
							data.accounts.push(account);
							saveData(data);
						}
					}
				}
			});
		}
	});
}
/*
function refreshAccount(account, callback) {
	getScope("https://www.googleapis.com/oauth2/v1/userinfo", account.id, callback);
}
*/
function getScope(scope, accNum, callback) {
	useToken(scope, data.accounts[accNum].token, function(response) {
		switch (response) {
			case 401:		// Must get new token
				getToken(data.accounts[accNum].id, function(token) {
					switch (token) {
						case 401:		// Must grant access
							break;
						default:		// New token retrieved & scope retrieved
							data.accounts[accNum].token = token;
							useToken(scope, data.accounts[accNum].token, callback);
					}
				});
				break;
			default:		// Scope retrieved
				callback(response);
		}
	});
}

function useToken(scope, token, callback) {
	var request = new XMLHttpRequest();
	request.onload = function() {
		if (this.status >= 200 && this.status < 400) {
			callback(JSON.parse(request.responseText));
		}
		else {
			callback(this.status);
		}
	};

	request.open("GET", scope +"?access_token=" +token, true);
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
