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
						”Job Role” section Functionality
==================================================================*/
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
	}
};
//executing getSelectValue whereby the menu is ready to respond to user interaction @ any time
getSelectValue();

/*===================================================================
						”T - Shirt Info” Section Functionality
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
		// console.log('heart is working');
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
