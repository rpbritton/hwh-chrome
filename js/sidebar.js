var sidebarButtons = document.getElementsByClassName("sidebar-button");
var selectedPage;
selectPage(document.getElementById("page-" +sidebarButtons[0].id.substring(8)));	// default selected button

for (var x = 0; x < sidebarButtons.length; x++) {
	sidebarButtons[x].addEventListener("mousedown", function(ev) {
		inkAnimation(ev, this, this, colors.ink);
	});
	sidebarButtons[x].addEventListener("click", function(ev) {
		if (this.id.substring(8) !== "refresh") {
			selectPage(document.getElementById("page-" +this.id.substring(8)));
		}
	});
}

function selectPage(el) {
	if (el != selectedPage) {
		if (selectedPage) {
			selectedPage.classList.add("page-hide");
			selectedButton.firstElementChild.style.color = "";
		}
		selectedPage = el;
		selectedPage.classList.remove("page-hide");

		selectedButton = document.getElementById("sidebar-" +selectedPage.id.substring(5));
		document.getElementById("sidebar-selected").style.top = selectedButton.offsetTop +"px";
		selectedButton.firstElementChild.style.color = colors.bg;
	}
}

document.getElementById("sidebar").style.transform = "translate(0, 0)";
