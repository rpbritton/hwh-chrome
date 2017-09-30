var search = document.getElementById("search");
search.addEventListener("mousedown", function(ev) {
	inkAnimation(ev, this, "#b8b8b8");
});

var searchBox = document.getElementById("search-box");
searchBox.addEventListener("focus", function(ev) {
	searchIcon.style.color = "#b8b8b8";
});
searchBox.addEventListener("focusout", function(ev) {
	if (!searchBox.value) {
		searchIcon.style.color = "";
	}
});

searchBox.addEventListener("input", function(ev) {
	if (searchBox.value.substring(searchBox.value.length-1) == "\n") {
		searchBox.value = searchBox.value.substring(0, searchBox.value.length-1);
	}
	if (!searchBox.value) {
		searchClear.style.opacity = "";
	}
	else {
		searchClear.style.opacity = "1";
	}
});

var searchIcon = document.getElementById("search-icon");
search.addEventListener("click", function(ev) {
	searchBox.focus();
});

var searchClear = document.getElementById("search-clear");
searchClear.addEventListener("click", function(ev) {
	searchBox.value = "";
	searchClear.style.opacity = "";
});
