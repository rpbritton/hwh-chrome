function inkAnimation(ev, el, color) {	
	var longDim = Math.sqrt(Math.pow(el.offsetWidth *2, 2) +Math.pow(el.offsetHeight *2, 2));

	var ink = document.createElement("div");
	ink.setAttribute("class", "ink");
	ink.style.width = longDim +"px";
	ink.style.height = longDim +"px";
	ink.style.left = (ev.clientX -el.getBoundingClientRect().left -longDim /2) +"px";
	ink.style.top = (ev.clientY -el.getBoundingClientRect().top -longDim /2) +"px";

	ink.style.backgroundColor = color;

	setTimeout(function() {
		ink.style.transform = "scale(1)";
	}, 0);

	el.addEventListener("mouseup", function() { inkAnimationEnd(ink); });
	el.addEventListener("mouseleave", function() { inkAnimationEnd(ink); });

	el.appendChild(ink);
}

function inkAnimationEnd(ink) {
	setTimeout(function() {
		ink.style.opacity = "0";
	}, 0);

	setTimeout(function() {
		ink.remove();
	}, 400);
}
