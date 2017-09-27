var sidebarButtons = document.getElementsByClassName('sidebar-button');
var selectedButton = sidebarButtons[0];
selectButton(selectedButton); // default selected button

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

	document.getElementById('sidebar-selected').style.top = el.offsetTop +"px";
	el.firstElementChild.style.color = "#f8f8f8";
}
