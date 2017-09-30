var sidebarButtons = document.getElementsByClassName("sidebar-button");
var selectedPage;
selectPage(document.getElementById("page-" +sidebarButtons[1].id.substring(8)));	// default selected button

for (var x = 0; x < sidebarButtons.length; x++) {
	sidebarButtons[x].addEventListener("mousedown", function(ev) {
		inkAnimation(ev, this, "#b8b8b8");
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
			selectedButton.firstElementChild.style.color = "#b8b8b8";
		}
		selectedPage = el;
		selectedPage.classList.remove("page-hide");

		selectedButton = document.getElementById("sidebar-" +selectedPage.id.substring(5));
		document.getElementById("sidebar-selected").style.top = selectedButton.offsetTop +"px";
		selectedButton.firstElementChild.style.color = "#f8f8f8";
	}
	
/*	switch(el.id) {
		case "sidebar-user": 
			break;
		case "sidebar-tasks":
			break;
		case "sidebar-add":
			break;
		case "sidebar-done":
			break;
		case "sidebar-refresh":
			break;
		case "sidebar-settings":
			break;
	}*/

	
}

document.getElementById("sidebar").style.transform = "translate(0, 0)";
