function getData(callback) {
	chrome.storage.local.get(function(storage) {
		callback(storage);
	});
}

function saveData() {
	chrome.storage.local.set(data);
}

function clearData() {
	chrome.storage.local.clear();
}
