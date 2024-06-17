var currentTab = 0; 
var currentSubTab = 0; 
var expensesReported = {}; // Object to hold user input
var currentIndex = 0; 

// Form Scripts

// Function to open the form initially
function startForm(){
	document.getElementById("reportButton").style.display = "none";
	document.getElementById("formInstructions").style.display = "none";
	document.getElementById("instructionsButton").style.display = "block";
	document.getElementById("navButtons").style.display = "block";
	
	showTab(currentTab); // Show the first tab of the form
}

// Function to show the active tab of the form, update navigation buttons as necessary
function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.visibility = "hidden";
  } else {
    document.getElementById("prevBtn").style.visibility = "visible";

    // document.getElementById("prevBtn").style.display = "inline-block";
  }
  
  if (n == 2){
	if ((currentIndex >= 0) && (currentIndex < expensesReported.expenseType.length)){
		showLoopedExpenses(currentIndex);
	}
  }
  
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Next";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
}

// Function to update the looped tabs with the appropriate expense name
function showLoopedExpenses(n){
	var expenseType = expensesReported.expenseType[n];
	document.getElementById("expenseType").innerHTML = expenseType;
	
}

// Function to change the current tab of the form
function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1){
	   if (validateForm()) {
			saveResults(currentTab);
		} else {
		   return false;
	   }
  }else{
		if ((currentTab + n) == 2){
			var maxIndex = (expensesReported.expenseType.length - 1);
			currentIndex = maxIndex;
			
			// window.alert(currentIndex + ", " + maxIndex);
		}
	}
  if (currentTab == 2){
	  var maxIndex = expensesReported.expenseType.length;
	  if (currentIndex < maxIndex){
		  currentIndex += n;
			
			// window.alert(currentIndex + ", " + maxIndex)
		  if ((currentIndex < 0) || (currentIndex >= maxIndex)){
				// window.alert(currentIndex + ", " + maxIndex)
			  // reset currentIndex
			  currentIndex = 0;
			  // Hide the current tab:
			  x[currentTab].style.display = "none";
			  // Increase or decrease the current tab by 1:
			  currentTab += n;
			  if (currentIndex < 0){
				  currentIndex = 0;
				  currentTab += n;
			  }
		  }  
	  }
  }else{
		  // Hide the current tab:
		  x[currentTab].style.display = "none";
		  // Increase or decrease the current tab by 1:
		  currentTab = currentTab + n;
		  /* if ((currentTab == 2) && (n == -1)) currentIndex = maxIndex-1; */
		  // if you have reached the end of the form... :
	  }
  if (currentTab >= x.length){
    //...the form input is processed:
    displayUserInput();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
	if (/* (n == -1) && */ (currentTab == 2)){
		recallResults();
	}
}

// Function to show or hide the "Other" text box as appropriate, based on whether it is selected
function toggleOtherInput(inputObject){
	var otherInputBox = document.getElementById("otherType");
	if ((inputObject.id == "type19") && ( inputObject.checked)){
		otherInputBox.style.visibility = "visible";
	} else otherInputBox.style.visibility = "hidden";
}

// Function to reacll results from the object holding the user's input. Allows user to move backward through the looped tab.
function recallResults(){
	var currentTabObj = document.getElementsByClassName("tab")[currentTab];
	var inputs = currentTabObj.getElementsByTagName("input");
	for (x of inputs){
		if (expensesReported[x.name] != undefined){
			if (expensesReported[x.name][currentIndex] != undefined){
				x.value = expensesReported[x.name][currentIndex];
			}
		}
	}
}

// Function to save the user's input to the object created to hold them.
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
			}
		} else if (x.type == "checkbox"){
			if (x.checked){
				if (index == 0) userInput[x.name] = [];
				userInput[x.name][index] = x.value;
				if (x.id == "type19"){
					var otherText = document.getElementById("otherType").value;
					if (otherText != "") userInput[x.name][index] += (" (" + otherText + ")");
				}
				index++;
			}
		} else {
			if ( x.value != ""){
				if (x.name != "otherType"){
					userInput[x.name] = {};
					// window.alert(currentIndex);
					// window.alert(x.name);
					userInput[x.name] = x.value;
					// window.alert(userInput[x.name]);
					x.value = "";
				}
			}
		}
	}
	var keys = Object.keys(userInput);
	for (key of keys){
		if (currentTab != 2){
			expensesReported[key] = userInput[key];
		} else{
			if (expensesReported[key] == undefined){
				expensesReported[key] = [];
			}
			expensesReported[key][currentIndex] = userInput[key];
		}
		// window.alert(expensesReported[key]);
	};
}

function validateForm(){
  // This function deals with validation of the form fields
	var current = document.getElementsByClassName("tab")[currentTab];
	var valid = false;
	var inputs = current.getElementsByTagName("input");

	if (currentTab < 2){
		if (currentTab == 0){
			for (x of inputs) {
				if (x.checked) {
					valid = true;
				}
				// window.alert(valid);
			}
			if (!valid) displayModal("<p>Please select an option.</p>");
		} else{
			var otherSelected = false;
			for (x of inputs){
				if (x.type =="checkbox"){
					if (x.id == "type19"){
						if ((x.checked)){
							if (inputs[inputs.length - 1].value != ""){
								valid = true;
							} else {
								valid = false;
								otherSelected = true;
							}
						}
					} else if (x.checked){
						valid = true;
					}
				}
			}
			if (!valid){
				if (otherSelected){
					displayModal("<p>Please enter a value for 'Other'</p>");
				} else{
					displayModal("<p>Please select at least one option.</p>");
				}
			}
		}		
	} else if (currentTab == 2){
		var emptyFields = [];
		var fieldIndex = 0;
		for (x of inputs){
			if (x.value == ""){
				emptyFields[fieldIndex] = x.name;
				fieldIndex++;
			}
		}
		if (emptyFields.length == 0){
			valid = true;
		} else{
			var modalText = "<p>Please enter ";
			if (emptyFields.length > 1){
				modalText += "values for ";
			}else{
				modalText += "a value for "
			}
			for (i = 0; i < emptyFields.length; i++) {
				if (emptyFields[i] == "expenseCost") modalText += "the amount spent";
				else{
					if (i == 1){
						modalText += " and ";
					}
					if (emptyFields[i] == "expensePaidTo") modalText += "who that amount was paid to";
				}
			}
			modalText += ".</p>";
			displayModal(modalText);
		}
		
	} else if(currentTab == 3){
		var compReceived = document.getElementById("compYes").checked;
			if(compReceived){
				var emptyFields = [];
				var fieldIndex = 0;
				for (x of inputs){
					if (x.value == ""){
						emptyFields[fieldIndex] = x.name;
						fieldIndex++;
					}
				}
				if (emptyFields.length == 0){
					valid = true;
				} else{
					var modalText = "<p>Please enter ";
					if (emptyFields.length > 1){
						modalText += "values for ";
					}else{
						modalText += "a value for "
					}
					for (i = 0; i < emptyFields.length; i++) {
						if (emptyFields[i] == "compAmt") modalText += "the amount received";
						else{
							if (i > 0){
								if (i == (emptyFields.length - 1)) modalText += " and ";
								else modalText += ", ";
							}
							if (emptyFields[i] == "compFrom") modalText += "who that amount was paid by";
							else if (emptyFields[i] == "compMethod") modalText += "the type of payment";
							else if (emptyFields[i] == "compNumber") modalText += "the payment number";
							else if (emptyFields[i] == "compType") modalText += "the type of payment received";
						}
					}
					modalText += ".</p>";
					displayModal(modalText);
				}
			}else valid = true;
	}
	return valid; // return the valid status
}

function displayCompensation(){
	var updateTab = document.getElementById("compTab");
	if (updateTab.style.display == "block"){
		updateTab.style.display = "none";
	} else updateTab.style.display = "block";
		
}



function displayUserInput(){
	var showTarget = document.getElementById("reportingResults");
	var target = document.getElementById("userResults");
	var keys = Object.keys(expensesReported);
	document.getElementById("reportingForm").style.display = "none";
	target.innerHTML += ("<dl>");
	for (key of keys){
		var inputName; 
		if (key == "incurredExpenses"){
			inputName = "Expenses incurred?";
		} else if (key == "expenseType") {
			inputName = "Type of expense:";
		} else if (key == "expenseCost") {
			inputName = "Cost:";
		} else if (key == "expensePaidTo") {
			inputName = "Paid to:";
		} else if (key == "compensationReceived") {
			inputName = "Compensation received?";
		} else if (key == "compAmt") {
			inputName = "Amount of compensation";
		} else if (key == "compFrom") {
			inputName = "Compensated by:";
		} else if (key == "compMethod") {
			inputName = "Method of compensation";
		} else if (key == "compNumber") {
			inputName = "Payment number";
		} else if (key == "compType") {
			inputName = "Type of compensation:";
		} else {
			inputName = key;
		}
		target.innerHTML += ("<dt>" + inputName + "</dt><dd>" + expensesReported[key] + "</dd>" + "<br>");
	}
	target.innerHTML += ("</dl>");
	
	showTarget.style.display = "block";		
}
