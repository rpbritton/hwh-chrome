var usersWrapper = document.getElementById("users-wrapper");
function createUser(account, callback) {
	var userWrapper = document.createElement("div");
	userWrapper.className = "user-wrapper";
	usersWrapper.appendChild(userWrapper);

	var userImage = document.createElement("div");
	userImage.className = "user-img";
	userImage.style.backgroundImage = "url(" +account.picture +")";
	userWrapper.appendChild(userImage);

	var userName = document.createElement("div");
	userName.className = "user-name user-text";
	userName.innerHTML = account.name;
	userWrapper.appendChild(userName);

	var userEmail = document.createElement("div");
	userEmail.className = "user-email user-text";
	userEmail.innerHTML = account.email;
	userWrapper.appendChild(userEmail);

	var userClear = document.createElement("div");
	userClear.className = "user-clear design-clear";
	userClear.innerHTML = ""
		+'<svg viewBox="0 0 24 24">'
			+'<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>'
			+'<path d="M0 0h24v24H0z" fill="none"/>'
		+'</svg>'
		+'<span class="design-tooltip">remove user</span>';
	userClear.addEventListener("mousedown", function(ev) {
		inkAnimation(ev, this.parentElement, this, colors.remove);
	});
	userClear.addEventListener("click", function(ev) {
		deleteAccount(account.id, function() {
			userWrapper.style.opacity = "";
			userWrapper.style.height = "";
			setTimeout(function() {
				userWrapper.remove();
			}, 400);
		});
	});

//	account.

	userWrapper.appendChild(userClear);
 	userWrapper.focus();
	userWrapper.style.opacity = "1";
	userWrapper.style.height = "68px";
}

var userAdd = document.getElementById("user-add");
userAdd.addEventListener("mousedown", function(ev) {
	inkAnimation(ev, this, this, colors.ink);
});
userAdd.addEventListener("click", function(ev) {
	addAccount();
});
