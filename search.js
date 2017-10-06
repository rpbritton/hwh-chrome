var search = document.getElementById("search");

var searchBox = document.getElementById("search-box");
searchBox.addEventListener("focus", function(ev) {
	searchIcon.style.fill = colors.searchSel;
});
searchBox.addEventListener("focusout", function(ev) {
	if (!searchBox.value) {
		searchIcon.style.fill = "";
	}
});
searchBox.addEventListener("mousedown", function(ev) {
	inkAnimation(ev, this.parentElement, this.parentElement, colors.ink);
});

searchBox.addEventListener("input", function(ev) {
	if (searchBox.value.substring(searchBox.value.length-1) == "\n") {
		searchBox.value = searchBox.value.substring(0, searchBox.value.length-1);
	}
	if (!searchBox.value) {
		searchClear.style.cursor = "text";
		searchClear.style.opacity = "0";
	}
	else {
		searchClear.style.cursor = "";
		searchClear.style.opacity = "";
	}
});

var searchIcon = document.getElementById("search-icon");
search.addEventListener("click", function(ev) {
	searchBox.focus();
});
searchIcon.addEventListener("mousedown", function(ev) {
	inkAnimation(ev, this.parentElement, this.parentElement, colors.ink);
});

var searchClear = document.getElementById("search-clear");
searchClear.style.cursor = "text";
searchClear.style.opacity = "0";
searchClear.addEventListener("click", function(ev) {
	searchBox.value = "";
	searchClear.style.cursor = "text";
	searchClear.style.opacity = "0";
});
searchClear.addEventListener("mousedown", function(ev) {
	if (searchBox.value) {
		inkAnimation(ev, this.parentElement, this, colors.remove);
	}
	else {
		inkAnimation(ev, this.parentElement, this.parentElement, colors.ink);
	}
});
