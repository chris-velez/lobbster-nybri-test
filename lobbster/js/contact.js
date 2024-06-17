var messageSuccess = [];

$(document).ready(function () {
  // process the form
  $("#formcontact").submit(function (event) {
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
    // get the form data
    var formData = {
      fname: $("input[name=fname]").val(),
      lname: $("input[name=lname]").val(),
      email: $("input[name=email]").val(),
      message: $("textarea[name=message]").val(),
    };
    //change and disable the button while message is sent
    $("input[name=submitContact]").prop("disabled", true);
    $("input[name=submitContact]").prop("value", "Sending...");
    displayModal(
      "<p>The contact form will close automatically once the message has sent</p>"
    );
    // process the form
    $.ajax({
      type: "POST", // define the type of HTTP verb we want to use (POST for our form)
      url: "mail.php", // the url where we want to POST
      data: formData, // our data object
      dataType: "json", // what type of data do we expect back from the server
      encode: true,
    }).done(function (data) {
      //once the submission is complete
      // log data to the console so we can see
      // console.log(data);
      displayModal("<p>" + data["message"] + "</p>");
      if (data["success"] == false) {
        $("input[name=submitContact]").prop("disabled", false);
      } else {
        closeContactModal();
      }

      // here we will handle errors and validation messages
    });
    $("input[name=submitContact]").prop("disabled", true);
    $("input[name=submitContact]").prop("value", "Sending...");
  });
});
