function getData(callback) {
	chrome.storage.local.get(function(data) {
		callback(data);
	});
}

function saveData(data) {
	chrome.storage.local.set(data);
}

var data;
getData(function(storage) {
	data = storage;
});
