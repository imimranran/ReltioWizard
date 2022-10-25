let gsBtn = document.getElementById('gs-btn');
let accelNextBtn = document.getElementById('accel-next');
let objNextBtn = document.getElementById('obj-next');


let accelScreen = document.getElementById('accel-select');
let gsScreen = document.getElementById('gs');
let objScreen = document.getElementById('obj-select');


let accelerator = "none";
let token = "";
let currUser = "";

gsBtn.addEventListener("click", evt => {
    gsScreen.style.display = "none";
    accelScreen.style.display = "block";
});

accelNextBtn.addEventListener("click", evt => {
	let selected = document.querySelector('#accel-val');
	accelerator = selected.value;
    accelScreen.style.display = "none";
    objScreen.style.display = "block";
});

objNextBtn.addEventListener("click", evt => {
	let selected = document.querySelector('#accel-val');
	accelerator = selected.value;
    objScreen.style.display = "none";
});


var dialog = document.getElementById('login-dialog');
var showModalButton = document.getElementById('login-btn');
var closeModal = document.getElementById('login-cancel');
var loginBtn = document.getElementById('login-submit');

if (! dialog.showModal) {
  dialogPolyfill.registerDialog(dialog);
}

showModalButton.addEventListener('click', function() {
  dialog.showModal();
});

closeModal.addEventListener('click', function() {
  dialog.close();
});

loginBtn.addEventListener('click', function() {
	let user = document.getElementById("user");
	let pw = document.getElementById("pw");
	let msg = document.getElementById("login-msg");
	let res = "";
	var xhr = new XMLHttpRequest();
	var resJSON = '';
	xhr.withCredentials = true;
	xhr.open("POST", "https://auth.reltio.com/oauth/token?grant_type=password&username=" + user.value + "&password=" + pw.value);
	xhr.setRequestHeader("Authorization", "Basic cmVsdGlvX3VpOm1ha2l0YQ==");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			res = JSON.parse(this.responseText);
			token = res["access_token"];
			showModalButton.innerHTML = token;
			dialog.close();
		} else {
			msg.innerHTML = "Invalid login attempt. Please try again.";
			document.getElementById("user-div").className += "is-invalid";
			document.getElementById("pw-div").className += "is-invalid";
		}
	}
	xhr.send();
});