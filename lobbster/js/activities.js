var currentTab = 0; 
var currentIndex = 0; 
var activitiesReported = [];
activitiesReported[currentIndex] = {}

function startForm(){
	document.getElementById("reportButton").style.display = "none";
	document.getElementById("formInstructions").style.display = "none";
	document.getElementById("instructionsButton").style.display = "block";
	document.getElementById("navButtons").style.display = "block";
	
	showTab(currentTab); // Show the first tab of the form
}

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.visibility = "hidden";
  } else {
    document.getElementById("prevBtn").style.visibility = "visible";
  }  
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Next";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
}

function nextPrev(n) {
 
  var x = document.getElementsByClassName("tab");
  
  if (n == 1){
	   if (!validateForm()) {
		   return false;
	   } else {
		   saveResults(currentTab); 
	   }
	}
		  x[currentTab].style.display = "none";
		  currentTab = currentTab + n;	 
	if (currentTab > 6){
	displayUserInput();
	return false;
	}
	showTab(currentTab);
}

function displayUserInput(){
	var showTarget = document.getElementById("reportingResults");
	var target = document.getElementById("userResults");
	var keys = Object.keys(activitiesReported[currentIndex]);
	document.getElementById("reportingForm").style.display = "none";
	target.innerHTML += ("<dl>");
	for (key of keys){
		var inputName; 
		if (key == "lobbyStatus"){
			inputName = "Lobbied today?";
		} else if (key == "lobbyTarget") {
			inputName = "Level of goverment lobbied:";
		} else if (key == "lobbyOfficeType") {
			inputName = "Lobbied at the office of an individual or state entity?";
		} else if (key == "lobbiedOffice") {
			inputName = "What office did you lobby?";
		} else if (key == "lobbiedIndividual") {
			inputName = "Who did you meet with?";
		} else if (key == "lobbiedFor") {
			inputName = "Lobbied for:";
		} else if (key == "lobbiedforSpecific") {
			inputName = "Specific outcome desired:";
		} else {
			inputName = key;
		}
		target.innerHTML += ("<dt>" + inputName + "</dt><dd>" + activitiesReported[currentIndex][key] + "</dd>" + "<br>");
	}
	target.innerHTML += ("</dl>");
	
	showTarget.style.display = "block";
		
}

function toggleOtherInput(inputObject){
	var otherInputBox = document.getElementById("otherType");
	if ((inputObject.id == "for_other") && ( inputObject.checked)){
		otherInputBox.style.visibility = "visible";
	} else otherInputBox.style.visibility = "hidden";
}

function saveResults(n){
	var currentTabObj = document.getElementsByClassName("tab")[n];
	var inputs = currentTabObj.getElementsByTagName("input"); 
	var userInput = {};
	var index = 0;
	for (x of inputs){
		if (x.type == "radio"){
			if (x.checked){
				userInput[x.name] = {};
				userInput[x.name] = x.value;
				if (x.id == "otherType"){
					var otherText = document.getElementById("otherType").value;
					if (otherText != "") userInput[x.name] += (" (" + otherText + ")");
				}
			} 
		} else {
			if ( x.value != ""){
				if (x.name != "otherType"){
					userInput[x.name] = {};
					userInput[x.name] = x.value;
					x.value = "";
				}
			}
		}
	}
	var keys = Object.keys(userInput);
	for (key of keys){
		activitiesReported[currentIndex][key] = userInput[key];
	};
}

function validateForm(){
	var current = document.getElementsByClassName("tab")[currentTab];
	var valid = false;
	var inputs = current.getElementsByTagName("input");
	if (currentTab < 3){
			for (x of inputs) {
				if (x.checked) {
					valid = true;
				}
			}
			if (!valid) displayModal("<p>Please select an option.</p>");
	} else if (currentTab == 3 || currentTab == 4){
		for (x of inputs){
			if (x.value != ""){
				valid = true;
			} else {
				valid = false;
			}
			if (!valid) displayModal("<p>Please fill out the details related to the lobby.</p>");
		}
	} else if (currentTab == 5){
		var otherSelected = false;
		for (x of inputs){
			if (x.id == "for_other"){
				if ((x.checked)){
					otherSelected = true;
					if (inputs[inputs.length - 1].value != ""){
						valid = true;
					} else valid = false;
				}
			} else if (x.checked){
				valid = true;
			}
		}
		if (!valid){
			if (otherSelected){
				displayModal("<p>Please fill out the details related to the lobby.</p>");
			} else{
				displayModal("<p>Please select an option.</p>");
			}
		}
	} else if (currentTab == 6){
		for (x of inputs){
			if (x.value != ""){
				valid = true;
			} else {
				valid = false;
			}
			if (!valid) displayModal("<p>Please fill out the details related to the lobby.</p>");
		}
	}	
		
	return valid; 
}
 function startExpenses(){
	 window.open("reporting_expenses.html", "_self");
 }

function displaySubmissionModal(){
	var modal = document.getElementById("submissionModal");
	modal.style.display = "block";
}

function hideSubmissionModal(){
	var modal = document.getElementById("submissionModal");
	modal.style.display = "none";
}