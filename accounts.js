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
			useToken("https://www.googleapis.com/oauth2/v1/userinfo", parseToken(promise), function(account) {
				account.token = token; // do I need this?
			
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
			});
		}
	});
}

function useToken(scope, token, callback) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.status >= 200 && this.status < 400 && this.readyState == 4) {
			callback(JSON.parse(request.responseText));
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
