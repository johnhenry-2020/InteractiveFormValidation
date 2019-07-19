//jquery sanity check to insure code is linked and functioning properly
$(document).ready(function() {
	alert('sanity check for Jquery');
});

// Background images set to rotate via cycle.js library
$('#slideshow').cycle({
	speed: 1800,
	timeout: 3500
});

// When the page first loads, this sets the first text field in focus by default.
$('#name').focus();
