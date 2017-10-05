var pageUser = document.getElementById("page-user");
//var usersWrapper = document.getElementById("users-wrapper");
//var usersWrapperHeight = 0;
function createUser(account, accNum) {
	var userWrapper = document.createElement("div");
	userWrapper.className = "user-wrapper";
	userWrapper.style.top = (accNum*68) +"px";
//	usersWrapperHeight += 68;
//	usersWrapper.style.height = usersWrapperHeight +"px";
//	usersWrapper.appendChild(userWrapper);
	pageUser.appendChild(userWrapper);

	var userImage = document.createElement("div");
	userImage.className = "user-img";
	userImage.style.backgroundImage = "url(" +account.picture +")";
	userWrapper.appendChild(userImage);

	var userName = document.createElement("div");
	userName.className = "user-name user-text";
	userName.innerHTML = account.name;
	userWrapper.appendChild(userName);

	var userClear = document.createElement("div");
	userClear.className = "user-clear design-clear";
	userClear.innerHTML = ""
		+'<svg viewBox="0 0 24 24">'
			+'<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>'
			+'<path d="M0 0h24v24H0z" fill="none"/>'
		+'</svg>';
	userClear.addEventListener("mousedown", function(ev) {
		inkAnimation(ev, this.parentElement, colors.remove);
	});
	userClear.addEventListener("click", function(ev) {
		deleteAccount(account, function() {
			userWrapper.remove();
//			usersWrapperHeight -= 68;
//			usersWrapper.style.height = usersWrapperHeight +"px";
		});
	});
	userWrapper.appendChild(userClear);

	var userEmail = document.createElement("div");
	userEmail.className = "user-email user-text";
	userEmail.innerHTML = account.email;
	userWrapper.appendChild(userEmail);
}
/*
var userClear = document.getElementById("user-clear");
userClear.addEventListener("click", function(ev) {
	console.log("clear");
});*/

var userAdd = document.getElementById("user-add");
userAdd.addEventListener("mousedown", function(ev) {
	inkAnimation(ev, this, colors.ink);
});
userAdd.addEventListener("click", function(ev) {
	addAccount();
});
