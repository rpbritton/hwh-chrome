function getData(callback) {
	chrome.storage.local.get(function(storage) {
		callback(storage);
	});
}

function saveData(data) {
	console.log(data);
	chrome.storage.local.set(data);
}

function clearData() {
	chrome.storage.local.clear();
}
