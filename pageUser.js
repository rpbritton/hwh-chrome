/*
chrome.identity.getAuthToken({"interactive": true}, function(oauth2Token) {
	console.log(oauth2Token);
//	"https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" +oauth2Token
//	chrome.identity.removeCachedAuthToken({ token: oauth2Token }, function() {
//		console.log("token removed");
//	});
//	"https://accounts.google.com/o/oauth2/revoke?token=" +oauth2Token
});
//*/
//console.log(chrome.identity.getRedirectURL());
/*
// Using chrome.identity
var manifest = chrome.runtime.getManifest();

var clientId = encodeURIComponent(manifest.oauth2.client_id);
var scopes = encodeURIComponent(manifest.oauth2.scopes.join(' '));
var redirectUri = encodeURIComponent('https://' + chrome.runtime.id + '.chromiumapp.org');

var url = 'https://accounts.google.com/o/oauth2/auth' + 
		'?response_type=token&client_id=' + clientId
		+ '&scope=' + scopes
//		+ '&approval_prompt=force'
//		+ '&access_type=offline'
		+ '&redirect_uri=' + chrome.identity.getRedirectURL("oauth2");
console.log(url);

chrome.identity.launchWebAuthFlow({
        'url': url, 
        'interactive': true
    }, 
    function(redirectedTo) {
        if (chrome.runtime.lastError) {
            // Example: Authorization page could not be loaded.
            console.log(chrome.runtime.lastError.message);
        }
        else {
//            var response = redirectedTo.split('#', 2)[1];

            // Example: id_token=<YOUR_BELOVED_ID_TOKEN>&authuser=0&hd=<SOME.DOMAIN.PL>&session_state=<SESSION_SATE>&prompt=<PROMPT>
//            console.log(response);
		console.log(redirectedTo);
		url += '&login_hint=mr.ryan.britton@gmail.com';
		chrome.identity.launchWebAuthFlow({
			'url': url,
			'interactive': true
		},
		function(newRedirectTest) {
		console.log(newRedirectTest);
		});
//		chrome.identity.removeCachedAuthToken(redirectedTo.substring(redirectedTo.indexOf, function() {
//			console.log("token removed");
//		});
        }
    }
);
//*/


