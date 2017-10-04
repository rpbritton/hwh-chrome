var userAdd = document.getElementById("user-add");
userAdd.addEventListener("mousedown", function(ev) {
	inkAnimation(ev, this, colors.ink);
});

userAdd.addEventListener("click", function(ev) {
	addAccount();
});

function createUser(account, x) {
	console.log(account);
}
