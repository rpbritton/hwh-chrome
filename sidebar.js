var sidebarButtons = document.getElementsByClassName("sidebar-button");
var selectedButton = sidebarButtons[1];		// default selected button
selectButton(selectedButton);

for (var x = 0; x < sidebarButtons.length; x++) {
	sidebarButtons[x].addEventListener("mousedown", function(ev) {
		inkAnimation(ev, this, "#b8b8b8");
	});

	sidebarButtons[x].addEventListener("click", function(ev) {
		selectButton(this);
	});
}

function selectButton(el) {
	selectedButton.firstElementChild.style.color = "#b8b8b8";
	selectedButton = el;

	document.getElementById("sidebar-selected").style.top = el.offsetTop +"px";
	el.firstElementChild.style.color = "#f8f8f8";
}

document.getElementById("sidebar").style.transform = "translate(0, 0)";
