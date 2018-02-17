var sizeOfCell = 8;
var width = 800;
var height = 1000;
var sizeOfInput = 10000;

function draw(){
	var svgContainer = d3.select("#dataFrame")
	svgContainer.selectAll("*").remove();
	drawMatrix(generateDataToPaint(sizeOfCell));
}

function drawMatrix(data){
	var p1 = getPhrase1();
	var p2 = getPhrase2();
	if (p1 == "" || p2 == "") alert ("At least one of the phrases is empty");
	else{
		var svgContainer = d3.select("#dataFrame")
			.append("svg:svg")
			.attr("width", width)
			.attr("height", height);
		var textData = "Diference of " + p1 + " and " + p2;		
		var numberOfLines = 1;
		//if (textData.length > 70){

		//}
		
		svgContainer.append("text")
			.attr("x", 10)
			.attr("y", 10)
			.text(textData)
			.attr("font-family", "sans-serif")
			.attr("font-size", "20px")
			.attr("fill", "red")
		var textOffset = 100;
		svgContainer.selectAll("rect")
			.data(data)
			.enter()			
			.append("rect")
			.attr("x",  function(d){return d[0]})
			.attr("y",  function(d){return d[1] + textOffset})
			.attr("width", sizeOfCell)
			.attr("height", sizeOfCell)
			.attr("stroke-width" , 1)
			.attr("stroke", "rgb(155, 155, 155")
			.style("fill", function(d){return d[2]});		

	}
}