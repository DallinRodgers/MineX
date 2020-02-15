// Get the modal
var modalNew = document.getElementById("myNewModal");
var modalFind = document.getElementById("myFindModal");

// Get the button that opens the modal
var btnNew = document.getElementById("btn-new-ship");
var btnFind = document.getElementById("btn-find-ship");

// Get the <span> element that closes the modal
var spanOne = document.getElementsByClassName("close")[0];
var spanTwo = document.getElementsByClassName("close")[1];

// When the user clicks on the button, open the modal
btnNew.onclick = function(e) {
  e.preventDefault();
  modalNew.style.display = "block";
};

// When the user clicks on the button, open the modal
btnFind.onclick = function(e) {
  e.preventDefault();
  modalFind.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
spanOne.onclick = function() {
  modalNew.style.display = "none";
};

// When the user clicks on <span> (x), close the modal
spanTwo.onclick = function() {
  modalFind.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modalFind) {
    modalFind.style.display = "none";
  } else if (event.target === modalNew) {
    modalNew.style.display = "none";
  }
};

function isFormFilled(checkThis) {
  var checkAllInput = true;
  $(checkThis).each(function() {
    if ($(this).val() === "") {
      checkAllInput = false;
    }
  });
  return checkAllInput;
}

document.querySelector("#new-submit").addEventListener("click", function(e) {
  e.preventDefault();
  var newShipForm = ".new-ship-input";
  var isSet = isFormFilled(newShipForm);
  var doPasswordsMatch = true;
  var errorMessage = document.querySelector("#errorMessageNew");

  // Capture input
  var newShip = {
    firstName: $("#input-first-name").val(),
    lastName: $("#input-last-name").val(),
    password: $("#input-password").val(),
    email: $("#input-email").val(),
    rocketName: "rocket_1",
    funds: 0
  };

  // Make sure passwords match
  if ($("#input-password").val() !== $("#input-password-confirm").val()) {
    doPasswordsMatch = false;
    showError(errorMessage, "The passwords do not match");
    // Make sure all fields are filled and password match
  } else if (isSet && doPasswordsMatch) {
    $.post("/api/new", newShip).then(function(data) {
      // If we get a user id back redirect to game
      if (typeof data === "string") {
        showError(errorMessage, data);
      } else {
        window.location.href = "/main/" + data.user.id;
      }
    });
  } else {
    showError(errorMessage, "All fields are required");
  }
});

function showError(here, what) {
  here.textContent = what;
  here.classList.add("d-block");
  setTimeout(function() {
    hideError(here);
  }, 3000);
}

function hideError(here) {
  here.classList.remove("d-block");
}

document.querySelector("#find-submit").addEventListener("click", function(e) {
  e.preventDefault();
  var errorMessage = document.querySelector("#errorMessageFind");

  var newShipForm = ".find-ship-input";
  var isSet = isFormFilled(newShipForm);

  var findShip = {
    email: $("#find-email").val(),
    password: $("#find-password").val()
  };

  if (isSet) {
    getUserEmail(findShip.email, findShip.password, errorMessage);
  } else {
    showError(errorMessage, "All fields are required");
  }
});
function getUserEmail(email, password, ifError) {
  var emailString = email;
  var passwordString = password;
  $.get("/api/find/" + emailString + "/" + passwordString, function(data) {
    if (typeof data === "string") {
      showError(ifError, data);
    } else {
      window.location.href = "/main/" + data.id;
    }
  });
}
