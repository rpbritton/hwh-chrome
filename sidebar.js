var sidebarButtons = document.getElementsByClassName('sidebar-button');
for (var x = 0; x < sidebarButtons.length; x++) {
	sidebarButtons[x].addEventListener("mousedown", function(ev) { inkAnimation(ev, this, "#b8b8b8"); });
	sidebarButtons[x].addEventListener("mouseover", function(ev) {
		this.firstElementChild.firstElementChild.style.fill = "#f8f8f8";
	});
	
	sidebarButtons[x].addEventListener("mouseleave", function() {
		this.firstElementChild.firstElementChild.style.fill = "";
	});
}

