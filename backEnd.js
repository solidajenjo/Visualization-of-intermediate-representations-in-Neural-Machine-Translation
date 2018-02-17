var lines = 3;
var phrase1Weights = [];
var phrase2Weights = [];
var lastSelected_1 = "cb1_1"
var lastSelected_2 = "cb2_2"

function getPhrase1(){	
	var phrase = "phrase" + lastSelected_1.charAt(2);	
	return document.getElementById(phrase).value;
}

function getPhrase2(){	
	var phrase = "phrase" + lastSelected_2.charAt(2);	
	return document.getElementById(phrase).value;
}

function updateChecks(idCheck){
	if (idCheck.charAt(idCheck.length - 1) == "1"){
		var other = idCheck;
		other = other.replaceAt(idCheck.length - 1, "2");
		if (lastSelected_2 != other){
			document.getElementById(lastSelected_1).checked = false;
			document.getElementById(idCheck).checked = true;
			lastSelected_1 = idCheck;
		}else{
			document.getElementById(idCheck).checked = false;
		}
	}else{
		var other = idCheck;
		other = other.replaceAt(idCheck.length - 1, "1");
		if (lastSelected_1 != other){
			document.getElementById(lastSelected_2).checked = false;
			document.getElementById(idCheck).checked = true;
			lastSelected_2 = idCheck;		
		}else{
			document.getElementById(idCheck).checked = false;
		}
	}
}
function generateDataToPaint(cellSize){
	var side = Math.sqrt(phrase1Weights.length);
	var returnData = [];
	var weights = [];
	for (var i = 0; i < phrase1Weights.length; ++i){
		weights.push(Math.abs(phrase1Weights[i] - phrase2Weights[i]));
	}
	//temporary - INI - TESTING 
	var tempWeights = [];
	side = 100;
	for (var i = 0; i < 10000; ++i){
		tempWeights.push(Math.abs(Math.floor((Math.random() * 255)) - Math.floor((Math.random() * 255))));
	}
	weights = tempWeights
	//temporary - END
	for (var i = 0; i < side; ++i){
		for (var j = 0; j < side; ++j){"rgb(246, 239, 100)"
			var nextCell = [i * cellSize, j * cellSize, "rgb("+ weights[(i * side) + j] + ",0,0)"];
			returnData.push(nextCell);
		}
	}
	return returnData;
}

function addLine(){
	var target = document.getElementById('inputSection');

	var temp = document.createElement('div');
	var str = "";
	str +='<div class = "phrase">';
    str +='      <input type="checkbox" id="cb'+lines+'_1" onclick="updateChecks(\'cb'+lines+'_1\')">'
    str +='      <input type="checkbox" id="cb'+lines+'_2" onclick="updateChecks(\'cb'+lines+'_2\')">'
    str +='      <input type="text" id="phrase'+lines+'" class ="inputBox">';
    str +='      <input title ="Translate" type="image" src="./images/translate.png" class = "translateButton" onclick="translateText(\'phrase'+lines+'\', \'traduction'+lines+'\')" />';
    str +='      <input type="text" id="traduction'+lines+'" disabled class ="traductionBox" >';
    str +='</div>';
	temp.innerHTML = str;
	target.appendChild(temp.firstChild);
	lines = target.childElementCount;
}

function removeLine(){
	if (lines > 3){
		var target = document.getElementById('inputSection');
		target.removeChild(target.children[lines - 1]); 
		lines = target.childElementCount;
	}
}

function translateText(phraseId, translationId){
	var origin = document.getElementById(phraseId).value;
	var destination = "";
	//TEMPORARY - TRADUCTION - INI
	for (var i = 0; i < origin.length; ++i){
		if (origin.charCodeAt(i) != 32) destination += String.fromCharCode(origin.charCodeAt(i) + 1);
		else destination += " ";
	}	
	//TEMPORARY - TRADUCTION - FIN
	document.getElementById(translationId).value = destination;
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}