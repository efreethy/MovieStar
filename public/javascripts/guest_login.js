// This script installs a click listener on the log in button, and appends guest login
// information to the form fields based on the chosen guest, and finally submits form for login

$("#submit-btn" ).click(function() {
  var username = $("#users").val();
  $("#user").val(username);
  var selectedGuest = GUESTS.filter(function (guest) {
    return guest.username === username;
  })[0];
  $("#password").val(selectedGuest.password);

  $("#submit").click();
});

var GUESTS = [
  {username: 'NikolaTesla', password: 'inductionmotor' },
  {username: 'AlanTuring', password: 'turingtest' },
  {username: 'IsaacNewton', password: 'gravitation' },
  {username: 'JamesMaxwell', password: 'electromagnetism' }
];
