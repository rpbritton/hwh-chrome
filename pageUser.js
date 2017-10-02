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
			var token = promise.substring(promise.indexOf("#access_token=") +14, promise.indexOf("&token_type="));
			
			var request = new XMLHttpRequest();
			request.onreadystatechange = function() {
				if (this.status >= 200 && this.status < 400 && this.readyState == 4) {
					var resp = JSON.parse(request.responseText);
					console.log(resp);
					getToken(resp.id);
				}
			};

			request.open("GET", "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" +token, true);
			request.send();
		}
	});
}

function getToken(userId) {
	chrome.identity.launchWebAuthFlow({"url": oauthUrl +"&login_hint=" +userId, "interactive": true}, function(promise) {
		if (chrome.runtime.lastError) {
			console.log(chrome.runtime.lastError.message);
		}
		else {
			var token = promise.substring(promise.indexOf("#access_token=") +14, promise.indexOf("&token_type="));
			console.log("you did it! token: " +token);
		}
	});
}
addAccount();
