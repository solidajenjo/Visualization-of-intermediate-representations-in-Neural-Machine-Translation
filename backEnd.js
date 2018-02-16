var lines = 3;

function generateDataToPaint(phrase1Weights, phrase2Weights, cellSize){
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
	lines++;
	var target = document.getElementById('inputSection');

	var temp = document.createElement('div');
	var str = "";
	str +='<div class = "phrase">';
    str +='      <input type="checkbox" name="cb'+lines+'_1">'
    str +='      <input type="checkbox" name="cb'+lines+'_2">';
    str +='      <input type="text" id="phrase1" class ="inputBox">';
    str +='      <input type="image" src="./images/translate.png" class = "translateButton"/>';
    str +='      <input type="text" id="traduction1" disabled class ="traductionBox" >';
    str +='</div>';
	temp.innerHTML = str;
	target.appendChild(temp.firstChild);
}

function removeLine(){
	if (lines > 3){
		var target = document.getElementById('inputSection');
		target.removeChild(target.childNodes[lines]); 
		lines = target.childElementCount;
	}
}