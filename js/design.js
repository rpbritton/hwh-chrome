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
			//	toggleSelect.style.backgroundColor = color;
			}
		}
		else {
			toggleSwitch.classList.remove("design-toggle-on");
			on(false);
			if (color) {
				toggleTrack.style.backgroundColor = "";
				toggleThumb.style.backgroundColor = "";
			//	toggleSelect.style.backgroundColor = colors.searchSel;
			}
		}
	});
	toggleSwitch.addEventListener("mousedown", function(ev) {
		if (!toggleSwitch.classList.contains("design-toggle-on")) {
			toggleSelectOff.classList.add("design-select-on");
		}
		else {
			toggleSelectOn.classList.add("design-select-on");
		}
	});
	toggleSwitch.addEventListener("mouseup", function(ev) {
		if (!toggleSwitch.classList.contains("design-toggle-on")) {
			toggleSelectOff.classList.remove("design-select-on");
		}
		else {
			toggleSelectOn.classList.remove("design-select-on");
		}
	});
	toggleSwitch.addEventListener("mouseleave", function(ev) {
		if (!toggleSwitch.classList.contains("design-toggle-on")) {
			toggleSelectOff.classList.remove("design-select-on");
		}
		else {
			toggleSelectOn.classList.remove("design-select-on");
		}
	});

	var toggleTrack = document.createElement("div");
	toggleTrack.className = "design-toggle-track";
	toggleSwitch.appendChild(toggleTrack);

	var toggleSelectOff = document.createElement("div");
	toggleSelectOff.className = "design-select";
	toggleTrack.appendChild(toggleSelectOff);

	var toggleSelectOn = document.createElement("div");
	toggleSelectOn.className = "design-select";
	if (color) {
		toggleSelectOn.style.backgroundColor = color;
	}
	else {
		toggleSelectOn.style.backgroundColor = "var(--highlight-color)";
	}
	toggleSelectOn.style.left = "2px";
	toggleTrack.appendChild(toggleSelectOn);

	var toggleThumb = document.createElement("div");
	toggleThumb.className = "design-toggle-thumb design-selector";
	toggleTrack.appendChild(toggleThumb);

	callback(toggleSwitch);
}
