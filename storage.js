function getData(callback) {
	chrome.storage.local.get(function(data) {
		callback(data);
	});
}

function saveData(callback) {
	chrome.storage.local.set(data, function() {
		callback();
	});
}
