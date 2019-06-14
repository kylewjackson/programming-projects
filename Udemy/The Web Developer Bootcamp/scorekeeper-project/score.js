//Although this was a guided project, I built it on my own based on the example

let goal = 5;
let inProgress = false;

document.addEventListener('input', e => {

	//set win goal
	if (e.target.matches('#goal') && !inProgress) {
		goal = parseInt(e.srcElement.value);
		document.querySelector('#goal-span').textContent = goal;
	}

}, false);

document.addEventListener('click', e => {

	//player 1 wins a round
	if (e.target.matches('#p1')) {
		if (!inProgress) {
			inProgress = true;
			document.querySelector('#goal').setAttribute('readonly', '');
			document.querySelector('#goal').value = null;
		}
		let count = parseInt(document.querySelector('#p1-span').textContent);
		count++;
		document.querySelector('#p1-span').textContent = count;
		if (count === goal) {
			document.querySelector('#p1-span').classList.add('winner');
			document.querySelector('#p1').disabled = true;
			document.querySelector('#p2').disabled = true;
		}
	}

	//player 2 wins a round
	if (e.target.matches('#p2')) {
		if (!inProgress) {
			inProgress = true;
			document.querySelector('#goal').setAttribute('readonly', '');
			document.querySelector('#goal').value = null;
		}
		let count = parseInt(document.querySelector('#p2-span').textContent);
		count++;
		document.querySelector('#p2-span').textContent = count;
		if (count === goal) {
			document.querySelector('#p2-span').classList.add('winner');
			document.querySelector('#p1').disabled = true;
			document.querySelector('#p2').disabled = true;
		}
	}

	//reset game
	if (e.target.matches('#reset')) {

		let p1Count = parseInt(document.querySelector('#p1-span').textContent);
		let p2Count = parseInt(document.querySelector('#p2-span').textContent);

		//reset scores
		if (p1Count > 0) {
			document.querySelector('#p1-span').textContent = 0;
		}

		if (p2Count > 0) {
			document.querySelector('#p2-span').textContent = 0;
		}

		//enable score buttons, remove green text
		if (document.querySelector('#p1').disabled) {
			document.querySelector('#p1').disabled = false;
			document.querySelector('#p1-span').classList.remove('winner');
		}
		if (document.querySelector('#p2').disabled) {
			document.querySelector('#p2').disabled = false;
			document.querySelector('#p2-span').classList.remove('winner');
		}

		//game no longer in progress
		if (inProgress) {
			inProgress = false;
		}

		//enable goal input
		if (document.querySelector('#goal').hasAttribute('readonly')) {
			document.querySelector('#goal').removeAttribute('readonly');
			document.querySelector('#goal').value = goal;
		}
	}

}, false);