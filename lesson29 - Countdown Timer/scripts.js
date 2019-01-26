let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds){
	//clear any existing timers
	clearInterval(countdown);
	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);
	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		//check it if we should stop it !!
		if(secondsLeft <= 0){
			clearInterval(countdown);
			return;
		} 
		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft(seconds){
	const minutes = Math.floor(seconds / 60);
	const remainerSeconds = seconds % 60;
	const display = `${minutes} :${remainerSeconds < 10 ? '0':''}${remainerSeconds}`;
	timerDisplay.textContent = display;
	document.title = display;
}

function displayEndTime(timeStamp){
	const end = new Date(timeStamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	const adjustedHour = hour > 12 ? hour - 12: hour;
	endTime.textContent = `Be back at ${adjustedHour} : ${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer(){
	seconds = parseInt(this.dataset.time);
	timer(seconds);

}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e){
	e.preventDefault();
	const mins = this.minutes.value;
	console.log(mins);
	timer(mins * 60);
	this.reset();
});