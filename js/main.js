/* ================================================
// Prevent Form Resubmission When Page Is Refreshed
=================================================== */
// Credit: https://stackoverflow.com/questions/6320113/how-to-prevent-form-resubmission-when-page-is-refreshed-f5-ctrlr
if (window.history.replaceState) {
	window.history.replaceState(null, null, window.location.href);
}

/* =================================================
Cycle through background images via cycle.js library
==================================================== */
$('#slideshow').cycle({
	speed: 1800,
	timeout: 3500
});

/* ======================
HEADER FADE IN FROM LEFT
====================== */
$('header').hide().fadeIn(2000);
$('header span').hide().fadeIn(3000);

/*=================================
Set focus on the first text field
=================================*/

// When the page first loads, this sets the first text field in focus by default.
$('#name').focus();

/*================
Global Variables
=================*/
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

/*==============================
”Job Role” section functionality
===============================*/
/* hides job role input field in order to get job role
input feature to work when JS is disabled in user's browser*/
$('#js-disabled-input').hide();
// Credit: https://stackoverflow.com/questions/54556704/why-does-select-class-return-undefined-value
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
	}
};

getSelectValue();
