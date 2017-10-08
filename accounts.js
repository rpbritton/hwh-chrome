var manifest = chrome.runtime.getManifest();
var oauthUrl = "https://accounts.google.com/o/oauth2/auth?response_type=token";
oauthUrl += "&client_id=" +encodeURIComponent(manifest.oauth2.client_id);
oauthUrl += "&scope=" +encodeURIComponent(manifest.oauth2.scopes.join(" "));
oauthUrl += "&redirect_uri=" +chrome.identity.getRedirectURL("oauth2");
var userinfoUrl = "https://www.googleapis.com/oauth2/v1/userinfo";
var calendarUrl = "https://www.googleapis.com/calendar/v3";
var revokeUrl = "https://accounts.google.com/o/oauth2/revoke";

function addAccount() {
	chrome.identity.launchWebAuthFlow({"url": oauthUrl +"&prompt=select_account", "interactive": true}, function(promise) {
		if (chrome.runtime.lastError) {
			console.log(chrome.runtime.lastError.message);
		}
		else {
			var token = promise.substring(promise.indexOf("#access_token=") +14, promise.indexOf("&token_type="));
			var tokenExpiration = Date.now() +promise.substring(promise.indexOf("&expires_in=") +12)*1000-60000;
			useToken(userinfoUrl, "?access_token=", token, function(account) {
				account.token = token;
				account.tokenExpiration = tokenExpiration;
				if (!data.accounts || data.accounts.length === 0) {
					data.accounts = [];
					createAccount(account);
				}
				else {
					var duplicate = false;
					data.accounts.forEach(function(selAccount, accNum) {
						if (selAccount.id == account.id) {
							duplicate = true;
						}
						if (accNum == data.accounts.length-1 && !duplicate) {
							createAccount(account);
						}
					});
				}
			});
		}
	});
}

function createAccount(account) {
	data.accounts.push(account);
	var accNum = data.accounts.length-1;
	getScope(calendarUrl +"/users/me/calendarList" +"?maxResults=250" +"&showHidden=true", "&access_token=", accNum, function(calendarList) {
		var x = 0;
		calendarList.items.forEach(function(calendar, calNum) {
			getScopePagination(calendarUrl +"/calendars/" +encodeURIComponent(calendar.id) +"/events" 
			+"?maxResults=2500" +"&showDeleted=true", "&access_token=", accNum, function(calEvents) {
				calendarList.items[calNum].calEvents = calEvents;
				x++;
				if (x == calendarList.items.length) {
					data.accounts[accNum].calendarList = calendarList;
					saveData(function() {
						createUser(data.accounts[accNum], accNum);
					});
				}
			});		
		});
	});
}

//function syncCalendar()

function deleteAccount(id, callback) {
	data.accounts.forEach(function(account, accNum) {
		if (account.id == id) {
			getScope(revokeUrl, "?token=", accNum, function() {
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
function getScope(scope, tokenType, accNum, callback) {
	if (data.accounts[accNum].tokenExpiration > Date.now()) {
		getToken(data.accounts[accNum].id, function(promise) {
			data.accounts[accNum].token = promise.substring(promise.indexOf("#access_token=") +14, promise.indexOf("&token_type="));
			data.accounts[accNum].tokenExpiration = Date.now() +promise.substring(promise.indexOf("&expires_in=") +12)*1000-60000;
			saveData();
			useToken(scope, tokenType, data.accounts[accNum].token, callback);
		});
	}
	else {
		useToken(scope, tokenType, data.accounts[accNum].token, callback);
	}
}

function getScopePagination(scope, tokenType, accNum, callback, calEvents, pageToken) {
	if (!pageToken) {
		pageToken = "";
	}
	getScope(scope +pageToken, tokenType, accNum, function(newCalEvents) {
		if (calEvents) {
			newCalEvents.items = newCalEvents.items.concat(calEvents.items);
		}
		if (!newCalEvents.nextPageToken) {
			callback(newCalEvents);
		}
		else {
			getScopePagination(scope, tokenType, accNum, callback, newCalEvents, "&pageToken=" +encodeURIComponent(newCalEvents.nextPageToken));
		}
	});
}

function useToken(scope, tokenType, token, callback) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				callback(JSON.parse(this.responseText));
			}
			if (this.status == 400 || this.status == 401) {
				console.log("access revoked");
			}
		}
	};

	request.open("GET", scope +tokenType +encodeURIComponent(token), true);
	request.send();
}

function getToken(userId, callback) {
	chrome.identity.launchWebAuthFlow({"url": oauthUrl +"&login_hint=" +userId, "interactive": false}, function(promise) {
		if (chrome.runtime.lastError) {
			console.log(chrome.runtime.lastError.message);
		}
		else {
			callback(promise);
		}
	});
}
