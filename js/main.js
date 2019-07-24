/* ===============================================================
						Prevent Form Resubmission When Page Is Refreshed
================================================================== */
// Reference: https://stackoverflow.com/questions/6320113/how-to-prevent-form-resubmission-when-page-is-refreshed-f5-ctrlr
if (window.history.replaceState) {
	window.history.replaceState(null, null, window.location.href);
}

/* ================================================================
						 Cycle through background images via cycle.js library
=================================================================== */
$('#slideshow').cycle({
	speed: 1800,
	timeout: 3500
});

/* ================================================================
						HEADER FADE IN FROM LEFT
=================================================================== */
$('header').hide().fadeIn(2000);
$('header span').hide().fadeIn(3000);

/*=================================================================
						Set focus on the first text field
==================================================================*/

// When the page first loads, this sets the first text field in focus by default.
$('#name').focus();

/*=================================================================
						Global Variables Declarations For Job Role Functionality
==================================================================*/
//access to entire form
const form = document.querySelector('form');
//cretes a div to work with
const newDiv = document.createElement('div');
//create input field
const input = document.createElement('input');
const currentDiv = document.getElementById('jobRoleDiv');
//input attritube set to text
input.type = 'text';
//id attribute set for input field
input.id = 'other-title';
//input placeholder set
input.placeholder = 'Your Job Role';

/*=================================================================
						”Job Role” Functionality
==================================================================*/
const jobRole = document.querySelector('form #title');
const selection1 = jobRole.querySelectorAll('option')[0];
const selection2 = jobRole.querySelectorAll('option')[1];
const selection3 = jobRole.querySelectorAll('option')[2];
const selection4 = jobRole.querySelectorAll('option')[3];
const selection5 = jobRole.querySelectorAll('option')[4];
const selection6 = jobRole.querySelectorAll('option')[5];

/* hides job role input field in order to get job role
input feature to work when JS is disabled in user's browser*/
$('#js-disabled-input').hide();
// Reference: https://stackoverflow.com/questions/54556704/why-does-select-class-return-undefined-value
const getSelectValue = () => {
	const selectedValue = document.getElementById('title').value;
	//if "other" option is selected...
	if (selectedValue === 'other') {
		//create empty text field
		newDiv.appendChild(input);
		//append to the DOM by creating new div dynamically and appending before new div
		const appendedDiv = currentDiv.appendChild(newDiv);
		//show the new text field
		input.style.display = 'block';

		//validate it...
		//if this option is chosen and there is no input....
		appendedDiv.addEventListener('input', () => {
			if (input.value === '') {
				$('#other-title').focus();
				jobRole.previousElementSibling.textContent = 'Oops! You forgot to type in your job role.';
				jobRole.previousElementSibling.classList.add('errorText');
				return false;
				//if this option is chosen and there is input...
			} else {
				jobRole.previousElementSibling.classList.remove('errorText');
				document.getElementById('other-title').focus();
			}
		});

		//if job role OTHER THAN "other" selected...
	} else if (
		selection1.selected ||
		selection2.selected ||
		selection3.selected ||
		selection4.selected ||
		selection5.selected
	) {
		jobRole.previousElementSibling.textContent = 'Your Job Role:';
		jobRole.previousElementSibling.classList.remove('errorText');
		input.style.display = 'none';
	}
};
//executing getSelectValue whereby the menu is ready to respond to user interaction @ any time
getSelectValue();

/*===================================================================
						”T - Shirt Info” Functionality
====================================================================*/

const design = document.getElementById('design');
const color = document.getElementById('colors-js-puns');
const colorDiv = document.querySelector('#color');
const colorOptions = document.querySelector('#color option');

// prefix a $ to the name of variables that contain jQuery objects in order to help differentiate
// referece: https://learn.jquery.com/using-jquery-core/jquery-object/

// access to the values of the shirt color drop down menu ...
const $tomato = $('#color option[value="tomato"]');
const $steelBlue = $('#color option[value="steelblue"]');
const $dimGrey = $('#color option[value="dimgrey"]');
const $cornFlowerBlue = $('#color option[value="cornflowerblue"]');
const $darkGrey = $('#color option[value="darkslategrey"]');
const $gold = $('#color option[value="gold"]');
const $selectColors = $('.selectColors');

// access to color options for future manipulation...
const jsPunColors = document.getElementsByClassName('.jsPunColors');
const heartJsColors = document.getElementsByClassName('.heartJsColors');

//hide color div on pageload
$('.colors-js-puns').hide();
color.style.display = 'none';

/* will result in manipulation of DOM structure such that the menu's
option elements are removed or deleted essentially...*/
const clearColorOptions = () => {
	$('#color option[value="cornflowerblue"]').remove();
	$('#color option[value="darkslategrey"]').remove();
	$('#color option[value="gold"]').remove();
	$('#color option[value="tomato"]').remove();
	$('#color option[value="steelblue"]').remove();
	$('#color option[value="dimgrey"]').remove();
	$('#color option[value="selecttheme"]').remove();
};

//When user clicks a design option & it's value changes...
// change method reference: https://www.w3schools.com/jquery/event_change.asp
$($('#design')).on('change', function() {
	//If user selects "Puns..."
	if (design.value === 'js puns') {
		clearColorOptions();
		color.style.display = 'block';
		// inserts the text describing the shirt's colors...
		$('#color').append(
			"<option class='jsPunColors' value='cornflowerblue'>Cornflower Blue (JS Puns shirt only)</option>"
		);
		$('#color').append(
			"<option class='jsPunColors' value='darkslategrey'>Dark Slate Grey (JS Puns shirt only)</option>"
		);
		$('#color').append("<option class='jsPunColors' value='gold'>Gold (JS Puns shirt only)</option>");
	} else if (design.value === 'heart js') {
		//If user selects "Heart" design
		clearColorOptions();
		color.style.display = '';
		$('#color').append('<option class="heartJsColors" value="tomato">Tomato (I &#9829; JS shirt only)</option>');
		$('#color').append(
			'<option class="heartJsColors" value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>'
		);
		$('#color').append('<option class="heartJsColors" value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>');

		//if user selects nothing...
	} else {
		color.style.display = 'none';
	}
});

/*===================================================================
						”Register For Activities” Functionality
====================================================================*/
//Create new "total" div and hide it upon page load.
$('.activities').append('<div class="totalDiv"><label name="total-amount" class="total-display">Total: </label></div>');
$('.totalDiv').addClass('is-hidden');

//Calculate and display totals
let $total = 0;
const activityType = document.querySelector('.activities');

//when any checkbox is checked...
// checkbox selector reference: https://api.jquery.com/checkbox-selector/
// this keyword | reference: https://www.w3schools.com/js/js_this.asp
// this keyword | reference material: https://teamtreehouse.com/library/understanding-this-in-javascript-2
$('input:checkbox').on('change', function() {
	if ($(this).is(':checked')) {
		//show the "total: " div
		$('.totalDiv').removeClass('is-hidden');
		//calculate total amount based on value of checkbox
		$total += +this.value;

		//add the checkbox value to the div
		// checked selector reference:  https://api.jquery.com/checked-selector/#checked1
		$('.total-display').html('Total: $' + parseInt($total));
	} else if (($('#Workshops input:checkbox:checked').length = 1)) {
		//if a checkbox is unselected, subtract value
		$total -= +this.value;
		//and display the updated total
		$('.total-display').html('Total: $' + parseInt($total));
	}
});

//REAL TIME REGISTRATION VALIDATION
function regValidation() {
	let n = $('input:checked').length;
	if (n === 0) {
		$('.totalDiv').addClass('is-hidden');

		activityLegend.innerText = 'Please choose an activity.';
		activityLegend.classList.add('errorText');
	} else {
		activityLegend.textContent = 'Register for Activities';
		activityLegend.classList.remove('errorText');
	}
}

$('input:checkbox').on('click', regValidation);

//Account for event overlaps.
// Attribute Contains Selector[name *=”value”] reference: https://api.jquery.com/attribute-contains-selector/
const $jsFrameWorks = $('input[name="js-frameworks"]');
const $jslibs = $('input[name="js-libs"]');
const $express = $('input[name="express"]');
const $node = $('input[name="node"]');
const activityLegend = document.querySelector('form .actitity-legend');

//If the "Frameworks" checkbox is checked...
$jsFrameWorks.change(function() {
	if ($(this).is(':checked')) {
		//disable
		$express.prop('disabled', true);
	} else {
		$express.prop('disabled', false);
	}
});

//If the "Libraries" checkbox is checked...
$jslibs.change(function() {
	if ($(this).is(':checked')) {
		//disable
		$node.prop('disabled', true);
	} else {
		$node.prop('disabled', false);
	}
});

//If the "Express" checkbox is checked...
$express.change(function() {
	if ($(this).is(':checked')) {
		//disable
		$jsFrameWorks.prop('disabled', true);
	} else {
		$jsFrameWorks.prop('disabled', false);
	}
});

//If the "Node.js" checkbox is checked...
$node.change(function() {
	if ($(this).is(':checked')) {
		//disable
		$jslibs.prop('disabled', true);
	} else {
		$jslibs.prop('disabled', false);
	}
});
/*===================================================================
						Payment Info Functionality
====================================================================*/

//global variables for the payment info section
const paymentDiv = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelectorAll('fieldset div p')[0];
const bitcoin = document.querySelectorAll('fieldset div p')[1];
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const exDate = document.getElementById('exp-month');
const exYear = document.getElementById('exp-year');
const paymentLegend = document.querySelector('form .payment-legend');

// Set credit card selection to the default selection in payment in dropdown menu
// Setting the default value in dropdown menus. REFERENCE: https://stackoverflow.com/questions/4781420/set-the-default-value-in-dropdownlist-using-jquery
$('select option[value="credit card"]').attr('selected', true);

//Hide all options until selection is made except the default credit card option
// $(creditCard).hide();
$(bitcoin).hide();
$(payPal).hide();

//Display payment sections based on payment option selectedValue
paymentDiv.addEventListener('change', (e) => {
	if (e.target.value === 'credit card') {
		payPal.style.display = 'none';
		creditCard.style.display = 'block';
		bitcoin.style.display = 'none';
		errorCC();
		finalCVVVal();
		finalZipVal();
		paymentLegend.innerText = 'Payment Info';
		paymentLegend.classList.remove('errorText');
	}

	if (e.target.value === 'paypal') {
		payPal.style.display = 'block';
		creditCard.style.display = 'none';
		bitcoin.style.display = 'none';
		paymentLegend.innerText = 'Payment Info';
		paymentLegend.classList.remove('errorText');
	}

	if (e.target.value === 'bitcoin') {
		payPal.style.display = 'none';
		creditCard.style.display = 'none';
		bitcoin.style.display = 'block';
		paymentLegend.innerText = 'Payment Info';
		paymentLegend.classList.remove('errorText');
	}
});

//validation function for Credit Card info.
// HTML DOM previousElementSibling Property | reference: https://www.w3schools.com/jsref/prop_element_previouselementsibling.asp

//CC FIELD VALIDATION
//Sets the function for credit card validation

//access to the credit card input field
const ccNumber = document.getElementById('cc-num');
//regex for credit card validation (only accepts digits and a total between 13 and 16 digits)
const ccVal = /^[\d ]{13,16}$/;

//Credit card field
function errorCC() {
	ccNumber;
	const ccVal = /^[\d ]{13,16}$/;
	//If credit card doesn't have any input...
	if (ccNumber.value === '') {
		ccNumber.previousElementSibling.classList.add('errorText');
		ccNumber.previousElementSibling.innerText = 'Oops! You forgot to enter your credit card number.';
		ccNumber.classList.add('errorBox');
		//If credit card  is correctly formatted...
	} else if (ccNumber.value.match(ccVal)) {
		ccNumber.previousElementSibling.textContent = 'Card Number:';
		ccNumber.previousElementSibling.classList.remove('errorText');
		ccNumber.classList.remove('errorBox');
		return true;
		//If credit card is incorrectly formatted...
	} else {
		ccNumber.previousElementSibling.classList.add('errorText');
		ccNumber.previousElementSibling.innerText =
			'Please try to enter an accurate credit card number between 13 & 16 digits long.';
		ccNumber.classList.add('errorBox');
		return false;
	}
}

ccNumber.addEventListener('focusout', function() {
	errorCC();
});

//real time cc validation (calls the above "errorCC" function)
function paymentVal() {
	ccNumber.addEventListener('input', (e) => {
		//if credit card # is of appropriate length and comprimised entirely of digits/integers...
		errorCC();
	});
}

//validation function for Zip Code Value
function finalZipVal() {
	const zipVal = /^[\d]{5}$/i;
	//if zip code is 5 digits long and the regular expression validating the zip is correct/true...
	if (zip.value.length === 5 && zip.value.match(zipVal)) {
		zip.previousElementSibling.textContent = 'Zip Code:';
		zip.previousElementSibling.classList.remove('errorText');
		zip.classList.remove('errorBox');
		return true;
	} else {
		//if zip is of incorrect length
		zip.previousElementSibling.classList.add('errorText');
		zip.previousElementSibling.innerText = 'Please enter a valid zip code.';
		zip.classList.add('errorBox');
	}
}

//real time zip code validation (calls on the function above)
zip.addEventListener('input', (e) => {
	finalZipVal();
});
const cvvVal = /^[\d]{3}$/i;
//Validation Function for CVV #
function finalCVVVal() {
	//if credit card's cvv code matches RegEx and is 3 digits long..
	if (cvv.value.length === 3 && cvv.value.match(cvvVal)) {
		cvv.previousElementSibling.textContent = 'CVV:';
		cvv.previousElementSibling.classList.remove('errorText');
		cvv.classList.remove('errorBox');
		return true;
	} else {
		//if zip is of incorrect length
		cvv.previousElementSibling.classList.add('errorText');
		cvv.previousElementSibling.innerText = 'Please enter the 3-digit CVV found on the back of the card.';
		cvv.classList.add('errorBox');
	}
}

//Real time cvv validation
cvv.addEventListener('input', (e) => {
	finalCVVVal();
});

paymentVal();

/*===================================================================
						Overall Form Validation Functionality
====================================================================*/
//NAME FIELD
//Sets the function for name validation

const name = document.querySelector('form #name');
const nameVal = /^[a-zA-Z]{2,}$/;

//Email field
function errorName() {
	//If email doesn't have any text...
	if (name.value === '') {
		name.previousElementSibling.classList.add('errorText');
		name.previousElementSibling.innerText = 'Oops! You forgot to enter your name.';
		name.classList.add('errorBox');
		//If name is CORRECTLY formatted...
	} else if (name.value.match(nameVal)) {
		name.previousElementSibling.textContent = 'Name:';
		name.previousElementSibling.classList.remove('errorText');
		name.classList.remove('errorBox');
		return true;
		//If name is INCORRECTLY formatted...
	} else {
		name.previousElementSibling.classList.add('errorText');
		name.previousElementSibling.innerText = 'Please enter a name.';
		name.classList.add('errorBox');
		return false;
	}
}

//Live VALIDATION
name.addEventListener('input', function() {
	if (name.value.match(nameVal)) {
		name.previousElementSibling.textContent = 'Name:';
		name.previousElementSibling.classList.remove('errorText');
		return true;
	}
	errorName();
});

name.addEventListener('focusout', function() {
	errorName();
});

// ===============================================================
//EMAIL FIELD
//sets the function for the email validation
const email = document.querySelector('form #mail');
//reference for RegEx validation: https://emailregex.com/
const emailVal = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Email field
function errorEmail() {
	//reference for RegEx validation: https://emailregex.com/
	//If email doesn't have any text...
	if (email.value === '') {
		email.previousElementSibling.classList.add('errorText');
		email.previousElementSibling.innerText = 'Oops! You forgot to enter your email.';
		email.classList.add('errorBox');
		//If email is correctly formatted...
	} else if (email.value.match(emailVal)) {
		email.previousElementSibling.textContent = 'Email:';
		email.previousElementSibling.classList.remove('errorText');
		email.classList.remove('errorBox');
		return true;
		//If email is incorrectly formatted...
	} else {
		email.previousElementSibling.classList.add('errorText');
		email.previousElementSibling.innerText = 'Please enter a valid email address.';
		email.classList.add('errorBox');
		return false;
	}
}

//Live VALIDATION
email.addEventListener('input', function() {
	if (email.value.match(emailVal)) {
		email.previousElementSibling.textContent = 'Email:';
		email.previousElementSibling.classList.remove('errorText');
		return true;
	}
	errorEmail();
});

email.addEventListener('focusout', function() {
	errorEmail();
});

const submit = document.querySelector('button');
// Final validation on submit button
//Checks for name and email validation
form.addEventListener('submit', (e) => {
	('submit has been clicked');
	if (!errorName() || !errorEmail()) {
		('name or email has not run');
		errorName();
		errorEmail();
		e.preventDefault();
	}
	//Prevents form from submitting if Credit Card info is not filled out.
	if ($('#payment option[value="credit card"]').is(':selected')) {
		errorCC();
		finalCVVVal();
		finalZipVal();
		('cc worked');
		if (!errorCC() || !finalCVVVal() || !finalZipVal()) {
			e.preventDefault();
		}
		paymentLegend.innerText = 'Payment Info';
		paymentLegend.classList.remove('errorText');
	} else if ($('#payment option[value="paypal"]').is(':selected')) {
		('paypal selected');
		paymentLegend.innerText = 'Payment Info';
		paymentLegend.classList.remove('errorText');
	} else if ($('#payment option[value="bitcoin"]').is(':selected')) {
		('bitcoin selected');
		paymentLegend.innerText = 'Payment Info';
		paymentLegend.classList.remove('errorText');
	} else {
		paymentLegend.innerText = 'Please Choose a Payment Method';
		paymentLegend.classList.add('errorText');
	}

	//Checks for event registration
	if ($('input:checked').length === 0) {
		e.preventDefault();
		('event reg is not selected');
		activityLegend.innerText = 'Please choose an activity.';
		activityLegend.classList.add('errorText');
	}
});
