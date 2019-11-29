totalSymptoms = 19;

function goNosotras(){
	location.href = "http://localhost/2019/2019-2/inteligenciaArtificial/nosotras.html";
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


// Función para obtener resultados del usuario 
function getResults(){ 
	const respuestas  = document.querySelectorAll('input.respuesta'); 
	let valores = []; 
	for(let respuesta of respuestas) valores.push((respuesta.value/10)); 
	return valores; 
}  
function terminarGeneral(){
	if(localStorage.getItem("result") != null){
		localStorage.removeItem("result");
	}
	
	usuario =  getResults();

	var request = new XMLHttpRequest();
	request.open('GET', 'js/enfermedades.json', true);
	request.send();
	request.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			var req = JSON.parse(this.responseText);
			var enfermedades = req['Enfermedades'];
			var EArray = [];
			var e = [];
			for(let i=0; i< Object.keys(enfermedades).length;i++){
				enf = Object.keys(enfermedades)[i];
				sin = enfermedades[enf]['Sintomas'];
				e.push(enf);
				EArray.push(sin);
				}
			result = getMaxMin(EArray,usuario, e);
		}
		localStorage.setItem("result",JSON.stringify(result));
		navegar('resultado');
	}
}
function terminarEspe(){
	if(localStorage.getItem("result") != null){
		localStorage.removeItem("result");
	}
	usuario =  getResults();

	var request = new XMLHttpRequest();
	request.open('GET', 'js/enfermedades.json', true);
	request.send();
	request.onreadystatechange = function () {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var req = JSON.parse(this.responseText);
			var enfermedades = req['Enfermedades'];
			var EArray = [];
			var e = [];
			var enfEsp = JSON.parse(localStorage.getItem('enf'));
			console.log((enfEsp.data).length);

			for (dataI in enfEsp.data){
				console.log((enfEsp.data)[dataI]);
				sin = enfermedades[(enfEsp.data)[dataI]]['Sintomas'];
				console.log(sin);
				
				e.push((enfEsp.data)[dataI]);
				EArray.push(sin);
			}

			// for(let i=0; i< (enfEsp.data).length;i++){
			// 	console.log((enfEsp.data)[i]);
				
			// 	// sin = enfermedades[enfEsp.data[i]]['Sintomas'];
			// 	// console.log(sin);
				
			// 	// e.push(enf);
			// 	// EArray.push(sin);
			// }
			result = getMaxMin(EArray,usuario, e);
			localStorage.setItem("result",JSON.stringify(result));
		}
	}
	navegar('resultado');
}
function getMaxMin(a, b, c){
    //Sumatoria minima de los sintomas
    umbral = 3;
    
    // Dimensiones x*z
    let ArrMin = [];
    // Recorrer cada fila del arreglo a
    for(let i = 0; i < a.length; i++){

        // Arreglo temporal para guardar valores máx de cada fila
            let temp = [];

        // Recorrer por n* veces -> (tamaño de b)
            for(let j = 0; j < b.length; j++){

                let min = [];

				x = a[i][j];
                z = b[j];
                //Obtener la interseccion entre el valor del sintoma y el valor del usuario.
                min = Math.min(x, z);
				// console.log(min);
				
                // Agregar valores minimos al arreglo temporal
                    temp.push(min);
            }
        // Agregar arreglo temporal al arreglo final de maxmin
            ArrMin.push([c[i],temp]);
	}
	var mayor=0;
	var	mayorArr=["no hay coincidencias",0];
	arrSuma=[];
	for(let h = 0; h < ArrMin.length; h++){
		suma = 0;
		for(let k = 0; k < ArrMin[h][1].length; k++){
			suma=suma+ArrMin[h][1][k];
		}
		arrSuma.push(suma)
		if(suma > umbral){
			if(suma > mayor){
				mayor = suma;
				mayorArr = []
				
				mayorArr.push([ArrMin[h],mayor]);
			}else{
				if (suma == mayor){
					mayor = suma;
					mayorArr.push([ArrMin[h],mayor]);
				}
			}
		}
	}
    return(mayorArr);
}
function selectEnf(id){	
	var selected = [];
	try{
		item = document.getElementById(id);
		if(item.className == ('ui-selected')){
			item.classList.remove('ui-selected');
		}else{
			item.classList.add('ui-selected');
			selected.push(item.id);
		}
	} catch(error){
		console.log(error);
	}
	// localStorage.setItem("select",selected);
	// console.log(selected);
}

function iniciar(){
	data =[]	
	if($('.ui-selected')!=null){
		$('.ui-selected').each(function() {
			// console.log($("#"+this.id+"_d").html());
			data.push($("#"+this.id+"_d").html())
		});
		obj = {"data":data}
		localStorage.setItem("enf",JSON.stringify(obj));
		try{
			navegar('especifico-preg');
		} catch (error){
			console.log(error);
		}
	}else{
		alert("Debes elegir al menos una enfermedad")
	}
	
}


function cargar(){
	if (localStorage.getItem("result")!=null){
		res = JSON.parse(localStorage.getItem("result"));		
		var request = new XMLHttpRequest();
		request.open('GET', 'js/enfermedades.json', true);
		request.send();
		request.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				var req = JSON.parse(this.responseText);				
				var enfermedades = req['Enfermedades'];
				var enfermedad = enfermedades[res[0][0][0]];
				console.log(enfermedades[res[0][0]]);
				origin = enfermedad['Origen'];
				trat = enfermedad['tratamiento'];
				$("#nombre").html(res[0][0][0]);
				$("#image").attr("src","img/"+res[0][0][0]+".jpg");
				$("#origen").html(origin);
				$("#tratamiento").html(trat);
			}
		}
	}else{
		navegar('index')
	}
}

// ---------------------------
function obtenerpreg(){
	$('.question').each(function() {
		console.log(this.id);
	});
}
function navegar(url){
	window.location.assign(`${url}.html`);
}

function changeClass(htmlElement, className){
	document.getElementById(htmlElement).classList.toggle(className);
}

function changeQuestion(direction){
	let id = parseInt(document.querySelector('.question').id);

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
	let id = parseInt(document.querySelector('.question').id); 

	changeClass(id, 'item');
	changeClass(id, 'question');

	changeClass(id - 1, 'question');
	changeClass(id - 1, 'item');
}

function changeQuestionRight(){
	let id = parseInt(document.querySelector('.question').id); 
	if(id === 1){
		changeClass('left-arrow', 'noactive');
	}

	changeClass(id, 'item');
	changeClass(id, 'question');

	changeClass(id + 1, 'question');
	changeClass(id + 1, 'item');
}
