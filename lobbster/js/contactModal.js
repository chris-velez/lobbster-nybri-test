//js for contact & submit//

var contactModal = document.getElementById("contactModal");

function showContactModal() {
  var modal = document.getElementById("contactModal");
  modal.style.display = "block";
}

function closeContactModal() {
  var modal = document.getElementById("contactModal");
  modal.style.display = "none";
}

window.onclick = function (event) {
  var contactModal = document.getElementById("contactModal");
  var instructionModal = document.getElementById("modalInstructions");
  var popUpModal = document.getElementById("modalPopUp");

  if (event.target == contactModal) {
    contactModal.style.display = "none";
  }
  if (event.target == instructionModal) {
    instructionModal.style.display = "none";
  }
  if (event.target == popUpModal) {
    popUpModal.style.display = "none";
  }
};
