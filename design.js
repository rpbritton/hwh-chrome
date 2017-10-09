function createToggleSwitch(color, on, callback) {
	var toggleSwitch = document.createElement("div");
	toggleSwitch.className = "design-toggle-switch";
	toggleSwitch.addEventListener("click", function(ev) {
		if (!toggleSwitch.classList.contains("design-toggle-on")) {
			toggleSwitch.classList.add("design-toggle-on");
			on(true);
			if (color) {
				toggleTrack.style.backgroundColor = color;
				toggleThumb.style.backgroundColor = color;
			}
		}
		else {
			toggleSwitch.classList.remove("design-toggle-on");
			on(false);
			if (color) {
				toggleTrack.style.backgroundColor = "";
				toggleThumb.style.backgroundColor = "";
			}
		}
	});
/*	toggleSwitch.addEventListener("mousedown", function(ev) {
		toggleThumb.classList.add("design-selector-on");
	});
	toggleSwitch.addEventListener("mouseup", function(ev) {
		toggleThumb.classList.remove("design-selector-on");
	});
	toggleSwitch.addEventListener("mouseleave", function(ev) {
		toggleThumb.classList.remove("design-selector-on");
	});
*/
	var toggleTrack = document.createElement("div");
	toggleTrack.className = "design-toggle-track";
	toggleSwitch.appendChild(toggleTrack);

	var toggleThumb = document.createElement("div");
	toggleThumb.className = "design-toggle-thumb design-selector";
	toggleTrack.appendChild(toggleThumb);

	callback(toggleSwitch);
}
