totalSymptoms = 18;

function goNosotras(){
	location.href = "http://localhost/inteligenciaArtificial/nosotras.html";
}

function goEspecifico(){
	window.location.assign('especifico.html');
	// location.href = "http://localhost/inteligenciaArtificial/especifico.html";
}

function goGeneral(){
	window.location.assign('general.html');
	// location.href = "http://localhost/inteligenciaArtificial/general.html";
}

function respuestaGrado(){
	uno = document.getElementById("uno");
	dos = document.getElementById("dos");

	uno.style.display="none";
	dos.style.display="block";
}

function next(id){
	item = document.getElementById(id);

	item.style.display="block";
}

// ---------------------------

function navegar(url){
	window.location.assign(`${url}.html`);
}

function changeClass(htmlElement, className){
	document.getElementById(htmlElement).classList.toggle(className);
}

function changeQuestion(direction){
	id = parseInt(document.querySelector('.question').id);

	if(id > 1 && direction == 'left'){
		changeQuestionLeft();
		document.getElementById('right-arrow').classList.remove('noactive');
	}
	if(direction == 'right'){
		if(id < totalSymptoms){
			changeQuestionRight();
		}
		if(id + 1 === totalSymptoms){
			document.getElementById('right-arrow').classList.add('noactive');
		}
	}
}

function changeQuestionLeft(){

	changeClass(id, 'item');
	changeClass(id, 'question');

	changeClass(id - 1, 'question');
	changeClass(id - 1, 'item');
}

function changeQuestionRight(){

	if(id === 1){
		changeClass('left-arrow', 'noactive');
	}

	changeClass(id, 'item');
	changeClass(id, 'question');

	changeClass(id + 1, 'question');
	changeClass(id + 1, 'item');
}