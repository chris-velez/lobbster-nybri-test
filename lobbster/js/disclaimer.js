function checkDisclaimer(){
	var disclaimer = checkCookie("disclaimer");
	if (disclaimer != "accepted") showDisclaimer();
}


function setCookie(cookieName, cookieValue, expiresMinutes) {
  var expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + (expiresMinutes*(60*1000)));
  var expires = "expires="+ expirationDate.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(cookieLabel) {
  var cookieValue = getCookie(cookieLabel);
  if (cookieValue != "") {
   return cookieValue;
  } else return "";
}

function showDisclaimer(){
	var modal = document.getElementById("modalDisclaimer");
	var pageBody = document.getElementsByTagName("body")[0];
	modal.style.display = "block";
	// pageBody.style.height = "100vh";
	pageBody.style.overflow = "hidden";
}

function acceptDisclaimer(){
	setCookie("disclaimer", "accepted", 1440);
	var pageBody = document.getElementsByTagName("body")[0];
	var modal = document.getElementById("modalDisclaimer");
	modal.style.display = "none";
	document.getElementsByTagName("body")[0].style.overflow = "initial";
}