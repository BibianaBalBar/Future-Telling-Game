function random_number(num = 4) {
	return Math.floor(Math.random() * num);
}

function mash_choice() {
	let mash = [ 'mansion', 'apartment', 'shack', 'house' ];
	let randomNum = random_number(4);
	return mash[randomNum];
}

function get_answer(category) {
	let choices = [];
	let selector = 'input[name="' + category + '[]"]'; // Build a CSS selector for the blanks in our passed in category
	let inputs = document.querySelectorAll(selector);
	let answer;

	for (let i = 0; i < inputs.length; i++) {
		answer = inputs[i].value;
		if (answer !== '') {
			choices.push(answer); //...add it to the end of the list
		}
	}
	return choices[random_number(choices.length)]; // Pick and return a random choice choice.length = number of answers the user provided in that category
}

function fill_in_answers(answers) {
	let home = document.querySelector('#home'); // This says make a new variable and find the HTML tag that has the ID of "home"
	let profession = document.querySelector('#profession');
	let partner = document.querySelector('#partner');
	let location = document.querySelector('#location');

	// Fill them with the provided answers
	home.innerText = answers['mash'];
	profession.innerText = answers['profession'];
	partner.innerText = answers['partner'];
	location.innerText = answers['location'];
	home.innerHTML = answers.mash;
	profession.innerHTML = answers.profession;
	partner.innerHTML = answers.partner;
	location.innerHTML = answers.location;
}

function handle_submission(evt) {
	evt.preventDefault(); // Stop the form from reloading the page
	evt.stopPropagation(); // Stop the form from reloading the page

	// Build up our answers object
	const answersObject = {
		mash: mash_choice(),
		profession: get_answer('profession'),
		partner: get_answer('partner'),
		location: get_answer('location')
	};

	fill_in_answers(answersObject);

	let answer_div = document.querySelector('#answers');
	answer_div.classList.add('show');
}

// Find the form on the page and attach a handler for when it's submitted
let form = document.querySelector('#mash');
form.addEventListener('submit', handle_submission); // Anytime the form is submitted, we want to call the function handle_submission
