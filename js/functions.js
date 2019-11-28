function goNosotras(){
	location.href = "http://localhost/inteligenciaArtificial/nosotras.html";
}

function goEspecifico(){
	location.href = "http://localhost/inteligenciaArtificial/especifico.html";
}

function goGeneral(){
	location.href = "http://localhost/inteligenciaArtificial/general.html";
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
