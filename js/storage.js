function getData(callback) {
	chrome.storage.local.get(function(storage) {
		callback(storage);
	});
}

function saveData(callback) {
	chrome.storage.local.set(data, callback);
}

function clearData() {
	chrome.storage.local.clear();
}
