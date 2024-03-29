const $form = document.querySelector("#card-form");
const $buttonContinue = document.querySelector("#btn-continue");
const $cardNameInput = document.querySelector("#name");
const $cardNumberInput = document.querySelector("#card-number");
const $cardMonthInput = document.querySelector("#MM");
const $cardYearInput = document.querySelector("#YY");
const $cardCvcInput = document.querySelector("#CVC");
const userName = $form.name.value;
const cardNumber = $form["card-number"].value;
const YY = $form.YY.value;
const MM = $form.MM.value;
const CVC = $form.CVC.value;

function validateName(userName) {
  if (userName.length === 0) {
    return "This field cannot be blank";
  } else if (userName.length > 50) {
    return "This field cannot contain more than 50 characters";
  } else if (!/^[ a-z]+$/i.test(userName)) {
    return "This field can only contain letters";
  } else {
    return "";
  }
}

function validateCardNumber(cardNumber) {
  if (cardNumber.length === 0) {
    return "This field cannot be blank";
  } else if (!/([0-9]{4}\s?){4}/.test(cardNumber)) {
    return "Invalid credit card number";
  } else {
    return "";
  }
}

function validateYear(YY) {
  if (YY.length === 0) {
    return "This field cannot be blank";
  } else if (!/^[0-9][0-9]$/.test(YY)) {
    return "Invalid year format";
  } else {
    return "";
  }
}

function validateMonth(MM) {
  if (MM.length === 0) {
    return "This field cannot be blank";
  } else if (!/^0[0-9]|1[0-2]$/.test(MM)) {
    return "Invalid month format";
  } else {
    return "";
  }
}

function validateCVC(CVC) {
  if (CVC.length === 0) {
    return "This field cannot be blank";
  } else if (!/^[0-9][0-9][0-9]$/.test(CVC)) {
    return "Invalid CVC format";
  } else {
    return "";
  }
}

function validateForm(event) {
  const $submittedStatus = document.querySelector(".submitted-status");
  const userName = $form.name.value;
  const cardNumber = $form["card-number"].value;
  const YY = $form.YY.value;
  const MM = $form.MM.value;
  const CVC = $form.CVC.value;

  const errorName = validateName(userName);
  const errorCardNumber = validateCardNumber(cardNumber);
  const errorYear = validateYear(YY);
  const errorMonth = validateMonth(MM);
  const errorCVC = validateCVC(CVC);

  const errors = {
    name: errorName,
    "card-number": errorCardNumber,
    YY: errorYear,
    MM: errorMonth,
    CVC: errorCVC,
  };

  const noErrors = manageErrors(errors) === 0;

  if (noErrors) {
    $form.classList.add("occult");
    $submittedStatus.classList.remove("occult");
  }

  event.preventDefault();
}

function manageErrors(errors) {
  const keys = Object.keys(errors);
  let numberOfErrors = 0;
  const $nameErrorText = document.querySelector("#nameError");
  const $cardNumberErrorText = document.querySelector("#cardNumberError");
  const $MMerrorText = document.querySelector("#MMerror");
  const $YYerrorText = document.querySelector("#YYerror");
  const $cvcErrorText = document.querySelector("#cvcError");


  keys.forEach(function (key) {
    const error = errors[key];

    if (error) {
      numberOfErrors++;
      $form[key].className = "error";
      $nameErrorText.textContent = errors.name;
      $cardNumberErrorText.textContent = errors["card-number"];
      $MMerrorText.textContent = errors.MM;
      $YYerrorText.textContent = errors.YY;
      $cvcErrorText.textContent = errors.CVC;
      
    } else {
      $form[key].className = "";
    }
  });

  return numberOfErrors;
}

function writeTextCard() {
  const nameFrontCard = document.querySelector(".name-card");
  const numberFrontCard = document.querySelector(".num-card");
  const monthFrontCard = document.querySelector(".MM-date");
  const yearFrontCard = document.querySelector(".YY-date");
  const numberBackCard = document.querySelector(".cvc-card");

  $cardNameInput.addEventListener("input", () => {
    nameFrontCard.innerText = $cardNameInput.value;

    if ($cardNameInput.value === "") {
      nameFrontCard.innerText = "JANE APPLESEED";
    }
  });

  $cardNumberInput.addEventListener("input", () => {
    numberFrontCard.innerText = $cardNumberInput.value;

    if ($cardNumberInput.value === "") {
      numberFrontCard.innerText = "0000 0000 0000 0000";
    }
  });

  $cardNumberInput.addEventListener("keyup", function(e){
    e.target.value = e.target.value.replace(/[\s]/g, "").replace(/(.{4})/g, "$1 ").trim()
  });

  $cardMonthInput.addEventListener("input", () => {
    monthFrontCard.innerText = $cardMonthInput.value;

    if ($cardMonthInput.value === "") {
      monthFrontCard.innerText = "00";
    }
  });

  $cardYearInput.addEventListener("input", () => {
    yearFrontCard.innerText = $cardYearInput.value;

    if ($cardYearInput.value === "") {
      yearFrontCard.innerText = "00";
    }
  });

  $cardCvcInput.addEventListener("keyup", () => {
    numberBackCard.innerText = $cardCvcInput.value;

    if ($cardCvcInput.value === "") {
      numberBackCard.innerText = "000";
    }
  });
}

writeTextCard();

$form.onsubmit = validateForm;

$buttonContinue.onclick = function() {
  location.reload();
}