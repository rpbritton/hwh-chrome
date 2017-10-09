var users = [];
var usersWrapper = document.getElementById("users-wrapper");
function createUser(account, accNum, callback) {
	var userWrapper = document.createElement("div");
	userWrapper.className = "user-wrapper";
//	usersWrapper.appendChild(userWrapper);

	var userInfo = document.createElement("div");
	userInfo.className = "user-info";
	userWrapper.appendChild(userInfo);

	var userImage = document.createElement("div");
	userImage.className = "user-img";
	userImage.style.backgroundImage = "url(" +account.picture +")";
	userInfo.appendChild(userImage);

	var userName = document.createElement("div");
	userName.className = "user-name user-text";
	userName.innerHTML = account.name;
	userInfo.appendChild(userName);

	var userEmail = document.createElement("div");
	userEmail.className = "user-email user-text";
	userEmail.innerHTML = account.email;
	userInfo.appendChild(userEmail);

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
		deleteAccount(account.id);/*function() {
			userWrapper.style.opacity = "";
			userWrapper.style.height = "";
			userWrapper.addEventListener("transitionend", function(ev) {
				userWrapper.remove();
			});
		});*/
	});
	userInfo.appendChild(userClear);

//	var userCalendarsWrapper = document.createElement("div");
//	userCalendarsWrapper.className = "user-calendars-wrapper";
	var x = 0;
	account.calendarList.items.forEach(function(calendar, calNum) {
		createUserCalendar(calendar, calNum, function(userCalendarWrapper) {
			userWrapper.appendChild(userCalendarWrapper);
			x++;
			if (x == account.calendarList.items.length) {
				callback(userWrapper);
			}
		});
	});
}

function createUserCalendar(calendar, calNum, callback) {
	var userCalendarWrapper = document.createElement("div");
	userCalendarWrapper.className = "user-calendar-wrapper";
	
	var userCalendarToggle = document.createElement("label");
	userCalendarToggle.className = "user-calendar-toggle design-toggle-switch";
//	userCalendarToggle.innerHTML = ""
//		+'<input type="checkbox">'
//		+'<div></div>';
	var userCalendarToggleCheckbox = document.createElement("input");
	userCalendarToggleCheckbox.type = "checkbox";
	userCalendarToggle.appendChild(userCalendarToggleCheckbox);
	var userCalendarToggleDiv = document.createElement("div");
	userCalendarToggle.appendChild(userCalendarToggleDiv);
/*	userCalendarToggleDiv.addEventListener("mousedown", function(ev) {
		inkAnimation(ev, this, this, colors.ink);
	});*/
/*	sidebarButtons[x].addEventListener("click", function(ev) {
        if (this.id.substring(8) !== "refresh") {
            selectPage(document.getElementById("page-" +this.id.substring(8)));
        }
    });
*/	userCalendarWrapper.appendChild(userCalendarToggle);

	var userCalendarSummary = document.createElement("span");
	userCalendarSummary.className = "user-calendar-summary";
	userCalendarSummary.innerHTML = calendar.summary;
	userCalendarWrapper.appendChild(userCalendarSummary);

	callback(userCalendarWrapper);
}

function addUser(userNum) {
	usersWrapper.appendChild(users[userNum]);
 	users[userNum].getElementsByClassName("user-info")[0].focus();
	users[userNum].getElementsByClassName("user-info")[0].style.opacity = "1";
	users[userNum].getElementsByClassName("user-info")[0].style.height = "68px";
	[].forEach.call(users[userNum].getElementsByClassName("user-calendar-wrapper"), function(calendarWrapper, calNum) {
		calendarWrapper.style.opacity = "1";
//		calendarWrapper.style.height = "30px";
	});
}

function deleteUser(userNum) {
	setTimeout(function() {
		usersWrapper.removeChild(users[userNum]);
		users.splice(userNum, 1);
		console.log(users);
	}, 400);
	users[userNum].style.opacity = "";
	users[userNum].style.height = "";
}

var userAdd = document.getElementById("user-add");
userAdd.addEventListener("mousedown", function(ev) {
	inkAnimation(ev, this, this, colors.ink);
});
userAdd.addEventListener("click", function(ev) {
	addAccount();
});
